<script setup lang="ts">
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, MapPin } from 'lucide-vue-next'
import FeaturedProjects from '../components/FeaturedProjects.vue'
import ProjectsView from './ProjectsView.vue'
import AboutView from './AboutView.vue'
import SkillsView from './SkillsView.vue'
import ContactView from './ContactView.vue'

const base = import.meta.env.BASE_URL
const cv = base + 'CV/Ibrahim_CV_ Curriculum Vitae.pdf'
</script>

<template>
  <section class="shell hero" aria-labelledby="hero-title">
    <div v-depth class="hero-copy">
      <p class="availability text-mono"><span></span>{{ $t('identity.available') }}</p>
      <h1 id="hero-title">{{ $t('identity.first') }}<br>{{ $t('identity.last') }}<span>.</span></h1>
      <p class="hero-role">{{ $t('home.role') }}</p>
      <p class="hero-description">{{ $t('home.description') }}</p>
      <div class="hero-actions">
        <RouterLink to="#projects" class="button button-accent">{{ $t('home.viewProjects') }} <ArrowDown aria-hidden="true" /></RouterLink>
        <a :href="cv" download class="button button-line">{{ $t('about.downloadCV') }} <Download aria-hidden="true" /></a>
      </div>
      <div class="hero-socials">
        <a href="https://github.com/Ibrahim-Almsawa" target="_blank" rel="noopener noreferrer"><Github :size="16" aria-hidden="true" /> GitHub <ArrowUpRight :size="13" aria-hidden="true" /></a>
        <a href="https://linkedin.com/in/Ibrahim-Almsawa" target="_blank" rel="noopener noreferrer"><Linkedin :size="16" aria-hidden="true" /> LinkedIn <ArrowUpRight :size="13" aria-hidden="true" /></a>
      </div>
    </div>
    <FeaturedProjects v-depth />
  </section>

  <div class="shell hero-meta">
    <div class="hero-stack"><span class="text-mono">{{ $t('home.stack') }}</span><ul dir="ltr" :aria-label="$t('home.stack')"><li>Vue.js</li><li>TypeScript</li><li>React</li></ul></div>
    <p><MapPin :size="15" aria-hidden="true" /> {{ $t('identity.location') }}</p>
  </div>

  <ProjectsView />
  <AboutView :cv="cv" />
  <SkillsView />
  <ContactView />
</template>
