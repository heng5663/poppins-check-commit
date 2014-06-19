# poppins-check-commit

A [Mary Poppins](https://github.com/btford/mary-poppins) plugin for checking commit message format.
It was designed to enforce [this commit message format](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#), but it can be used with other conventions as well.
Requires the [`pr-checklist`](https://github.com/btford/poppins-pr-checklist) plugin.


## Install

`npm install poppins-check-commit`


## Configure

To use this plugin, you need to load it in your config file with `couldYouPlease`:


```javascript
// config.js
module.exports = function (poppins) {

  poppins.config = { /*...*/ };

  // pr checklist config
  poppins.couldYouPlease('pr-checklist');
  poppins.plugins.prChecklist.greeting = 'Hello';
  poppins.plugins.prChecklist.closing = 'Farewell';

  // check commit config
  poppins.couldYouPlease('check-commit');
};
```

## Options

Options are available on `poppins.plugins.checkCommit`.
They should be fairly self-explanatory if you read [the plugin's source](https://github.com/btford/poppins-check-commit/blob/master/plugin.js).

### `poppins.plugins.checkCommit.message`
String.
Defaults to `"PR's commit messages follow the [commit message format](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)"`

### `poppins.plugins.checkCommit.maxLength`
Integer.
Defaults to 100 - max length of commit subject.

### `poppins.plugins.checkCommit.pattern`
Regular Expression
Defaults to `/^(?:fixup!\s*)?(\w*)(\(([\w\$\.\-\*/]*)\))?\: (.*)$/`

### `poppins.plugins.checkCommit.types`
Array.
Defaults to:

    [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'chore',
      'revert'
    ]

These are the valid types for the commit subject.


### `poppins.plugins.checkCommit.condition`
Function.
Returns promise that resolves to a bool as to whether or not the PR follows the guidelines.

### `poppins.plugins.checkCommit.check`
Function.
Run on each commit to determine its validity.


## License
MIT
