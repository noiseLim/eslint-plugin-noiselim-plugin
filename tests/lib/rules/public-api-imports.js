'use strict';

const rule = require('../../../lib/rules/public-api-imports'),
  RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});

const aliasOptions = [
  {
    alias: '@',
  },
];

ruleTester.run('public-api-imports', rule, {
  valid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
      errors: [
        {
          message: 'Absolute import is allowed only from Publiс API (index.ts)',
        },
      ],
      options: aliasOptions,
    },
  ],
});
