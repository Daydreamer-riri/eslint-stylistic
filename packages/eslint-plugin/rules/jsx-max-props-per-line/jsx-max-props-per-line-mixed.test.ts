import { run } from '#test'
import ruleFirstProp from '../jsx-first-prop-new-line/jsx-first-prop-new-line'
import rule from './jsx-max-props-per-line'

run({
  name: 'jsx-max-props-per-line-mixed',
  rule,
  configs: [
    {
      plugins: {
        style: {
          rules: {
            'jsx-first-prop-new-line': ruleFirstProp,
          },
        },
      },
      rules: {
        'style/jsx-first-prop-new-line': ['error', 'always'],
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  invalid: [
    {
      code: '<App foo bar={0} />',
      output: `<App\nfoo\nbar={0} />`,
      options: [{ maximum: 1 }],
      errors: [
        {
          message: 'Property should be placed on a new line', // from jsx-first-prop-new-line
        },
        {
          messageId: 'newLine', // from jsx-max-props-per-line
          data: { prop: 'bar' },
        },
      ],
    },
  ],
})
