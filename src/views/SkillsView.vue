<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
       :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container mx-auto px-4 py-16">
      <!-- Header with transition -->
      <transition
        enter-active-class="transition duration-700 ease-out"
        enter-from-class="opacity-0 transform -translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span class="block text-gray-900 dark:text-white">{{ $t('skills.title') }}</span>
            <span class="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {{ $t('skills.subtitle') }}
            </span>
          </h1>
        </div>
      </transition>

      <!-- Categories Grid -->
      <transition-group
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 transform translate-y-8"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        move-class="transition-all duration-500"
      >
        <div v-for="(category, key, index) in categories" :key="key"
             class="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
             :style="{ transitionDelay: `${index * 100}ms` }">
          <div class="flex items-center mb-4">
            <component :is="category.icon" 
                      class="w-8 h-8 text-blue-600 dark:text-blue-400"
                      :class="locale === 'ar' ? 'ml-3' : 'mr-3'" />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ $t(`skills.categories.${key}.title`) }}
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t(`skills.categories.${key}.description`) }}
          </p>
        </div>
      </transition-group>

      <!-- Skills Grid -->
      <transition-group
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 transform translate-y-8"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        move-class="transition-all duration-500"
      >
        <div v-for="(skill, key, index) in skillsList" :key="key"
             class="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
             :style="{ transitionDelay: `${index * 50}ms` }">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center">
              <component :is="skill.icon" 
                        class="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:animate-bounce"
                        :class="locale === 'ar' ? 'ml-3' : 'mr-3'" />
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">{{ $t(`skills.skillsList.${key}.name`) }}</h4>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t(`skills.skillsList.${key}.level`) }}</span>
              </div>
            </div>
            <div class="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500"
                   :class="locale === 'ar' ? 'bg-gradient-to-l from-purple-600 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'"
                   :style="{ width: `${getSkillLevel(skill.level)}%` }"></div>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            {{ $t(`skills.skillsList.${key}.description`) }}
          </p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  CommandLineIcon,
  WrenchScrewdriverIcon,
  WindowIcon,
  CodeBracketIcon,
  CubeIcon,
  ServerIcon,
  PaintBrushIcon
} from '@heroicons/vue/24/outline'

const { locale } = useI18n()

const categories = {
  frontend: {
    icon: WindowIcon
  },
  backend: {
    icon: ServerIcon
  },
  tools: {
    icon: WrenchScrewdriverIcon
  },
  design: {
    icon: PaintBrushIcon
  }
}

const skillsList = {
  vuejs: {
    icon: CommandLineIcon,
    level: 'Advanced'
  },
  react: {
    icon: CodeBracketIcon,
    level: 'Intermediate'
  },
  typescript: {
    icon: CodeBracketIcon,
    level: 'Advanced'
  },
  javascript: {
    icon: CodeBracketIcon,
    level: 'Advanced'
  },
  html: {
    icon: CodeBracketIcon,
    level: 'Advanced'
  },
  css: {
    icon: CubeIcon,
    level: 'Advanced'
  },
  tailwind: {
    icon: CubeIcon,
    level: 'Advanced'
  },
  node: {
    icon: ServerIcon,
    level: 'Intermediate'
  },
  git: {
    icon: ServerIcon,
    level: 'Advanced'
  },
  figma: {
    icon: PaintBrushIcon,
    level: 'Intermediate'
  }
}

const getSkillLevel = (level: string): number => {
  switch (level) {
    case 'Advanced':
    case 'متقدم':
      return 90
    case 'Intermediate':
    case 'متوسط':
      return 70
    default:
      return 50
  }
}
</script>
