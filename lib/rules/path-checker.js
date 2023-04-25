'use strict';

const path = require('path');
const { isPathRelative } = require('../helpers');

module.exports = {
  meta: {
    type: null,
    docs: {
      description: 'feature sliced relative path checker',
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
        },
      },
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';
    return {
      ImportDeclaration(node) {
        // example: app/entities/Article
        const value = node.source.value;
        const importTo = alias ? value.replace(`${alias}/`, '') : value;
        // example: C:\Users\username\Desktop\project\src\entities\Article
        const fromFilename = context.getFilename();

        if (shouldBeRelative(fromFilename, importTo)) {
          // eslint-disable-next-line eslint-plugin/prefer-message-ids, eslint-plugin/no-deprecated-report-api
          context.report(
            node,
            'Within a once slice, all paths must be relative'
          );
        }
      },
    };
  },
};

const layers = {
  entities: 'entities',
  features: 'features',
  shared: 'shared',
  pages: 'pages',
  widgets: 'widgets',
};

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false;
  }
  const toArray = to.split('/');
  const toLayer = toArray[0];
  const toSlice = toArray[1];

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(from);
  const projectFrom = normalizedPath.split('src')[1];
  const fromArray = projectFrom.split(/\\|\//);

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  return toLayer === fromLayer && toSlice === fromSlice;
}
