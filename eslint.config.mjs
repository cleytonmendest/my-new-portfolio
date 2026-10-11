import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';

/*
 * Design system enforcement.
 *
 * - Tailwind classes: only classes generated from src/styles/tokens.css exist (the default
 *   palette, radii and shadows are removed there), so raw colours such as bg-green-500 are
 *   reported by no-unknown-classes. Arbitrary values are blocked outside components/ui.
 * - Colours: no hex or colour functions in code, no inline `style`.
 * - Components: raw form controls only inside components/ui.
 * - Libraries: Radix only in ui/, animation libraries only in motion/, 3D only in three/.
 */

const DS_TOKENS_HINT = 'Use a design token (see src/styles/tokens.css).';

// Tailwind classes that must not be used anywhere.
const restrictedClassesEverywhere = [
  {
    pattern: '^(.*:)?text-accent$',
    message:
      'text-accent (Âmbar) is 2.1:1 on the light background. Use text-accent-ink, which passes AA in both themes.',
  },
];

// Arbitrary values and variants are the escape hatch that bypasses the tokens.
const restrictedClassesOutsideUi = [
  ...restrictedClassesEverywhere,
  {
    pattern: '\\[',
    message: `Arbitrary values are not allowed outside components/ui. ${DS_TOKENS_HINT}`,
  },
];

const noRawColors = [
  {
    selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
    message: `Hex colours are not allowed in code. ${DS_TOKENS_HINT}`,
  },
  {
    selector: "Literal[value=/^(rgb|rgba|hsl|hsla|hwb|oklch|oklab|lab|lch)\\(/]",
    message: `Colour functions are not allowed in code. ${DS_TOKENS_HINT}`,
  },
];

const noInlineStyle = {
  selector: "JSXAttribute[name.name='style']",
  message:
    'Inline styles bypass the design system. Use Tailwind classes with tokens (dynamic values belong in components/motion or components/three).',
};

const noRawFormControls = {
  selector: 'JSXOpeningElement[name.name=/^(button|input|select|textarea)$/]',
  message:
    'Use the components from @/components/ui (Button, Input, Select, Textarea). Raw form controls are only allowed inside components/ui.',
};

const restrictedImports = {
  paths: [
    ...['framer-motion', 'motion', 'gsap', '@gsap/react', 'three'].map((name) => ({
      name,
      message:
        name === 'three'
          ? 'Import three only from src/components/three.'
          : 'Import animation libraries only from src/components/motion.',
    })),
  ],
  patterns: [
    {
      group: ['@radix-ui/*'],
      message: 'Radix primitives are wrapped by src/components/ui. Use or extend those components.',
    },
    {
      group: ['motion/*', 'gsap/*'],
      message: 'Import animation libraries only from src/components/motion.',
    },
    {
      group: ['three/*', '@react-three/*'],
      message: 'Import three and @react-three/* only from src/components/three.',
    },
  ],
};

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'dist/**', 'build/**', 'next-env.d.ts'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  // Node scripts (brand assets): Node globals, `document` runs inside the headless page, and
  // printing progress is their output.
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: { Buffer: 'readonly', console: 'readonly', document: 'readonly', process: 'readonly', URL: 'readonly' },
    },
    rules: { 'no-console': 'off' },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'better-tailwindcss': betterTailwindcss },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
    rules: {
      // Not utilities: not-prose comes from @tailwindcss/typography; light and dark are the
      // theme scope classes declared in src/styles/tokens.css.
      'better-tailwindcss/no-unknown-classes': ['error', { ignore: ['^not-prose$', '^(light|dark)$'] }],
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-restricted-classes': ['error', { restrict: restrictedClassesOutsideUi }],
      'no-restricted-syntax': ['error', ...noRawColors, noInlineStyle, noRawFormControls],
      'no-restricted-imports': ['error', restrictedImports],
    },
  },
  // components/ui implements the design system: Radix, raw controls and arbitrary
  // variants (shadcn internals) are allowed here.
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'better-tailwindcss/no-restricted-classes': ['error', { restrict: restrictedClassesEverywhere }],
      'no-restricted-syntax': ['error', ...noRawColors, noInlineStyle],
      'no-restricted-imports': [
        'error',
        { paths: restrictedImports.paths, patterns: restrictedImports.patterns.slice(1) },
      ],
    },
  },
  // Motion code may use the animation libraries and set dynamic inline styles.
  {
    files: ['src/components/motion/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['error', ...noRawColors, noRawFormControls],
      'no-restricted-imports': [
        'error',
        {
          paths: restrictedImports.paths.filter(
            (entry) => !['framer-motion', 'motion', 'gsap', '@gsap/react'].includes(entry.name),
          ),
          patterns: [restrictedImports.patterns[0], restrictedImports.patterns[2]],
        },
      ],
    },
  },
  // 3D code may use three and react-three-fiber and set dynamic inline styles.
  {
    files: ['src/components/three/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['error', ...noRawColors, noRawFormControls],
      'no-restricted-imports': [
        'error',
        {
          paths: restrictedImports.paths.filter((entry) => entry.name !== 'three'),
          patterns: restrictedImports.patterns.slice(0, 2),
        },
      ],
    },
  },
];
