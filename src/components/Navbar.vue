<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-vue-next'

const { locale } = useI18n()
const route = useRoute()
const menuOpen = ref(false)
const isLight = ref(document.documentElement.dataset.theme === 'light')
const menuButton = ref<HTMLButtonElement>()
const sections = ['projects', 'about', 'skills', 'contact'] as const
const logo = import.meta.env.BASE_URL + 'code-icon.svg'

watch(isLight, (light) => {
  const theme = light ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme', theme)
})

function closeMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus()
}
</script>

<template>
  <header class="site-header" @keydown.esc="closeMenu">
    <div class="shell header-inner">
      <RouterLink class="brand" to="/" :aria-label="`${$t('identity.name')} · ${$t('nav.home')}`" @click="menuOpen = false">
        <img :src="logo" width="40" height="40" alt="">
        <span class="brand-name">{{ $t('identity.name') }}</span>
      </RouterLink>

      <nav id="primary-navigation" class="nav-links" :class="{ 'is-open': menuOpen }" :aria-label="$t('nav.label')">
        <RouterLink v-for="section in sections" :key="section" :to="{ hash: '#' + section }"
          :aria-current="route.hash === '#' + section ? 'location' : undefined"
          @click="menuOpen = false">{{ $t('nav.' + section) }}</RouterLink>
      </nav>

      <div class="header-actions">
        <button type="button" class="icon-button language-button" :lang="locale === 'ar' ? 'en' : 'ar'"
          @click="locale = locale === 'ar' ? 'en' : 'ar'">{{ locale === 'ar' ? 'EN' : 'العربية' }}</button>
        <button type="button" class="icon-button" :aria-label="$t(isLight ? 'nav.dark' : 'nav.light')"
          @click="isLight = !isLight">
          <Moon v-if="isLight" :size="17" aria-hidden="true" />
          <Sun v-else :size="17" aria-hidden="true" />
        </button>
        <RouterLink to="#contact" class="button button-line header-cta">{{ $t('nav.talk') }} <ArrowUpRight aria-hidden="true" /></RouterLink>
        <button ref="menuButton" type="button" class="icon-button menu-toggle" :aria-expanded="menuOpen"
          aria-controls="primary-navigation" :aria-label="$t('nav.menu')" @click="menuOpen = !menuOpen">
          <X v-if="menuOpen" :size="22" aria-hidden="true" />
          <Menu v-else :size="22" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>
