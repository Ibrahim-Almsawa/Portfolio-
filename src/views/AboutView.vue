<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-16">
      <!-- About Section -->
      <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mb-24">
        <!-- Left Content -->
        <div class="flex-1" :class="{ 
          'text-center lg:text-right': currentLocale === 'ar',
          'text-center lg:text-left': currentLocale === 'en'
        }">
          <div class="space-y-6">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="block text-gray-900 dark:text-white">{{ $t('about.title') }}</span>
              <span class="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {{ $t('about.subtitle') }}
              </span>
            </h1>
            
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl animate-fadeIn" :class="{
              'lg:ml-auto': currentLocale === 'ar',
              'lg:mr-auto': currentLocale === 'en'
            }">
              {{ $t('about.description.part1') }}
            </p>

            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl animate-fadeIn delay-150" :class="{
              'lg:ml-auto': currentLocale === 'ar',
              'lg:mr-auto': currentLocale === 'en'
            }">
              {{ $t('about.description.part2') }}
            </p>

            <!-- Social Links & CV -->
            <div class="flex flex-wrap gap-4 animate-fadeIn delay-300" :class="{
              'justify-center lg:justify-end': currentLocale === 'ar',
              'justify-center lg:justify-start': currentLocale === 'en'
            }">
              <a 
                href="/CV/Ibrahim_CV_ Curriculum Vitae.pdf"
                download="Ibrahim_Almsawa_CV.pdf"
                class="group inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <DocumentArrowDownIcon class="w-5 h-5 group-hover:animate-bounce" :class="{ 
                  'ml-2': currentLocale === 'ar',
                  'mr-2': currentLocale === 'en'
                }" />
                {{ $t('about.downloadCV') }}
              </a>
              
              <div class="flex gap-4">
                <a v-for="social in socialLinks" 
                   :key="social.name"
                   :href="social.url"
                   :title="$t(`about.social.${social.name}`)"
                   :class="[
                     'inline-flex items-center p-3 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 transition-all duration-300 transform hover:scale-105',
                     social.color
                   ]"
                   class="hover:text-white hover:border-transparent"
                   target="_blank"
                   rel="noopener noreferrer">
                  <component :is="social.icon" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content - Profile Image -->
        <div class="relative w-64 h-64 lg:w-96 lg:h-96" :class="{
          'lg:order-first': currentLocale === 'ar',
          'lg:order-last': currentLocale === 'en'
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
               :class="{ '-left-4': currentLocale === 'ar', '-right-4': currentLocale === 'en' }"></div>
          <div class="absolute -bottom-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce"
               :class="{ '-right-4': currentLocale === 'ar', '-left-4': currentLocale === 'en' }"></div>
          <div class="absolute top-1/2 w-6 h-6 bg-blue-500 rounded-lg animate-bounce delay-200"
               :class="{ '-left-8': currentLocale === 'ar', '-right-8': currentLocale === 'en' }"></div>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="mb-24" ref="skillsRef" :dir="currentLocale === 'ar' ? 'rtl' : 'ltr'">
        <h2 class="text-3xl font-bold text-center mb-12">
          <span class="block text-gray-900 dark:text-white">{{ $t('skills.title') }}</span>
          <span class="block mt-2 text-lg text-gray-600 dark:text-gray-400">{{ $t('skills.subtitle') }}</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="skill in skills" :key="skill.key" 
               class="group relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            <!-- Decorative Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
            
            <!-- Skill Header -->
            <div class="relative flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
                  <component :is="skill.icon" 
                           class="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transform transition-transform duration-300" />
                </div>
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white">{{ $t(`skills.items.${skill.key}.name`) }}</h3>
              </div>
              <span class="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-gray-600 transition-colors duration-300">
                {{ skill.level }}%
              </span>
            </div>

            <!-- Skill Description -->
            <p class="text-gray-600 dark:text-gray-300 mb-4 min-h-[3rem]">
              {{ $t(`skills.items.${skill.key}.description`) }}
            </p>

            <!-- Progress Bar -->
            <div class="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="absolute top-0 bottom-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000 ease-out group-hover:from-blue-500 group-hover:to-purple-500"
                   :class="[ 
                     { 'animate-skillBar': isVisible },
                     currentLocale === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
                   ]"
                   :style="{ 
                     width: `${skill.level}%`,
                     right: currentLocale === 'ar' ? 0 : 'auto',
                     left: currentLocale === 'ar' ? 'auto' : 0,
                     transformOrigin: currentLocale === 'ar' ? 'right' : 'left'
                   }">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="relative py-12" ref="timelineRef">
        <h2 class="text-3xl font-bold text-center mb-12">
          <span class="block text-gray-900 dark:text-white">{{ $t('timeline.title') }}</span>
          <span class="block mt-2 text-lg text-gray-600 dark:text-gray-400">{{ $t('timeline.subtitle') }}</span>
        </h2>

        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-16 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 timeline-line"></div>

          <div class="space-y-16">
            <div v-for="(item, index) in localizedTimeline" :key="index" 
                 class="relative timeline-item"
                 :class="{ 
                   'opacity-0': !isTimelineVisible,
                   'rtl': currentLocale === 'ar'
                 }"
                 :style="{ 'transition-delay': `${index * 200}ms` }">
              
              <!-- Timeline Dot -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-400 timeline-dot"></div>
              
              <!-- Content Card -->
              <div class="group relative grid grid-cols-1 md:grid-cols-2 gap-8"
                   :class="[ 
                     currentLocale === 'ar' ? 
                       (index % 2 === 0 ? 'md:text-left' : 'md:text-right') :
                       (index % 2 === 0 ? 'md:text-right' : 'md:text-left'),
                     { 'md:flex-row-reverse': currentLocale === 'ar' }
                   ]">
                
                <!-- Date -->
                <div :class="[ 
                  'mb-4 md:mb-0',
                  index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                ]">
                  <span class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm transform transition-transform duration-300 hover:scale-105">
                    {{ item.date }}
                  </span>
                </div>

                <!-- Content -->
                <div :class="[ 
                  'p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg timeline-card',
                  index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                ]">
                  <div class="flex items-start" :class="[ 
                    'space-x-4',
                    { 'space-x-reverse': currentLocale === 'ar' },
                    { 'flex-row-reverse': currentLocale === 'ar' }
                  ]">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br transition-all duration-300"
                           :class="[item.color, 'group-hover:scale-110 group-hover:rotate-3']">
                        {{ item.icon }}
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {{ item.title }}
                      </h4>
                      <p class="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{{ item.description }}</p>
                      
                      <!-- Skills Tags -->
                      <div class="mt-4 flex flex-wrap gap-2" :class="{ 'justify-end': currentLocale === 'ar' }">
                        <span v-for="(skill, skillIndex) in item.skills" :key="skill"
                              class="skill-tag px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 transform transition-all duration-300 hover:scale-105"
                              :style="{ '--tag-index': skillIndex }">
                          {{ skill }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useIntersectionObserver } from '@vueuse/core'
