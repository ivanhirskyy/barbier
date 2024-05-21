module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'vue/script-setup-no-uses-vars': 'off',
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
  },
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue', 'error.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
};
