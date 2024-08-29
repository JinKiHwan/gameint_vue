module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  rules: {
    'no-console': 'off',
    'vue/multi-word-component-names': 'off', // Vue 컴포넌트 이름에 대한 규칙 완화
    'vue/no-mutating-props': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/no-unused-components': [
      'warn',
      {
        ignoreWhenBindingPresent: false,
      },
    ],
  },
}
