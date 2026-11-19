#!/usr/bin/env python3
"""Check _wiki/protocols.md against the Arkime capture source.

    ./check_protocols_md.py [path-to-arkime-checkout] [--rows]

This does NOT regenerate the page. The protocol table carries hand-written
display names ("BJNP (Canon printing)", "Steam IHSCP (In-Home Streaming)") and
prose that cannot be derived from source, so this reports drift instead and
leaves the editing to a human. Exits 1 if the page and the source disagree.

With --rows it also prints ready-to-paste markdown rows for anything new.

Why this script exists
----------------------
The string in Arkime's protocols field is often NOT the parser's file name, and
not its classifier's registered name either. Before this check existed the page
listed 108 protocols when Arkime actually tagged 203. The misses came from tags
set in ways a naive grep does not see, so the extraction below deliberately
covers all of them, and FAILS LOUDLY if a new one appears.
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PAGE = os.path.join(HERE, "_wiki", "protocols.md")

# ---------------------------------------------------------------------------
# Tags set by passing a VARIABLE to arkime_session_add_protocol. Each of these
# needs its own extraction rule below. If capture grows a new one, the script
# stops and says so rather than silently under-reporting, which is exactly how
# the page drifted the first time.
# ---------------------------------------------------------------------------
KNOWN_VARIABLE_CALLS = {
    # file                  why it is fine
    "python.c":             "user Python parsers, tags cannot be enumerated",
    "plugins/lua/session.c": "user Lua parsers, tags cannot be enumerated",
    "parsers.c":            "arkime_parsers_add_protocol_cb, uw extracted below",
    "parsers/misc.c":       "misc_add_protocol_classify, uw extracted below",
    "parsers/rpc.c":        "ONC RPC program names, extracted below",
    "parsers/dcerpc.c":     "DCE/RPC interface names, extracted below",
    "parsers/m3ua.c":       "M3UA sub-parser names, extracted below",
}

# Packet decoding files. Their tags live in the page's packet/tunnel table and
# they are not expected to appear in the main protocol table.
PACKET_FILES = {
    "tcp", "udp", "gre", "erspan", "vxlan", "geneve", "mpls",
    "nsh", "ppp", "esp", "ah", "xid", "ciscometadata",
}

# Classifier names that never become a tag.
NOT_TAGS = {
    "user",      # user_classify only fills the shared user field
    "other220",  # other220_classify only ever tags lmtp
    "rpc",       # rpc_classify_udp tags the program, never "rpc"
}

# Rows whose Fields number does not come from one same-named .c file.
FIELD_SOURCES = {
    "tls":  ["tls.c", "certs.c"],  # certs is shared with dtls, counted under tls
    "sccp": ["tcap.c"],            # the SS7 side; misc.c's Skinny has no fields
    "pop3": [],                    # no fields of its own, fills the shared user field
    "tds":  [],                    # likewise
}


def read(path):
    with open(path, encoding="utf-8", errors="replace") as fh:
        return fh.read()


# Only these subdirectories of capture/ hold Arkime's own source. Everything
# else is pruned, because a checkout can contain whole copies of the tree that
# would otherwise be scanned as if they were real (build output, fuzzing
# harnesses, capture_VULNHUNT_RESULTS_*/ and the like). If Arkime ever grows a
# new source directory, add it here.
SOURCE_DIRS = {"parsers", "plugins"}
PRUNE = {"thirdparty", "node_modules", ".git"}


def c_files(capture):
    """Arkime's own .c/.h under capture/, as (relative path, text)."""
    for root, dirs, names in os.walk(capture):
        rel_root = os.path.relpath(root, capture)
        if rel_root == ".":
            dirs[:] = [d for d in dirs if d in SOURCE_DIRS]
        else:
            dirs[:] = [d for d in dirs if d not in PRUNE]
        for n in sorted(names):
            if n.endswith((".c", ".h")):
                full = os.path.join(root, n)
                yield os.path.relpath(full, capture), read(full)


def extract_tags(capture):
    """Every string that can land in the protocols field."""
    tags = set()
    unknown_variable = []

    for rel, text in c_files(capture):
        # 1. plain string literals
        for m in re.finditer(r'arkime_session_add_protocol\([^,]+,\s*"([^"]+)"', text):
            tags.add(m.group(1))

        # 2. sub-parsers whose uw is the tag
        for m in re.finditer(
            r'arkime_parsers_register_sub\([^)]*arkime_parsers_add_protocol_cb,\s*"([^"]+)"',
            text,
        ):
            tags.add(m.group(1))

        # 3. the CLASSIFY macros, which pass the name as the uw
        for m in re.finditer(
            r'(?:SIMPLE_CLASSIFY_(?:TCP|UDP|BOTH)|CLASSIFY_(?:TCP|UDP))\(\s*"([^"]+)"',
            text,
        ):
            tags.add(m.group(1))

        # 4. explicit registrations with a non-NULL uw string
        for m in re.finditer(
            r'arkime_parsers_classifier_register_(?:tcp|udp|port)\(\s*"[^"]+",\s*"([^"]+)"',
            text,
        ):
            tags.add(m.group(1))

        # 5. the variable-passed calls, which none of the above can see
        for m in re.finditer(r"arkime_session_add_protocol\(([^;]*?)\)\s*;", text, re.S):
            args = m.group(1)
            if '"' in args or "ArkimeSession_t" in args:
                continue  # a literal (handled above), or the prototype/definition
            if rel not in KNOWN_VARIABLE_CALLS:
                line = text[: m.start()].count("\n") + 1
                unknown_variable.append("%s:%d" % (rel, line))

    # rpc.c assigns a local "name" per ONC RPC program number
    rpc = read(os.path.join(capture, "parsers", "rpc.c"))
    tags |= set(re.findall(r'name\s*=\s*"([a-z0-9_-]+)"', rpc))

    # dcerpc.c and m3ua.c tag their register_sub uw
    for parser in ("dcerpc", "m3ua"):
        src = read(os.path.join(capture, "parsers", "%s.c" % parser))
        for m in re.finditer(
            r'arkime_parsers_register_sub\(\s*"%s",\s*"[^"]*",\s*[^,]+,\s*"([^"]+)"' % parser,
            src,
        ):
            tags.add(m.group(1))

    return tags - NOT_TAGS, sorted(set(unknown_variable))


