# eslint-plugin-noiselim-plugin

eslint plugin for fsd

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-noiselim-plugin`:

```sh
npm install eslint-plugin-noiselim-plugin --save-dev
```

## Usage

Add `noiselim-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["noiselim-plugin"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "noiselim-plugin/rule-name": 2
  }
}
```

## Rules

"noiselim-plugin/path-checker" - checked path for Feature-Sliced Design

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
