<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
}>()

const visible = ref(true)
</script>

<template>
  <Transition name="message-fade">
    <div
      v-if="visible"
      class="message"
      :class="type"
    >
      <slot>
        <span class="message-content">{{ message }}</span>
      </slot>
    </div>
  </Transition>
</template>

<style scoped>
.message {
  z-index: 100;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, transform 0.3s;
}

.message.success {
  color: #67c23a;
  background-color: #f0f9eb;
  border: 1px solid #e1f3d8;
}

.message.error {
  color: #f56c6c;
  background-color: #fef0f0;
  border: 1px solid #fde2e2;
}

.message.warning {
  color: #e6a23c;
  background-color: #fdf6ec;
  border: 1px solid #faecd8;
}

.message.info {
  color: #909399;
  background-color: #f4f4f5;
  border: 1px solid #e9e9eb;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
</style>
