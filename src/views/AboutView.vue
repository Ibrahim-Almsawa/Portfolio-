<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import portrait from '../assets/IMG_20250806_103404_113.jpg'

defineProps<{ cv: string }>()
const milestones = [
  { year: '2020', id: 'start' },
  { year: '2021', id: 'firstProject' },
  { year: '2022', id: 'current' },
]
</script>

<template>
  <section id="about" class="section-block about-section" tabindex="-1" aria-labelledby="about-title">
    <div class="shell about-grid">
      <figure class="portrait">
        <img :src="portrait" :alt="$t('identity.name')" width="853" height="1280" loading="lazy" decoding="async">
        <figcaption><span>{{ $t('identity.name') }}</span><span class="text-mono">{{ $t('identity.location') }}</span></figcaption>
      </figure>
      <div class="about-copy">
        <p class="section-label text-mono">{{ $t('nav.about') }}</p>
        <h2 id="about-title">{{ $t('about.title') }}<span>.</span></h2>
        <p>{{ $t('about.description') }}</p>
        <ol class="timeline">
          <li v-for="milestone in milestones" :key="milestone.id">
            <time :datetime="milestone.year" class="text-mono" dir="ltr">{{ milestone.year }}</time>
            <div><h3>{{ $t('about.timeline.' + milestone.id + '.title') }}</h3><p>{{ $t('about.timeline.' + milestone.id + '.description') }}</p></div>
          </li>
        </ol>
        <a class="button button-line" :href="cv" download>{{ $t('about.downloadCV') }} <Download aria-hidden="true" /></a>
      </div>
    </div>
  </section>
</template>
