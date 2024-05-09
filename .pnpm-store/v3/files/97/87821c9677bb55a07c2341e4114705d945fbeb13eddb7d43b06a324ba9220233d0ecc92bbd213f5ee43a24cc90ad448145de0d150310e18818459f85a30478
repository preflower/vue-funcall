// 将 ts config 内的 overrides 同步到 .vue 文件校验下
const upstreamRules = [
  ...require('./typescript').overrides
].reduce((pre, override) => {
  if (override.files.includes('*.ts')) {
    return Object.assign(pre, override.rules)
  }
  return pre
}, {})

module.exports = {
  env: {
    'vue/setup-compiler-macros': true
  },
  overrides: [
    {
      files: ['*.vue'],
      extends: [
        'plugin:vue/vue3-strongly-recommended',
        'standard-with-typescript'
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: [
          '**/tsconfig.json',
          '**/tsconfig.*.json'
        ]
      },
      rules: {
        /**
         * 组件名称使用时kebab-case形式
         * @reason 统一团队组件使用方式
         */
        'vue/component-name-in-template-casing': [
          'error',
          'kebab-case', {
            registeredComponentsOnly: false
          }
        ],
        /**
         * 组件以Options引入时kebab-case形式
         * @reason 统一团队组件使用方式
         */
        'vue/component-options-name-casing': ['error', 'kebab-case'],
        /**
         * 组件命名必须以kebab-case形式
         * @reason 统一团队组件使用方式
         */
        'vue/component-definition-name-casing': [
          'error', 'kebab-case'
        ],
        /**
         * 事件名称必须以camelCase形式
         * @reason 遵循JavaScript的约定，camelCase更加自然
         */
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        // Off
        'vue/no-use-v-if-with-v-for': 'off',
        'vue/multi-word-component-names': 'off',
        // Off conflict rules
        'func-call-spacing': 'off',
        // 应用 overrides 到 vue 文件
        ...upstreamRules
      }
    }
  ]
}
