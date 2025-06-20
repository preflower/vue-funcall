---
outline: deep
---


<script setup>
import { h } from 'vue'
import { createFuncall } from 'vue-funcall'
import Message from '../components/Message.vue'
import Dialog from '../components/Dialog.vue'
import Loading from '../components/Loading.vue'

// Message
const showMessage = (message, type = 'info') => {
  createFuncall(Message, { message, type })
}

const showMessageWithSlot = () => {
  createFuncall(Message, {}, {
    slots: {
      default: () => h('div', { class: 'message-content' }, 'This is a message with slot')
    }
  })
}

const showAutoCloseMessage = (message, duration = 3000) => {
  const { close } = createFuncall(Message, { message })
  setTimeout(close, duration)
}

// Dialog
const showDialog = () => {
  createFuncall(Dialog, {
    title: 'Confirm Action',
    content: 'This is a dialog example, you can click confirm or cancel',
    onConfirm: () => showMessage('Action confirmed', 'success'),
    onCancel: () => showMessage('Action cancelled', 'warning')
  })
}

// Loading
const loading = {
  instance: null,
  show(text) {
    if (this.instance) return
    this.instance = createFuncall(Loading, {
      text,
      fullscreen: true
    }).close
  },
  hide() {
    if (this.instance) {
      this.instance()
      this.instance = null
    }
  }
}

const simulateAsyncOperation = () => {
  loading.show('Loading...')
  setTimeout(() => {
    loading.hide()
    showMessage('Operation completed', 'success')
  }, 2000)
}
</script>

# Vue Funcall Examples

## Usage
```ts
import { createFuncall } from 'vue-funcall'
import Message from './components/Message.vue'

// Basic usage
const showMessage = (message: string, type = 'info') => {
  createFuncall(Message, { message, type })
}

const showMessageWithSlot = () => {
  createFuncall(Message, {}, {
    default: () => h('div', null, 'This is a message with slot')
  })
}

// Auto-close
const showAutoCloseMessage = (message: string, duration = 3000) => {
  const { close } = createFuncall(Message, { message })
  setTimeout(close, duration)
}
```

### Live Demo
<div class="demo-buttons">
  <button @click="showMessage('Operation successful', 'success')">Success Message</button>
  <button @click="showMessage('Operation failed', 'error')">Error Message</button>
  <button @click="showMessage('Warning information', 'warning')">Warning Message</button>
  <button @click="showMessageWithSlot()">Slot Message</button>
  <button @click="showAutoCloseMessage('This message will auto-close in 3 seconds')">Auto-close Message</button>
</div>

## Dialog Component
A reusable dialog component that supports custom titles, content, button text, and callback functions.

### Component Definition
```vue
<!-- Dialog.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}>()

const visible = ref(true)

const handleConfirm = () => {
  props.onConfirm?.()
  visible.value = false
}

const handleCancel = () => {
  props.onCancel?.()
  visible.value = false
}
</script>

<template>
  <Transition name="dialog-fade">
    <div v-if="visible" class="dialog-overlay">
      <div class="dialog">
        <div class="dialog-header">
          <h3>{{ title || 'Prompt' }}</h3>
        </div>
        <div class="dialog-content">
          {{ content }}
        </div>
        <div class="dialog-footer">
          <button class="dialog-btn cancel" @click="handleCancel">
            {{ cancelText || 'Cancel' }}
          </button>
          <button class="dialog-btn confirm" @click="handleConfirm">
            {{ confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
```

### Usage
```ts
// Basic usage
const showDialog = () => {
  createFuncall(Dialog, {
    title: 'Confirm Delete',
    content: 'Are you sure you want to delete this item?',
    onConfirm: () => console.log('User confirmed'),
    onCancel: () => console.log('User cancelled')
  })
}

// Promise style
const confirm = (options: {
  title?: string
  content: string
  confirmText?: string
  cancelText?: string
}) => {
  return new Promise((resolve, reject) => {
    createFuncall(Dialog, {
      ...options,
      onConfirm: () => resolve(true),
      onCancel: () => reject(false)
    })
  })
}

// Using async/await
try {
  await confirm({
    title: 'Confirm Action',
    content: 'Are you sure you want to perform this action?'
  })
  console.log('User confirmed the action')
} catch {
  console.log('User cancelled the action')
}
```

### Live Demo
<div class="demo-buttons">
  <button @click="showDialog">Open Dialog</button>
</div>

## Loading Component
A fullscreen loading component that supports custom loading text and fullscreen/local display modes.

### Component Definition
```vue
<!-- Loading.vue -->
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  text?: string
  fullscreen?: boolean
}>()

const visible = ref(true)
</script>

<template>
  <Transition name="loading-fade">
    <div v-if="visible" class="loading" :class="{ fullscreen }">
      <div class="loading-spinner">
        <svg class="loading-circular" viewBox="25 25 50 50">
          <circle class="loading-path" cx="50" cy="50" r="20" fill="none" />
        </svg>
      </div>
      <div v-if="text" class="loading-text">{{ text }}</div>
    </div>
  </Transition>
</template>
```

### Usage
```ts
// Service-style usage
const loading = {
  instance: null,
  show(text?: string) {
    if (this.instance) return
    this.instance = createFuncall(Loading, {
      text,
      fullscreen: true
    }).close
  },
  hide() {
    if (this.instance) {
      this.instance()
      this.instance = null
    }
  }
}

// Using in async operations
const handleAsyncOperation = async () => {
  loading.show('Loading...')
  try {
    await someAsyncOperation()
  } finally {
    loading.hide()
  }
}
```

### Live Demo
<div class="demo-buttons">
  <button @click="simulateAsyncOperation">Show Loading</button>
</div>

<style scoped>
.demo-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 1rem 0;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #66b1ff;
}
</style>
