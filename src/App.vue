<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUp } from 'lucide-vue-next'
import Navbar from './components/Navbar.vue'

const { t, locale } = useI18n()
watch(locale, (language) => {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  document.title = `${t('identity.name')} · ${t('home.role')}`
  localStorage.setItem('language', language)
}, { immediate: true })
</script>

<template>
  <a class="skip-link" href="#main-content">{{ $t('nav.skip') }}</a>
  <Navbar />
  <main id="main-content" tabindex="-1">
    <RouterView />
  </main>
  <footer class="site-footer">
    <div class="shell footer-inner">
      <span>© {{ new Date().getFullYear() }} {{ $t('identity.name') }}</span>
      <RouterLink to="/" class="text-link">{{ $t('nav.back') }} <ArrowUp :size="15" aria-hidden="true" /></RouterLink>
    </div>
  </footer>
</template>