def dcerpc_interfaces(capture):
    src = read(os.path.join(capture, "parsers", "dcerpc.c"))
    out = []
    for m in re.finditer(
        r'arkime_parsers_register_sub\("dcerpc",\s*"([0-9a-f-]+)",\s*NULL,\s*"([^"]+)"\);\s*//\s*(.*)',
        src,
    ):
        out.append((m.group(2), m.group(1), m.group(3).rstrip()))
    return sorted(out)


def field_count(capture, stem):
    path = os.path.join(capture, "parsers", stem)
    if not os.path.exists(path):
        return None
    text = read(path)
    return (text.count("arkime_field_define")
            + text.count("arkime_field_by_exp_add_internal"))


def page_rows(page):
    """(tags, type, fields) for each main-table row, plus every tag on the page.

    Tags sit in column 1 of the main table but column 0 of the three smaller
    ones, so collect backticked values from the whole row and skip the header
    rows, which carry a backticked "protocols ==" of their own.
    """
    rows, all_tags = [], set()
    for line in page.split("\n"):
        if not line.startswith("|") or line.startswith("| ---"):
            continue
        if "`protocols ==`" in line:
            continue  # a table header
        all_tags |= set(re.findall(r"`([^`]+)`", line))
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) == 4 and "proto-badge" in cells[2]:
            kind = "Parser" if "proto-parser" in cells[2] else "Classifier"
            rows.append((re.findall(r"`([^`]+)`", cells[1]), kind, cells[3]))
    return rows, all_tags


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    show_rows = "--rows" in sys.argv
    root = args[0] if args else os.path.join(HERE, "..", "arkime")
    capture = os.path.join(root, "capture")

    if not os.path.isdir(os.path.join(capture, "parsers")):
        sys.exit("no capture/parsers under %s\n"
                 "usage: ./check_protocols_md.py [path-to-arkime-checkout] [--rows]"
                 % os.path.abspath(root))

    src_tags, unknown = extract_tags(capture)
    page = read(PAGE)
    rows, page_tags = page_rows(page)

    problems = []

    if unknown:
        problems.append(
            "arkime_session_add_protocol is called with a variable in a file this\n"
            "  script does not know how to read, so its tags are NOT being checked:\n"
            + "".join("    %s\n" % u for u in unknown)
            + "  Add an extraction rule, then list the file in KNOWN_VARIABLE_CALLS."
        )

    missing = sorted(src_tags - page_tags)
    extra = sorted(page_tags - src_tags)
    if missing:
        problems.append("in the source but not on the page (%d):\n    %s"
                        % (len(missing), " ".join(missing)))
    if extra:
        problems.append("on the page but not in the source (%d):\n    %s"
                        % (len(extra), " ".join(extra)))

    # DCE/RPC interface table
    page_dcerpc = set(re.findall(r"^\| `([a-z0-9]+)` \| [0-9a-f]{8}-", page, re.M))
    src_dcerpc = {n for n, _u, _c in dcerpc_interfaces(capture)}
    if src_dcerpc - page_dcerpc:
        problems.append("DCE/RPC interfaces missing from the page: %s"
                        % " ".join(sorted(src_dcerpc - page_dcerpc)))

    # Field counts
    drift = []
    for tags, kind, fields in rows:
        if kind != "Parser" or not tags:
            continue
        stems = FIELD_SOURCES.get(tags[0], ["%s.c" % tags[0]])
        if not stems:
            continue
        counts = [field_count(capture, s) for s in stems]
        if any(c is None for c in counts):
            continue
        want, have = sum(counts), fields.strip()
        if have.isdigit() and int(have) != want:
            drift.append("    %-22s page %-4s source %s" % (tags[0], have, want))
    if drift:
        problems.append("field counts have drifted:\n" + "\n".join(drift))

    print("source tags: %d   page tags: %d   main rows: %d"
          % (len(src_tags), len(page_tags), len(rows)))

    if show_rows and missing:
        print("\nrows to paste into the main table (fill in the display name):\n")
        for t in missing:
            n = field_count(capture, "%s.c" % t)
            kind = ("<span class=\"proto-badge proto-parser\">Parser</span>"
                    if n else "<span class=\"proto-badge proto-classifier\">Classifier</span>")
            print("| NAME | `%s` | %s | %s |" % (t, kind, n or ""))

    if problems:
        print("\n" + "\n\n".join("- " + p for p in problems))
        print("\nFAIL")
        return 1

    print("OK, the page matches the source")
    return 0


if __name__ == "__main__":
    sys.exit(main())
