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
      errors: [{ messageId: 'PUBLIC_ERROR' }],
      options: aliasOptions,
      output:
        "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
    },
    {
      filename:
        'C:\\Users\\user\\Desktop\\project\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      errors: [{ messageId: 'PUBLIC_ERROR' }],
      output:
        "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
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
      errors: [{ messageId: 'TESTING_PUBLIC_ERROR' }],
      output: null,
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
