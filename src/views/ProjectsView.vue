<template>
  <div class="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('projects.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ $t('projects.description') }}
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full transition-all duration-300"
          :class="[
            selectedCategory === category
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <!-- Project Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ project.description }}
            </p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Links -->
            <div class="flex gap-4">
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                View Live
              </a>
              <a
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  link?: string
  category: string
}

const categories = ['All', 'Web', 'Mobile', 'Desktop']
const selectedCategory = ref('All')

const projects = ref<Project[]>([
  // {
  //   id: 1,
  //   title: 'Personal Portfolio',
  //   description: 'A modern portfolio website built with Vue 3, TypeScript, and Tailwind CSS.',
  //   technologies: ['Vue', 'TypeScript', 'Tailwind'],
  //   image: '/projects/portfolio.jpg',
  //   link: 'https://portfolio.example.com',
  //   github: 'https://github.com/yourusername/portfolio',
  //   category: 'Web'
  // },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'TypeScript'],
    image: '/projects/Taskmanager.png',
    link: 'https://example.com/taskapp',
    github: 'https://github.com/Ibrahim-Almsawa/Task-Manager',
    category: 'Web'
  },
  // {
  //   id: 3,
  //   title: 'Weather Dashboard',
  //   description: 'A weather dashboard that provides real-time weather data and forecasts using multiple weather APIs.',
  //   technologies: ['Vue.js', 'OpenWeather API', 'Chart.js'],
  //   image: '/projects/weather.jpg',
  //   link: 'https://example.com/weather',
  //   github: 'https://github.com/username/weather',
  //   category: 'Web'
  // },
  {
    id: 4,
    title: 'Memory-Game',
    description: 'a Memory Game using Vue, Tailwind CSS, and TypeScript.',
    technologies: ['vue', 'Tailwind CSS', 'TypeScript', ],
    image: '/projects/Memory Game.png',
    link: 'https://example.com/fitness',
    github: 'https://github.com/Ibrahim-Almsawa/Memory-Game',
    category: 'web'
  },
  {
    id: 5,
    title: 'E-commerce Website',
    description: 'A complete e-commerce platform allowing users to browse products, manage their cart, and proceed to checkout with integrated payment solutions.',
    technologies: ['react', 'Tailwind CSS', 'TypeScript', 'Vite'],
    image: '/projects/E-commerce.png',
    link: 'https://example.com/portfolio',
    github: 'https://github.com/Ibrahim-Almsawa/E-commerce',
    category: 'Web'
  },
  {
    id: 6,
    title: 'Vue Budget Tracker',
    description: 'A professional budget and expense tracking application built with Vue 3, TypeScript, and modern web technologies.',
    technologies: ['Vue', 'TypeScript', 'CSS', 'Vite'],
    image: '/projects/Vue Budget Tracker.png',
    github: 'https://github.com/Ibrahim-Almsawa/vue-budget-tracker',
    category: 'Web'
  }
])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects.value
  }
  return projects.value.filter(project => project.category === selectedCategory.value)
})
</script>

<style scoped>
.grid {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.5s ease-out;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
