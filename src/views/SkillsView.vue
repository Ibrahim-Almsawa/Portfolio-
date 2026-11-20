<script setup lang="ts">
import { CodeXml, Database, Fingerprint, PanelsTopLeft } from 'lucide-vue-next'

const groups = [
  { id: 'frontend', icon: CodeXml, stack: ['Vue.js', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { id: 'design', icon: Fingerprint, stack: ['Figma', 'Tailwind CSS', 'Sass'] },
  { id: 'backend', icon: Database, stack: ['Node.js', 'MySQL', 'MongoDB'] },
  { id: 'tools', icon: PanelsTopLeft, stack: ['Git', 'Vite', 'Webpack', 'Docker'] },
]
</script>

<template>
  <section id="skills" class="shell section-block" tabindex="-1" aria-labelledby="skills-title">
    <div v-depth class="section-heading">
      <p class="section-label text-mono">{{ $t('nav.skills') }}</p>
      <h2 id="skills-title">{{ $t('skills.title') }}<span>.</span></h2>
    </div>
    <div class="skills-grid">
      <article v-for="group in groups" :key="group.id" v-depth class="skill-card">
        <component :is="group.icon" :size="24" class="skill-icon" aria-hidden="true" />
        <h3>{{ $t('skills.groups.' + group.id + '.title') }}</h3>
        <p>{{ $t('skills.groups.' + group.id + '.description') }}</p>
        <ul class="tag-list" dir="ltr"><li v-for="tech in group.stack" :key="tech">{{ tech }}</li></ul>
      </article>
    </div>
  </section>
</template>
