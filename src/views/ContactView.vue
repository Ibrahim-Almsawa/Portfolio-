<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ArrowUpRight, Send } from 'lucide-vue-next'

const fields = [
  { key: 'name', type: 'text', autocomplete: 'name', min: 2, max: 100 },
  { key: 'email', type: 'email', autocomplete: 'email', min: 3, max: 254 },
  { key: 'subject', type: 'text', autocomplete: 'off', min: 5, max: 150 },
] as const
const initial = { name: '', email: '', subject: '', message: '' }
const form = reactive({ ...initial })
const messageMin = 20
const state = ref<'idle' | 'sending' | 'success' | 'error' | 'invalid'>('idle')
const links = [
  { name: 'GitHub', url: 'https://github.com/Ibrahim-Almsawa' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/Ibrahim-Almsawa' },
  { name: 'X', url: 'https://x.com/EbrahimMusawa' },
]

async function submit() {
  if (state.value === 'sending') return
  if (fields.some(field => form[field.key].length < field.min) || form.message.length < messageMin) {
    state.value = 'invalid'
    return
  }
  state.value = 'sending'

  try {
    const response = await fetch('https://formsubmit.co/ajax/wwwi2021@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...form, _subject: `Portfolio Contact: ${form.subject}`, _template: 'table' }),
      signal: AbortSignal.timeout(15000),
    })
    const result = await response.json()
    if (!response.ok || (result?.success !== true && result?.success !== 'true')) {
      state.value = 'error'
      return
    }
    Object.assign(form, initial)
    state.value = 'success'
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="contact-section section-block" tabindex="-1" aria-labelledby="contact-title">
    <div class="shell contact-grid">
      <div class="contact-copy">
        <p class="section-label text-mono">{{ $t('nav.contact') }}</p>
        <h2 id="contact-title">{{ $t('contact.title') }}<span>.</span></h2>
        <p>{{ $t('contact.description') }}</p>
        <a class="email-link" href="mailto:wwwi2024h@gmail.com"><bdi>wwwi2024h@gmail.com</bdi><ArrowUpRight :size="21" aria-hidden="true" /></a>
        <div class="contact-socials">
          <a v-for="link in links" :key="link.name" class="text-link" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.name }} <ArrowUpRight :size="15" aria-hidden="true" /></a>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="submit">
        <div v-for="field in fields" :key="field.key" class="field" :class="{ 'field-wide': field.key === 'subject' }">
          <label :for="field.key">{{ $t('contact.fields.' + field.key) }}</label>
          <input :id="field.key" v-model.trim="form[field.key]" :name="field.key" :type="field.type"
            :autocomplete="field.autocomplete" :minlength="field.min" :maxlength="field.max" :disabled="state === 'sending'" required>
        </div>
        <div class="field field-wide">
          <label for="message">{{ $t('contact.fields.message') }}</label>
          <textarea id="message" v-model.trim="form.message" name="message" rows="4" :minlength="messageMin" maxlength="3000"
            :disabled="state === 'sending'" required></textarea>
        </div>
        <div class="field-wide form-actions">
          <button class="button button-accent" type="submit" :disabled="state === 'sending'">
            {{ $t(state === 'sending' ? 'contact.sending' : 'contact.send') }} <Send aria-hidden="true" />
          </button>
          <p class="form-status" :data-state="state" role="status">{{ state === 'idle' || state === 'sending' ? '' : $t('contact.' + state) }}</p>
        </div>
      </form>
    </div>
  </section>
</template>
