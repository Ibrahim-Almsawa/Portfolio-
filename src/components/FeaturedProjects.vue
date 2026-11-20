<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { featuredProjects } from '../projects'

const { locale, t } = useI18n()
const active = ref(0)
const direction = ref(1)
const project = computed(() => featuredProjects[active.value]!)
const title = computed(() => t('projects.items.' + project.value.id + '.title'))
const slideDirection = computed(() => direction.value * (locale.value === 'ar' ? -1 : 1))

function step(change: number) {
  direction.value = change
  active.value = (active.value + change + featuredProjects.length) % featuredProjects.length
}
</script>

<template>
  <section class="featured-projects" aria-labelledby="featured-label">
    <div class="featured-header">
      <p id="featured-label" class="text-mono">{{ $t('home.featured') }}</p>
      <div class="featured-navigation">
        <span class="featured-count text-mono" dir="ltr" aria-hidden="true">{{ String(active + 1).padStart(2, '0') }} / {{ String(featuredProjects.length).padStart(2, '0') }}</span>
        <button type="button" class="icon-button featured-control" :aria-label="$t('home.previousProject')" @click="step(-1)">
          <ArrowLeft :size="19" aria-hidden="true" />
        </button>
        <button type="button" class="icon-button featured-control" :aria-label="$t('home.nextProject')" @click="step(1)">
          <ArrowRight :size="19" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="featured-stage" :style="{ '--slide-direction': slideDirection }">
      <div class="feature-backing" aria-hidden="true"></div>
      <div class="feature-stack" aria-hidden="true">
        <Transition name="feature-slide">
          <div :key="project.id" class="feature-frame">
            <div class="feature-screen" dir="ltr">
              <span class="window-chrome"><i></i><i></i><i></i></span>
              <img :src="project.image" alt="" decoding="async">
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="featured-footer">
      <div class="featured-info" aria-live="polite" aria-atomic="true">
        <h2>{{ title }}</h2>
        <p><bdi>{{ project.stack.join(' · ') }}</bdi></p>
      </div>
      <a class="button button-line featured-demo" :href="project.demo" target="_blank" rel="noopener noreferrer"
        :aria-label="`${$t('projects.live')} · ${title}`">
        {{ $t('projects.live') }} <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.featured-projects {
  align-self: center;
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
}

.featured-header, .featured-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.85rem clamp(0.85rem, 2vw, 1.4rem);
}

.featured-header {
  color: var(--highlight);
  padding-block: 0.4rem;
}

.featured-count, .featured-info p {
  color: var(--muted);
}

.featured-stage {
  position: relative;
  display: grid;
  place-items: center;
  overflow: clip;
  aspect-ratio: 1.56;
  perspective: 1050px;
  background:
    linear-gradient(to right, #b8d4a016 1px, transparent 1px) center / 28px 28px,
    linear-gradient(to bottom, #b8d4a016 1px, transparent 1px) center / 28px 28px,
    radial-gradient(ellipse at 72% 19%, #455a37, #232c20 70%);
}

.feature-backing, .feature-stack {
  grid-area: 1 / 1;
  position: relative;
  width: 85%;
  height: 77%;
}

.feature-backing {
  color: #afc39b66;
}

.feature-stack {
  z-index: 1;
  transform-style: preserve-3d;
}

.feature-backing::before,
.feature-backing::after {
  position: absolute;
  inset: 0;
  content: "";
  border-radius: 10px;
  border: 1px solid currentColor;
  background: #4d6541;
  transform: translateY(12px) scale(0.98);
}

.feature-backing::after {
  z-index: -1;
  background: #334730;
  transform: translateY(23px) scale(0.955);
}

.feature-frame {
  position: absolute;
  inset: 0;
  transform: rotateX(5deg) rotateY(-6deg);
  backface-visibility: hidden;
}

[dir="rtl"] .feature-frame {
  transform: rotateX(5deg) rotateY(6deg);
}

.feature-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #afc39b9e;
  border-radius: 10px;
  background: #171e16;
  box-shadow: 0 20px 36px #10161088;
}

.feature-screen img {
  width: 100%;
  flex: 1;
  min-height: 0;
  object-fit: cover;
  object-position: top center;
}

.featured-info {
  min-width: 0;
}

.featured-info h2 {
  font-size: clamp(1.05rem, 2vw, 1.5rem);
  letter-spacing: -0.03em;
  line-height: 1.25;
}

.featured-info p {
  margin-top: 0.2rem;
  font-size: 0.8rem;
}

.featured-navigation {
  display: flex;
  flex: none;
  align-items: center;
  gap: 0.3rem;
}

.featured-count {
  margin-inline-end: 0.35rem;
}

.featured-footer {
  flex-wrap: wrap;
}

.featured-demo, .featured-control {
  min-height: 44px;
}

.featured-demo {
  flex: none;
}

.featured-control {
  border-color: var(--border);
  color: var(--ink);
}

.featured-control:hover {
  border-color: var(--highlight);
  color: var(--highlight);
}

[dir="rtl"] .featured-control svg {
  scale: -1 1;
}

@media (prefers-reduced-motion: no-preference) {
  .feature-slide-enter-active, .feature-slide-leave-active {
    transition: transform 440ms var(--depth-ease), opacity 320ms ease;
  }

  .feature-slide-enter-from {
    opacity: 0;
    transform: translate3d(calc(var(--slide-direction) * 24%), 1rem, -150px)
      rotateY(calc(var(--slide-direction) * 32deg));
  }

  .feature-slide-leave-to {
    opacity: 0;
    transform: translate3d(calc(var(--slide-direction) * -15%), 0, -100px)
      rotateY(calc(var(--slide-direction) * -22deg));
  }
}

</style>
