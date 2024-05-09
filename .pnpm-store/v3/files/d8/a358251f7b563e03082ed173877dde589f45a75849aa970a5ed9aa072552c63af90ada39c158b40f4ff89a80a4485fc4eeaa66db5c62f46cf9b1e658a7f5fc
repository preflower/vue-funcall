module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'standard-with-typescript'
      ],
      rules: {
        // TS
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
        '@typescript-eslint/strict-boolean-expressions': ['error', {
          /**
           * 允许自动判断 Nullish 和 Boolean 值
           */
          allowNullableBoolean: true,
          /**
           * 允许自动判断 Nullish 和 Object 值
           */
          allowNullableObject: true
        }],
        // Override JS
        /**
         * 关闭 js indent 规则
         * @reason 使用 TS indent 替代它
         */
        indent: 'off',
        '@typescript-eslint/indent': ['error', 2],
        /**
         * 关闭 js no-undef 规则
         * @reason TS 自带该校验
         */
        'no-undef': 'off',
        // Off
        /**
         * 允许使用 非空断言
         * @reason 使用 非空断言 时就已经清楚了风险
         */
        '@typescript-eslint/no-non-null-assertion': 'off',
        /**
         * 函数返回值必须与声明的类型一致
         * @reason 返回值类型可以推导出来
         */
        '@typescript-eslint/explicit-function-return-type': 'off',
        /**
         * React 组件必须写 propTypes
         * @reason 类型相关的约束交给 TypeScript
         */
        'react/prop-types': 'off'
      }
    }
  ]
}
