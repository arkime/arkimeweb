# Contributing to the Arkime website

:sparkles: Glad to see you here! :sparkles:

---

### Just have a question :question:

* Talk to us directly in the [Arkime-FPC Slack](https://slackinvite.arkime.com/)

---

### Where do I start? :traffic_light:

First, checkout this repo!

This site is created using Jekyll. Get started with Jekyll [here](https://jekyllrb.com/docs).

Once you have jekyll and the bundler installed, run

```
bundle install --path vendor/bundle
```

Then run

```
bundle exec jekyll serve
```

Once you have built the site and made it available on a local server, browse to the localhost site in your browser.

```
http://127.0.0.1:4000/
```

**Then, edit the HTML/JS/CSS/MD in your favorite editor!**

---

### How do I contribute?

#### Documentation! :page_with_curl:

The FAQs, docs, and page styles are important. Please help improve and add to them.

#### Bugs :bug: :beetle: :ant:

**Before submitting a bug report:**
* Ensure the bug was not already reported by searching for [existing issues in Arkime](https://github.com/arkime/arkimeweb/issues)
  * If an issues is already open, make a comment that you are experiencing the same thing and provide any additional details

Bugs are tracked as [GitHub Issues](https://guides.github.com/features/issues/).
**Please follow these guidelines when submitting a bug:**
* Provide a clear and descriptive title
* Describe the exact steps to reproduce the problem
* Explain the expected behavior
* Fill out the [issue template](https://github.com/arkime/arkimeweb/issues/new) completely

#### Feature Requests :sparkles:

Feature requests include new features and minor improvements to existing functionality.

Feature requests are tracked as [GitHub Issues](https://guides.github.com/features/issues/).
**Please follow these guidelines when submitting a feature request:**
* Provide a clear and descriptive title
* Describe the suggested feature in as much detail as possible
* Use examples to help us understand the use case of the feature
* If you are requesting a minor improvement, describe the current behavior and why it is not sufficient
* If possible, provide examples of where this feature exists elsewhere in other tools
* Follow the directions in the [issue template](https://github.com/arkime/arkimeweb/issues/new)

#### Pull Requests :muscle:

**We welcome all collaboration!** If you can fix it or implement it, please do! :hammer:
To implement something new, please create an issue first so we can discuss it together.

**To better help us review your pull request, please follow these guidelines:**
* Please use a [fork](https://guides.github.com/activities/forking/) to submit a [pull request](https://help.github.com/articles/creating-a-pull-request/) for your contribution.
* Provide a clear and descriptive title
* Clearly describe the problem and solution
* Include the relevant issue number(s) if applicable
* Make sure the HTML and rendered page conform the style guide (below)
* When creating a Pull Request please follow [best practices](https://github.com/trein/dev-best-practices/wiki/Git-Commit-Best-Practices) for creating git commits.
* When your code is ready to be submitted, submit a Pull Request to begin the code review process.

We only seek to accept code that you are authorized to contribute to the project. We have added a pull request template on our projects so that your contributions are made with the following confirmation:
>I confirm that this contribution is made under an Apache 2.0 license and that I have the authority necessary to make this contribution on behalf of its copyright owner.

#### API Documentation

Want to fix, add, or update API documentation? That's awesome! Take a look [here](https://github.com/arkime/arkime/blob/main/CONTRIBUTING.md#api-documentation) to learn how we document our APIs and how to contribute.

#### WISE Configs

Want to contribute a [WISE Config](https://arkime.com/wise-configs)? Just follow these steps:
* Follow the [instructions above to fork the project](#pull-requests-muscle).
* Add your configuration to the arikmeweb/_posts/wiseconfigs directory.
  * The filename must be in this format: `yyyy-mm-dd-wise-title.md`
  * The file must be a `.md` (markdown) file.
  * The filename must start with the date (use the current date).
  * The file should begin with a title, description (optional), tags (optional) in this format:
    ```
    ---
    title: Test WISE Config
    description: 'Amazing description of your awesome WISE config.'
    tags: amazing awesome
    ---
    ```
  * Underneath the title section, add your config, surrounded with \`\`\` (this tells markdown that it's code).
  * Make sure to indent the configuration code so it is readable.
* [Run the project](#where-do-i-start-traffic_light) and navigate to `http://localhost:4000/wise-configs` to make sure it shows up and displays properly. It should be the last item in the list if you used the current date in your filename.
* [Submit your PR](#pull-requests-muscle).

#### Arikme Rules

Want to contribute an [Arkime Rule](https://arkime.com/rules)? Just follow these steps:
* Follow the [instructions above to fork the project](#pull-requests-muscle).
* Add your configuration to the arikmeweb/_posts/rules directory.
  * The filename must be in this format: `yyyy-mm-dd-rule-title.md`
  * The file must be a `.md` (markdown) file.
  * The filename must start with the date (use the current date).
  * The file should begin with a title, description (optional), tags (optional) in this format:
    ```
    ---
    title: Test Rule
    description: 'Amazing description of your awesome Rule.'
    tags: amazing awesome
    ---
    ```
  * Underneath the title section, add your config, surrounded with \`\`\` (this tells markdown that it's code).
  * Make sure to indent the configuration code so it is readable.
* [Run the project](#where-do-i-start-traffic_light) and navigate to `http://localhost:4000/rules` to make sure it shows up and displays properly. It should be the last item in the list if you used the current date in your filename.
* [Submit your PR](#pull-requests-muscle).

---

### Style Guide

This site uses the [Bootstrap](https://getbootstrap.com/) toolkit for all its style and layout. It's a good idea to get familiar with this toolkit before contributing.

#### Docs Pages
The Docs pages are created using Jekyll and kramdown. Get started with Jekyll [here](https://jekyllrb.com/docs).
Check out kramdown syntax [here](https://kramdown.gettalong.org/syntax.html).

There are some things to consider when adding a new doc page:

1. Start every new doc page with this content:

```
---
title: New Awesome Page Title
layout: wiki
permalink: "/awesomepage"
---
```

**Note:** Make sure the permalink is unique.

2. Want a table of contents? Use this scaffolding around your content:

```
- TOC
{:toc}
{: .left-nav .d-none .d-sm-block .pt-3 .with-footer .wiki-toc }

<div class="collapse-btn d-none d-sm-block"
  onclick="toggleToc()">
  <span class="fa fa-angle-double-left">
  </span>
</div>

<div class="full-height-container with-footer pt-3 pr-2 pl-2 pb-3" markdown="1">
  content goes here
</div>
```

**Info:** Want to exclude a section from your table of contents? Just add `{: .no_toc}` under the heading you want to exclude. There must be a newline after it!

3. Just want a full page of information? Use this scaffolding around your content:

```
<div class="full-height-and-width-container with-footer p-3" markdown="1">
  content goes here
</div>
```

4. Lastly, you must add it to the docs home page (`_wiki/home.md`)! Like so:

```
- [New Awesome Page Title](awesomepage)
```

#### CSS Styles

All of the site's styles are included in the `index.css` file. If you add styles to this file, make them as specific as possible and include a comment to describe their intended purpose. For example do this:

```
/* make the background primary theme color for the super awesome content */
body.faq-body div.super-awesome-style {
  background-color: var(--primary-theme-text);
}
```

Not this:

```
.super-awesome-style {
  background-color: purple;
}
```

#### FAQ Styles

The FAQ page is made up of two main parts, the table of contents on the left and the main content. For every answered question, there should be a corresponding table of contents link that navigates to the question in the main content. Make sure to put the link in the correct subsection; when in doubt, put it in the General section. Here's what a link should look like:

```
<a class="nav-link nested"
  href="#case-sensitive-id"
  title="Example TOC Link">
  Example TOC Link
</a>
```

And the corresponding section in the main content should look like this:

```
<h3 id="case-sensitive-id">
  Example TOC Link
  <span class="fa fa-link small copy-link cursor-copy"
    onclick="copyLink(this)">
  </span>
</h3>
<p>
  Answer goes here...
</p>
```

> **Note:** the `href="#id"` link in the table of contents MUST match the `id` of the section within the main content (case sensitive).

> **Note:** make sure to include the copy link span.

If a question has multiple sections, wrap the additonal sections in another div that has additional margins:

```
<h3 id="main-question">
  Main Question
  <span class="fa fa-link small copy-link cursor-copy"
    onclick="copyLink(this)">
  </span>
</h3>
<p>
  Main question text that tells the reader to read the other sections:
</p>
<div class="ml-5 mr-5">
 <h4>
   First section
 </h4>
 <p>
   First section answer...
 </p>
 <h4>
   Second section
 </h4>
 <p>
   Second section answer...
 </p>
</div>

```

> **Note:** the main section is an `h3` header, the subsections are `h4`.

> **Note:** there is no need to add links in the table of contents to the subsections, just link to the main question.

---

### Code of Conduct
We encourage inclusive and professional interactions on our project. We welcome everyone to open an issue, improve the documentation, report bug or submit a pull request. By participating in this project, you agree to abide by our [Code of Conduct](Code-of-Conduct.md). If you feel there is a conduct issue related to this project, please raise it per the Code of Conduct process and we will address it.

---

### :heart: Thanks,
Andy & Elyse
