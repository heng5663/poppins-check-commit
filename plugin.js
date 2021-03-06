var util = require('util');

module.exports = function (poppins) {
  var plugins = poppins.plugins;

  if (!plugins.prChecklist) {
    throw new Error('poppins-check-commit requires poppins-pr-checklist to be loaded first');
  }

  plugins.checkCommit = {
    message: "PR's commit messages follow the [commit message format]" +
        "(https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)",

    condition: function (pr) {
      return poppins.
          getCommits(pr.number).
          then(function (commits) {
            var problem;
            commits.some(function (data) {
              return (problem = plugins.checkCommit.check(data.commit.message)).length > 0;
            });
            return problem;
          });
    },

    check: getFeedbackForMessage,
  };

  plugins.prChecklist.checks.push(plugins.checkCommit);
};


var MAX_LENGTH = 100;
var PATTERN = /^(?:fixup!\s*)?(\w*)(\(([\w\$\.\-\*/]*)\))?\: (.*)$/;
var TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'chore',
  'revert'
];


function getFeedbackForMessage (message) {
  message = message.split('\n')[0];

  if (message.length > MAX_LENGTH) {
    return util.format('`%s` is longer than %d characters', message, MAX_LENGTH);
  }

  var match = PATTERN.exec(message);

  if (!match) {
    return util.format('`%s` does not match `<type>(<scope>): <subject>`', message);
  }

  var type = match[1];

  if (TYPES.indexOf(type) === -1) {
    return util.format('`%s` is not an allowed type; allowed types are %s.',
        type, TYPES.map(backtick).join(', '));
  }

  return '';
}

function backtick (str) {
  return '`' + str + '`';
}
