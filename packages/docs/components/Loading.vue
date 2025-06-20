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
    <div
      v-if="visible"
      class="loading"
      :class="{ fullscreen }"
    >
      <div class="loading-spinner">
        <svg
          class="loading-circular"
          viewBox="25 25 50 50"
        >
          <circle
            class="loading-path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
          />
        </svg>
      </div>
      <div
        v-if="text"
        class="loading-text"
      >
        {{ text }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading {
  z-index: 100;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}

.loading.fullscreen {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.loading-spinner {
  width: 42px;
  height: 42px;
  animation: loading-rotate 2s linear infinite;
}

.loading-circular {
  height: 100%;
  width: 100%;
  animation: loading-rotate 2s linear infinite;
}

.loading-path {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
  animation: loading-dash 1.5s ease-in-out infinite;
}

.loading-text {
  margin-top: 10px;
  color: #409eff;
  font-size: 14px;
}

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.3s;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
