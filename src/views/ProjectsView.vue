<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, Github } from 'lucide-vue-next'

const categories = ['all', 'apps', 'sites', 'games'] as const
const selected = ref<(typeof categories)[number]>('all')
const github = 'https://github.com/Ibrahim-Almsawa/'
const base = import.meta.env.BASE_URL
const projects = [
  { id: 'budget', category: 'apps', image: 'Vue Budget Tracker.png', repo: 'vue-budget-tracker', demo: 'https://vue-tracker-budget.netlify.app/', stack: ['Vue 3', 'TypeScript', 'Vite'] },
  { id: 'education', category: 'sites', image: 'Edu-Resources.png', repo: 'edu-resources', demo: 'https://ibrahim-edu.netlify.app/', stack: ['Astro', 'JavaScript', 'Tailwind CSS'] },
  { id: 'tasks', category: 'apps', image: 'Taskmanager.png', repo: 'Task-Manager', demo: 'https://task-manager-hima.netlify.app/', stack: ['React', 'Firebase', 'TypeScript'] },
  { id: 'commerce', category: 'sites', image: 'E-commerce.png', repo: 'E-commerce', stack: ['React', 'TypeScript', 'Tailwind CSS'] },
  { id: 'memory', category: 'games', image: 'Memory Game.png', repo: 'Memory-Game', demo: 'https://hima-game.netlify.app/', stack: ['Vue 3', 'TypeScript', 'Tailwind CSS'] },
]
const filtered = computed(() => projects.filter(project => selected.value === 'all' || project.category === selected.value))
</script>

<template>
  <section id="projects" class="shell section-block" tabindex="-1" aria-labelledby="projects-title">
    <div class="section-heading section-heading-row">
      <div>
        <p class="section-label text-mono">{{ $t('nav.projects') }}</p>
        <h2 id="projects-title">{{ $t('projects.title') }}<span>.</span></h2>
      </div>
      <div class="project-filters" role="group" :aria-label="$t('projects.filter')">
        <button v-for="category in categories" :key="category" type="button" :aria-pressed="selected === category"
          @click="selected = category">{{ $t('projects.categories.' + category) }}</button>
      </div>
    </div>

    <p class="sr-only" role="status">{{ $t('projects.count', { count: filtered.length }) }}</p>
    <div class="projects-grid" :class="{ 'projects-grid-all': selected === 'all' }">
      <article v-for="project in filtered" :key="project.id" class="project-card">
        <a class="project-cover" :class="'cover-' + project.id" :href="project.demo || github + project.repo"
          :aria-label="`${$t('projects.items.' + project.id + '.title')} · ${$t(project.demo ? 'projects.live' : 'projects.code')}`"
          target="_blank" rel="noopener noreferrer">
          <div class="project-window" dir="ltr">
            <span class="window-chrome" aria-hidden="true"><i></i><i></i><i></i></span>
            <img :src="base + 'projects/' + project.image" alt="" loading="lazy" decoding="async">
          </div>
          <span class="project-open"><ArrowUpRight :size="21" aria-hidden="true" /></span>
        </a>
        <div class="project-info">
          <p class="project-category text-mono">{{ $t('projects.categories.' + project.category) }}</p>
          <h3>{{ $t('projects.items.' + project.id + '.title') }}</h3>
          <p>{{ $t('projects.items.' + project.id + '.description') }}</p>
          <ul class="tag-list" dir="ltr"><li v-for="tech in project.stack" :key="tech">{{ tech }}</li></ul>
          <div class="project-links">
            <a v-if="project.demo" :href="project.demo" class="text-link" target="_blank" rel="noopener noreferrer">{{ $t('projects.live') }} <ArrowUpRight :size="15" aria-hidden="true" /></a>
            <a :href="github + project.repo" class="text-link" target="_blank" rel="noopener noreferrer"><Github :size="15" aria-hidden="true" /> {{ $t('projects.code') }}</a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
