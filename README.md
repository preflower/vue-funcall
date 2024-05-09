# Vue funcall
A method that create component with function call

## Quick Start

### Basic Usage
```ts
import { createFuncall } from 'vue-funcall'

createFuncall(Component, props)
```

### Outside close
```ts
import { createFuncall } from 'vue-funcall'

const instance = createFuncall(Component, props)

instance.close()
```

### Async return result
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
