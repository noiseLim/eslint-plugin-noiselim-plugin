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
    {
      filename:
        'C:\\Users\\user\\Desktop\\project\\src\\entities\\file.test.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.*',
            '**/*.stories.*',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
    {
      filename:
        'C:\\Users\\user\\Desktop\\project\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.*',
            '**/*.stories.*',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
      errors: [
        {
          message: 'Absolute import is allowed only from Public API (index.ts)',
        },
      ],
      options: aliasOptions,
    },
    {
      filename:
        'C:\\Users\\user\\Desktop\\project\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      errors: [
        {
          message: 'Absolute import is allowed only from Public API (index.ts)',
        },
      ],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.*',
            '**/*.stories.*',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
    {
      filename:
        'C:\\Users\\user\\Desktop\\project\\src\\entities\\forbidden.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [
        {
          message: 'Test data must be imported from PubliсAPI/testing.ts',
        },
      ],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.*',
            '**/*.stories.*',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
  ],
});
