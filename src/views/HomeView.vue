<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-16">
      <!-- Hero Section -->
      <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <!-- Left Content -->
        <div class="flex-1" :class="{ 
          'text-center lg:text-right': locale === 'ar',
          'text-center lg:text-left': locale === 'en'
        }">
          <div class="space-y-6">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="block text-gray-900 dark:text-white">{{ $t('home.greeting') }}</span>
              <span class="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {{ $t('home.role') }}
              </span>
            </h1>
            
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl" :class="{
              'lg:ml-auto': locale === 'ar',
              'lg:mr-auto': locale === 'en'
            }">
              {{ $t('home.description') }}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-3" :class="{
              'justify-center lg:justify-end': locale === 'ar',
              'justify-center lg:justify-start': locale === 'en'
            }">
              <div v-for="tech in techStack" :key="tech.name"
                   class="flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 group">
                <component 
                  :is="tech.icon" 
                  :class="[
                    'w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400',
                    locale === 'ar' ? 'ml-2' : 'mr-2'
                  ]"
                />
                <span class="text-gray-800 dark:text-gray-200">{{ tech.name }}</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4" :class="{
              'justify-center lg:justify-end': locale === 'ar',
              'justify-center lg:justify-start': locale === 'en'
            }">
              <router-link 
                to="/projects"
                class="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                <FolderIcon class="w-5 h-5" :class="{ 'ml-2': locale === 'ar', 'mr-2': locale === 'en' }" />
                {{ $t('home.viewProjects') }}
              </router-link>
              
              <router-link 
                to="/contact"
                class="inline-flex items-center px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <EnvelopeIcon class="w-5 h-5" :class="{ 'ml-2': locale === 'ar', 'mr-2': locale === 'en' }" />
                {{ $t('home.contactMe') }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- Right Content - Profile Image -->
        <div class="relative w-64 h-64 lg:w-96 lg:h-96" :class="{
          'lg:order-first': locale === 'ar',
          'lg:order-last': locale === 'en'
        }">
          <!-- Animated Background -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          
          <!-- Profile Image -->
          <div class="relative w-full h-full p-2">
            <div class="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-700">
              <img 
                src="@/assets/profile-placeholder.svg"
                alt="Profile"
                class="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute -top-4 w-12 h-12 bg-yellow-400 rounded-lg animate-bounce delay-100"
               :class="{ '-left-4': locale === 'ar', '-right-4': locale === 'en' }"></div>
          <div class="absolute -bottom-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce"
               :class="{ '-right-4': locale === 'ar', '-left-4': locale === 'en' }"></div>
          <div class="absolute top-1/2 w-6 h-6 bg-blue-500 rounded-lg animate-bounce delay-200"
               :class="{ '-left-8': locale === 'ar', '-right-8': locale === 'en' }"></div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="stat in localizedStats" :key="stat.label"
             class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
          <component 
            :is="stat.icon" 
            class="w-8 h-8 mb-4 text-blue-600 dark:text-blue-400 mx-auto"
          />
          <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ stat.value }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  FolderIcon,
  EnvelopeIcon,
  CodeBracketIcon,
  CubeIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()

const techStack = [
  { name: 'Vue.js', icon: CommandLineIcon },
  { name: 'TypeScript', icon: CodeBracketIcon },
  { name: 'Tailwind CSS', icon: CubeIcon },
  { name: 'Git', icon: RocketLaunchIcon }
]

const stats = [
  { key: 'projectsCompleted', value: '15+', icon: FolderIcon },
  { key: 'happyClients', value: '10+', icon: UserGroupIcon },
  { key: 'yearsExperience', value: '3+', icon: ClockIcon },
  { key: 'technologies', value: '10+', icon: CodeBracketIcon }
]

const localizedStats = computed(() => 
  stats.map(stat => ({
    ...stat,
    label: t(`home.stats.${stat.key}`)
  }))
)
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-10%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
