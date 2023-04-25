'use strict';

const { isPathRelative } = require('../helpers');

module.exports = {
  meta: {
    type: null,
    docs: {
      description: 'desc',
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
    const checkingLayers = {
      entities: 'entities',
      features: 'features',
      pages: 'pages',
      widgets: 'widgets',
    };

    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        const importTo = alias ? value.replace(`${alias}/`, '') : value;

        if (isPathRelative(importTo)) {
          return;
        }

        // [entities, article, model, types]
        const segments = importTo.split(/\\|\//);
        const layer = segments[0];

        if (!checkingLayers[layer]) {
          return;
        }

        const isImportNotFromPublickApi = segments.length > 2;

        if (isImportNotFromPublickApi) {
          // eslint-disable-next-line eslint-plugin/prefer-message-ids, eslint-plugin/no-deprecated-report-api
          context.report(
            node,
            'Absolute import is allowed only from Publiс API (index.ts)'
          );
        }
      },
    };
  },
};
