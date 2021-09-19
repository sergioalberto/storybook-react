import '../src/index.css';

export const parameters = {
  actions: {
    argTypesRegex: "^on[A-Z].*"
  },
  // https://github.com/storybookjs/storybook/tree/main/addons/a11y
  a11y: {
    // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
    /* options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    },*/
    // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1
    config: {
      // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
      rules: [
        {
          // This tells Axe to run the 'autocomplete-valid' rule on selectors
          // that match '*:not([autocomplete="nope"])' (all elements except [autocomplete="nope"]).
          // This is the safest way of ignoring a violation across all stories,
          // as Axe will only ignore very specific elements and keep reporting
          // violations on other elements of this rule.
          id: 'autocomplete-valid',
          selector: '*:not([autocomplete="nope"])',
        },
        {
          // To disable a rule across all stories, set `enabled` to `false`.
          // Use with caution: all violations of this rule will be ignored!
          id: 'autocomplete-valid',
          enabled: true,
        },
        {
          id: 'color-contrast',
          enabled: true,
        }
      ],
    },
  },
};
