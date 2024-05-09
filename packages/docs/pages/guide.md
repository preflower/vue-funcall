---
outline: deep
---

# Guide

## Install
::: code-group
```bash [pnpm]
$ pnpm install vue-funcall
```
```bash [yarn]
$ yarn install vue-funcall
```
```bash [npm]
$ npm install vue-funcall
```
:::

## Usage

### Basic Usage
Pass it to the app as a plugin, make component mount on Vue instance.
::: details
This step can be ignored if you ensure that Vue context data will not be used in component
:::

```ts
import { createApp } from 'vue'
import { VueFuncallPlugin } from 'vue-funcall' // [!code focus]
import App from './App.vue'

const app = createApp(App)
app.use(VueFuncallPlugin) // [!code focus]
app.mount('#app')
```

Use it in any scenario you wish to use
```ts
import { createFuncall } from 'vue-funcall'

createFuncall(Component, props, options)
```

### Outside close
`vue-funcall` export close function for user

```ts
import { createFuncall } from 'vue-funcall'

cont { close } = createFuncall(Component, props)

close()
```

### Async return result
It is not the capability that the library needs to support, but if you want to implement that functionality through the library, it's a demo

```ts
import { createFuncall } from 'vue-funcall'

const asyncCall = () => {
  return new Promise((resolve, reject) => {
    createFuncall(Component, {
      onSucceed: (result) => resolve(result),
      onFailed: (result) => reject(result)
    })
  })
}
```

## API
```ts
const { close } = createFuncall(Component, props, options)
```

### Parameters

| Name        |      Description      |
| ------------- | ----------- |
| Component | Component that need be function called |
| props | Component support props |
| options | an object of options for `createFuncall` |

### Return Values

| Name | Description |
| ---- | --------- |
| close | a function that unmount Component |

### Options

| Name | Description | Type | Default |
| --- | -- | :--: | :--: |
| visible | Internal field of Component to control Component display or not, If Component are not similiar field, define `undefined` | `string` &#124; `undefined` | modelValue |
| onClosed | Internal field of Component to listen Component closed, If Component are not similiar field, define `undefined` | `string` &#124; `undefined` | undefined |
| container | Define component mount node, default is `document.body` | `HTMLElement` &#124; `undefined` | document.body |
| appContext | For support multiple vue instance | `AppContext` | - |
