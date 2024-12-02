<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from './components/Navbar.vue'

const { locale } = useI18n()

// Watch for language changes and update document direction
watch(locale, (newLocale) => {
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
