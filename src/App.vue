<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from './components/Navbar.vue'

const { locale } = useI18n()
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})

// Watch for language changes and update document direction
watch(locale, (newLocale) => {
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
})
</script>

<template>
  <!-- Loading Screen -->
  <div v-if="isLoading" class="loading-screen fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center">
      <!-- Animated Logo -->
      <div class="loader">
        <svg class="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle class="circle-outer" cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" stroke-width="4"/>
          <circle class="circle-inner" cx="50" cy="50" r="30" fill="none" stroke="#60A5FA" stroke-width="4"/>
          <path class="code-symbol" d="M40,35 L30,50 L40,65 M60,35 L70,50 L60,65" stroke="#93C5FD" stroke-width="4" fill="none"/>
        </svg>
      </div>
      <!-- Loading Text -->
      <div class="loading-text mt-6 text-lg text-gray-700 dark:text-gray-300">
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div v-show="!isLoading" class="min-h-screen bg-gray-50 dark:bg-gray-900" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <Navbar>
      <div class="p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </Navbar>
  </div>
</template>

<style>
.loading-screen {
  background: radial-gradient(circle at center, #1E293B, #0F172A);
}

.loader {
  width: 120px;
  height: 120px;
}

.logo-svg {
  animation: float 3s ease-in-out infinite;
}

.circle-outer {
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  animation: circle-draw 2s ease forwards, pulse 2s ease-in-out infinite;
}

.circle-inner {
  stroke-dasharray: 188;
  stroke-dashoffset: 188;
  animation: circle-draw 2s ease forwards 0.5s, pulse 2s ease-in-out infinite 0.5s;
}

.code-symbol {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 2s ease forwards 1s;
}

@keyframes circle-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.loading-text {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.loading-text .dot {
  animation: dotPulse 1.5s infinite;
  opacity: 0;
}

.loading-text .dot:nth-child(2) {
  animation-delay: 0.5s;
}

.loading-text .dot:nth-child(3) {
  animation-delay: 1s;
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #374151;
}

/* RTL Support */
[dir="rtl"] .sidebar {
  left: auto;
  right: 0;
}

[dir="rtl"] .content {
  margin-left: 0;
  margin-right: 16rem;
}

[dir="rtl"] .content.sidebar-collapsed {
  margin-right: 4rem;
}
</style>
