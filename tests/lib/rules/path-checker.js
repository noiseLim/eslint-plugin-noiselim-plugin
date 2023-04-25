'use strict';

const rule = require('../../../lib/rules/path-checker'),
  RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run('path-checker', rule, {
  valid: [
    {
      filename: 'C:\\Users\\name\\Desktop\\project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';",
      errors: [],
    },
  ],
  invalid: [
    {
      filename: 'C:\\Users\\name\\Desktop\\project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slice/addCommentFormSlice';",
      errors: [
        {
          message: 'Within a once slice, all paths must be relative',
        },
      ],
      options: [
        {
          alias: '@',
        },
      ],
    },
    {
      filename: 'C:\\Users\\name\\Desktop\\project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slice/addCommentFormSlice';",
      errors: [
        {
          message: 'Within a once slice, all paths must be relative',
        },
      ],
    },
  ],
});
