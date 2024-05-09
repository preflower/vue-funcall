# eslint-config-ted

My Eslint Rules

- Base on [Standard](https://github.com/standard/standard/blob/HEAD/docs/README-zhcn.md)
- Provide Typescript / Vue / React Support
- Provide JSON Support

## Usage

### Default

- Follow with [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
- Provide `JSON` file check

```bash
pnpm i -D eslint eslint-config-ted
```

Config `.eslintrc`
```js
{
  "extends": [
    "ted"
  ]
}
```

### TS

- Follow with [eslint-config-standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript)

```bash
pnpm i -D typescript
```

Config `.eslintrc`

```js
{
  "extends": [
    "ted",
    "ted/typescript"
  ],
  "parserOptions": {
    "project": [
      './tsconfig.json'
    ]
  }
}
```
> Notice: if you wanna use in `vue`, `typescript` must set after `ted/vue`, otherwise typescript rules will be overrided.

### Vue

- Follow with [eslint-config-vue/vue3-strongly-recommended](https://eslint.vuejs.org/rules/#priority-b-strongly-recommended-improving-readability) rules
- Default open `vue/setup-compiler-macros` config


Config `.eslintrc`

```js
{
  "extends": [
    "ted",
    "ted/vue"
  ],
  "parserOptions": {
    "extraFileExtensions": ['.vue']
  }
}
```

#### Known Issues

- `props` type cannot be infered in template expression when not import vue related api

### React

- Follow with [eslint-config-react/recommended](https://www.npmjs.com/package/eslint-plugin-react#recommended) rules
- Hooks follow with [eslint-config-react-hooks/recommended](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) rules

Config `.eslintrc`

```js
{
  "extends": [
    "ted",
    "ted/react"
  ]
}
```

#### With TS

Config `.eslintrc`
```js
{
  "extends": [
    "ted",
    "ted/typescript",
    "ted/react"
  ]
}
```

## License
MIT

Inspired by 
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)
