<template>
  <div>
    <!-- Sidebar -->
    <nav 
      class="fixed top-0 h-screen z-50 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r dark:border-gray-700 shadow-xl sidebar"
      :class="[
        { 'w-72': isOpen, 'w-16': !isOpen },
        locale === 'ar' ? 'right-0 border-l' : 'left-0 border-r'
      ]"
    >
      <div class="flex flex-col h-full relative">
        <!-- Toggle Button -->
        <button 
          @click="toggleSidebar"
          class="absolute top-4 z-10 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :class="{ 
            'right-4': (isOpen && locale === 'en') || (!isOpen && locale === 'ar'),
            'left-4': (!isOpen && locale === 'en') || (isOpen && locale === 'ar')
          }"
          :aria-label="$t('sidebar.toggleSidebar')"
        >
          <component
            :is="isOpen ? XMarkIcon : ChevronRightIcon"
            class="w-5 h-5 text-gray-600 dark:text-gray-300"
            :class="{ 'transform rotate-180': locale === 'ar' }"
          />
        </button>

        <!-- Profile Section (only visible when open) -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div v-if="isOpen" class="p-6 mt-4 text-center">
            <div class="relative inline-block group cursor-pointer">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="@/assets/profile-placeholder.svg" 
                alt="Profile" 
                class="relative w-24 h-24 rounded-full mx-auto border-4 border-white dark:border-gray-700 transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
              />
              <div class="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-700"></div>
            </div>
            <h1 class="mt-4 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ibrahim Almsawa
            </h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {{ $t('sidebar.role') }}
            </p>
            <div class="mt-3 flex justify-center space-x-2" :class="{ 'space-x-reverse': locale === 'ar' }">
              <span class="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                {{ $t('sidebar.availableForWork') }}
              </span>
            </div>
          </div>
        </transition>

        <!-- Navigation Links -->
        <div class="flex-1 px-2 py-4 mt-8 overflow-y-auto">
          <div class="space-y-1 mt-4">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.path"
              :to="item.path"
              custom
              v-slot="{ navigate, isActive }"
            >
              <button
                @click="navigate"
                class="w-full flex items-center px-3 py-3 rounded-lg transition-all duration-300"
                :class="[
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                  { 
                    'justify-start': isOpen,
                    'justify-center': !isOpen
                  }
                ]"
              >
                <div class="flex items-center gap-3">
                  <component 
                    :is="item.icon"
                    class="transition-all duration-300"
                    :class="[
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300',
                      isOpen ? 'w-5 h-5' : 'w-6 h-6'
                    ]"
                  />
                  <transition
                    enter-active-class="transition duration-200 ease-out"
                    :enter-from-class="locale === 'ar' ? 'transform translate-x-4 opacity-0' : 'transform -translate-x-4 opacity-0'"
                    enter-to-class="transform translate-x-0 opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="transform translate-x-0 opacity-100"
                    :leave-to-class="locale === 'ar' ? 'transform translate-x-4 opacity-0' : 'transform -translate-x-4 opacity-0'"
                  >
                    <span v-if="isOpen" class="font-medium whitespace-nowrap">
                      {{ $t(item.name) }}
                    </span>
                  </transition>
                </div>
<!-- Active Indicator -->
<div v-if="isActive" 
  class="absolute w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400  animate-pulse"
  :class="{ 
    'left-2': locale === 'ar' && isOpen,
    'right-2': locale === 'en' && isOpen,

    'left-1': locale === 'ar' && !isOpen,

    'right-1': !isOpen
  }"
></div>
              </button>
            </router-link>
          </div>
        </div>

        <!-- Footer Section (only visible when open) -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div v-if="isOpen" class="p-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-center space-x-3">
              <button 
                @click="toggleTheme"
                class="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <SunIcon v-if="isDark" class="w-6 h-6 text-gray-700 dark:text-gray-300" />
                <MoonIcon v-else class="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <button 
                @click="toggleLanguage"
                class="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LanguageIcon class="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </transition>

        <!-- Minimized Theme and Language Toggle -->
        <div v-if="!isOpen" class="p-2 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col space-y-2">
            <button 
              @click="toggleTheme"
              class="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SunIcon v-if="isDark" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <button 
              @click="toggleLanguage"
              class="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LanguageIcon class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hamburger Menu Button -->
    <button 
      v-show="!isOpen"
      @click="toggleSidebar"
      class="fixed top-4 z-50 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
      :class="locale === 'ar' ? 'right-4' : 'left-4'"
      aria-label="Open Sidebar"
    >
      <Bars3Icon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
    </button>

    <!-- Main Content -->
    <div 
      class="transition-all duration-300"
      :class="[
        locale === 'ar' ? 'mr-16' : 'ml-16',
        { 'mr-72': isOpen && locale === 'ar', 'ml-72': isOpen && locale === 'en' }
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  HomeIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  SunIcon,
  MoonIcon,
  LanguageIcon,
  ChevronRightIcon,
  Bars3Icon ,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const { locale } = useI18n()
const isOpen = ref(window.innerWidth >= 768)
const isDark = ref(false)
// Check if screen is mobile/small
const isMobileScreen = () => window.innerWidth < 768 // 768px is typical mobile breakpoint

// Watch for window resize
const handleResize = () => {
  isOpen.value = !isMobileScreen()
}
// Navigation items
const navigationItems = [
  { name: 'nav.home', path: '/', icon: HomeIcon },
  { name: 'nav.about', path: '/about', icon: UserIcon },
  { name: 'nav.skills', path: '/skills', icon: WrenchScrewdriverIcon },
  { name: 'nav.projects', path: '/projects', icon: DocumentTextIcon },
  { name: 'nav.contact', path: '/contact', icon: EnvelopeIcon }
]

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'ar' : 'en'
  locale.value = newLocale
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  localStorage.setItem('language', newLocale)
}

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  window.addEventListener('resize', handleResize)

  isDark.value = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }

  // Check for saved language preference
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    locale.value = savedLanguage
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'
  }
})
onUnmounted(() => {
  // Clean up resize listener
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Custom Scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

/* Smooth Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.left-4 {
  left: 0.6rem;
}
.right-4 {
  right: 0.6rem;
}
</style>
