<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Box, MousePointer2 } from 'lucide-vue-next'
import sculpturePoster from '../assets/sculpture.webp'

const host = ref<HTMLDivElement>()
const ready = ref(false)
let dispose: (() => void) | undefined

onMounted(() => {
  const panel = host.value
  if (!panel) return

  const observer = new IntersectionObserver(async ([entry]) => {
    if (!entry?.isIntersecting) return
    observer.disconnect()
    try {
      const { mountSculpture } = await import('./sculpture')
      if (host.value !== panel) return
      dispose = mountSculpture(panel, (visible) => { ready.value = visible })
    } catch {
      // The poster remains visible when WebGL is unavailable.
    }
  })
  observer.observe(panel)
  dispose = () => observer.disconnect()
})

onBeforeUnmount(() => dispose?.())
</script>

<template>
  <div class="scene-panel" :class="{ 'scene-ready': ready }">
    <div class="scene-grid" aria-hidden="true"></div>
    <div class="scene-orbit" aria-hidden="true"></div>
    <img class="scene-fallback" :src="sculpturePoster" alt="" width="588" height="614" decoding="async">
    <div ref="host" class="scene-canvas" aria-hidden="true"></div>
    <div class="scene-label text-mono"><Box :size="15" aria-hidden="true" /> {{ $t('home.scene') }}</div>
    <span class="scene-plus" aria-hidden="true">+</span>
    <div v-if="ready" class="scene-hint text-mono" aria-hidden="true"><MousePointer2 :size="14" /> {{ $t('home.sceneHint') }}</div>
  </div>
</template>
