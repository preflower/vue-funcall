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
    <div
      v-if="visible"
      class="dialog-overlay"
    >
      <div class="dialog">
        <div class="dialog-header">
          <h3>{{ title || '提示' }}</h3>
        </div>
        <div class="dialog-content">
          {{ content }}
        </div>
        <div class="dialog-footer">
          <button
            class="dialog-btn cancel"
            @click="handleCancel"
          >
            {{ cancelText || '取消' }}
          </button>
          <button
            class="dialog-btn confirm"
            @click="handleConfirm"
          >
            {{ confirmText || '确定' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dialog-overlay {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: white;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.dialog-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.dialog-content {
  padding: 20px;
  min-height: 60px;
  color: #666;
}

.dialog-footer {
  padding: 10px 20px;
  border-top: 1px solid #eee;
  text-align: right;
}

.dialog-btn {
  padding: 8px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.dialog-btn.cancel {
  background: #f5f5f5;
  color: #666;
}

.dialog-btn.cancel:hover {
  background: #e8e8e8;
}

.dialog-btn.confirm {
  background: #409eff;
  color: white;
}

.dialog-btn.confirm:hover {
  background: #66b1ff;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