import {
  DocumentArrowDownIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CubeIcon,
  RocketLaunchIcon,
} from '@heroicons/vue/24/outline'
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon
} from 'lucide-vue-next'

const { t, locale } = useI18n()
const currentLocale = computed(() => locale.value)

const socialLinks = [
  {
    name: 'github',
    icon: GithubIcon,
    url: 'https://github.com/Ibrahim-Almsawa',
    color: 'hover:bg-gray-800'
  },
  {
    name: 'linkedin',
    icon: LinkedinIcon,
    url: 'https://linkedin.com/in/Ibrahim-Almsawa',
    color: 'hover:bg-blue-600'
  },
  {
    name: 'twitter',
    icon: TwitterIcon,
    url: 'https://x.com/EbrahimMusawa',
    color: 'hover:bg-sky-500'
  },
  {
    name: 'email',
    icon: MailIcon,
    url: 'mailto:wwwi2024h@gmail.com',
    color: 'hover:bg-red-600'
  }
]

const isVisible = ref(false)
const skillsRef = ref(null)
const timelineRef = ref(null)
const isTimelineVisible = ref(false)

// Intersection Observer for animations
useIntersectionObserver(
  skillsRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true
    }
  },
  { threshold: 0.2 }
)

// Add intersection observer for timeline
useIntersectionObserver(
  timelineRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isTimelineVisible.value = true
    }
  },
  { threshold: 0.2 }
)

const skills = [
  { 
    key: 'vue',
    level: 90, 
    icon: CommandLineIcon
  },
  { 
    key: 'typescript',
    level: 85, 
    icon: CodeBracketIcon
  },
  { 
    key: 'tailwind',
    level: 95, 
    icon: CubeIcon
  },
  { 
    key: 'node',
    level: 90, 
    icon: CubeIcon
  },
  { 
    key: 'react',
    level: 88, 
    icon: CodeBracketIcon
  },
  { 
    key: 'git',
    level: 85, 
    icon: RocketLaunchIcon
  }
]

const timeline = [
  {
    icon: '🎓',
    date: '2020',
    titleKey: 'timeline.events.start.title',
    descriptionKey: 'timeline.events.start.description',
    color: 'from-blue-400 to-blue-600',
    skills: ['HTML', 'CSS', 'JavaScript']
  },
  {
    icon: '💼',
    date: '2021',
    titleKey: 'timeline.events.firstProject.title',
    descriptionKey: 'timeline.events.firstProject.description',
    color: 'from-purple-400 to-purple-600',
    skills: ['Vue.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    icon: '🚀',
    date: '2022 - Present',
    titleKey: 'timeline.events.current.title',
    descriptionKey: 'timeline.events.current.description',
    color: 'from-green-400 to-green-600',
    skills: ['TypeScript', 'React', 'Angular']
  }
]

const localizedTimeline = computed(() => 
  timeline.map(item => ({
    ...item,
    title: t(item.titleKey),
    description: t(item.descriptionKey)
  }))
)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 500)
})
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-150 {
  animation-delay: 150ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-300 {
  animation-delay: 300ms;
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

@keyframes skillBar {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes fadeIn {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

/* Timeline Animations */
.timeline-line {
  transform-origin: top;
  animation: drawLine 1.5s ease-out forwards;
}

@keyframes drawLine {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

.timeline-dot {
  animation: dotPulse 2s infinite;
}

@keyframes dotPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.timeline-item {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-card {
  transition: all 0.3s ease;
}

.timeline-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1);
}

.skill-tag {
  opacity: 0;
  animation: tagPop 0.4s ease-out forwards;
  animation-delay: calc(var(--tag-index) * 0.1s + 0.3s);
}

@keyframes tagPop {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* RTL Support */
.rtl {
  direction: rtl;
}

.rtl .timeline-card {
  text-align: right;
}
</style>
