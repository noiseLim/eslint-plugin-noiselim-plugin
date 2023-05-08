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
    fixable: 'code',
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
        try {
          // example: app/entities/Article
          const value = node.source.value;
          const importTo = alias ? value.replace(`${alias}/`, '') : value;
          // example: C:\Users\username\Desktop\project\src\entities\Article
          const fromFilename = context.getFilename();

          if (shouldBeRelative(fromFilename, importTo)) {
            context.report({
              node,
              message: 'Within a once slice, all paths must be relative',
              fix: (fixer) => {
                const normalizedPath = getNormalizedCurrentFilePath(
                  fromFilename
                )
                  .split('/')
                  .slice(0, -1)
                  .join('/');
                let relativePath = path
                  .relative(normalizedPath, `/${importTo}`)
                  .split(/\\|\//)
                  .join('/');

                if (!relativePath.startsWith('.')) {
                  relativePath = './' + relativePath;
                }

                return fixer.replaceText(node.source, `'${relativePath}'`);
              },
            });
          }
        } catch (e) {
          console.log(e);
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

function getNormalizedCurrentFilePath(currentFilePath) {
  const normalizedPath = path.toNamespacedPath(currentFilePath);
  const projectFrom = normalizedPath.split('src')[1];
  return projectFrom.split(/\\|\//).join('/');
}

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

  const projectFrom = getNormalizedCurrentFilePath(from);
  const fromArray = projectFrom.split('/');

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  return toLayer === fromLayer && toSlice === fromSlice;
}
