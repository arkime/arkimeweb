# Arkime
> Arkime is a large scale, open source, indexed packet capture and search system.

![banner](assets/Arkime_Logo_FullGradientBlack@2x.png)

This is the web site for https://arkime.com

## Scripts

Two pages are tied to the Arkime source and have tooling beside them. Both
default to an Arkime checkout at `../arkime` and take a path as their first
argument.

| Script | Page | What it does |
| ------ | ---- | ------------ |
| `gen_python_md.pl` | `/python` | Regenerates the page from `capture/parsers/stubs`. |
| `check_protocols_md.py` | `/protocols` | Reports where the page and the source disagree. Does not rewrite the page. |

Worth running after each Arkime release:

```
./check_protocols_md.py ~/arkime
```

It exits non-zero and lists any protocol the source tags but the page is
missing, anything listed that no longer exists, DCE/RPC interfaces that have
been added, and field counts that have drifted. Add `--rows` to get
ready-to-paste table rows for anything new. The page keeps hand-written display
names and prose, which is why this reports instead of regenerating.

## Contribute

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for information about how to get involved. We welcome issues, feature requests, pull requests, and documentation updates. For questions about using and contributing to the arkime.com website please Slack us (see below).

## Maintainers

The best way to reach us is on Slack.  Please request an invitation to join the Arkime FPC Slack workspace [here](https://slackinvite.arkime.com).
