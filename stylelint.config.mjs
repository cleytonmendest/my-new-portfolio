/*
 * Design system enforcement for CSS.
 * Colour literals and custom properties may only be declared in src/styles/tokens.css.
 * Everything else must use the tokens through Tailwind classes or var(--token).
 */
export default {
  rules: {
    'color-no-hex': [true, { message: 'Hex colours are only allowed in src/styles/tokens.css.' }],
    'color-named': ['never', { message: 'Named colours are not allowed. Use a design token.' }],
    'function-disallowed-list': [
      ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch'],
      { message: 'Colour functions are only allowed in src/styles/tokens.css.' },
    ],
    'custom-property-pattern': [
      '^$',
      {
        message:
          'Custom properties (design tokens) may only be declared in src/styles/tokens.css.',
      },
    ],
  },
  overrides: [
    {
      files: ['src/styles/tokens.css'],
      rules: {
        'color-no-hex': null,
        'color-named': null,
        'function-disallowed-list': null,
        'custom-property-pattern': null,
      },
    },
  ],
};
