<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
    <div class="container mx-auto px-4">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span class="block text-gray-900 dark:text-white">{{ t('contact.title') }}</span>
          <span class="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {{ t('contact.subtitle') }}
          </span>
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('contact.description') }}
        </p>
      </div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-4">
              <!-- Name Input -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.form.name.label') }}
                </label>
                <div class="relative">
                  <UserIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    required
                    @blur="handleBlur('name')"
                    :class="[
                      'w-full pl-10 pr-10 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-colors',
                      touched.name && getFieldError('name')
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : isFieldValid('name')
                        ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    ]"
                    :placeholder="t('contact.form.name.placeholder')"
                  />
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <ExclamationCircleIcon
                      v-if="touched.name && getFieldError('name')"
                      class="w-5 h-5 text-red-500"
                    />
                    <CheckCircleIcon
                      v-else-if="isFieldValid('name')"
                      class="w-5 h-5 text-green-500"
                    />
                  </div>
                </div>
                <p
                  v-if="touched.name && getFieldError('name')"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ t('contact.form.name.error') }}
                </p>
              </div>

              <!-- Email Input -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.form.email.label') }}
                </label>
                <div class="relative">
                  <EnvelopeIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    @blur="handleBlur('email')"
                    :class="[
                      'w-full pl-10 pr-10 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-colors',
                      touched.email && getFieldError('email')
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : isFieldValid('email')
                        ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    ]"
                    :placeholder="t('contact.form.email.placeholder')"
                  />
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <ExclamationCircleIcon
                      v-if="touched.email && getFieldError('email')"
                      class="w-5 h-5 text-red-500"
                    />
                    <CheckCircleIcon
                      v-else-if="isFieldValid('email')"
                      class="w-5 h-5 text-green-500"
                    />
                  </div>
                </div>
                <p
                  v-if="touched.email && getFieldError('email')"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ t('contact.form.email.error') }}
                </p>
              </div>

              <!-- Subject Input -->
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.form.subject.label') }}
                </label>
                <div class="relative">
                  <ChatBubbleLeftIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="subject"
                    v-model="formData.subject"
                    type="text"
                    required
                    @blur="handleBlur('subject')"
                    :class="[
                      'w-full pl-10 pr-10 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-colors',
                      touched.subject && getFieldError('subject')
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : isFieldValid('subject')
                        ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    ]"
                    :placeholder="t('contact.form.subject.placeholder')"
                  />
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <ExclamationCircleIcon
                      v-if="touched.subject && getFieldError('subject')"
                      class="w-5 h-5 text-red-500"
                    />
                    <CheckCircleIcon
                      v-else-if="isFieldValid('subject')"
                      class="w-5 h-5 text-green-500"
                    />
                  </div>
                </div>
                <p
                  v-if="touched.subject && getFieldError('subject')"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ t('contact.form.subject.error') }}
                </p>
              </div>

              <!-- Message Input -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('contact.form.message.label') }}
                </label>
                <div class="relative">
                  <PencilSquareIcon class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="message"
                    v-model="formData.message"
                    required
                    rows="5"
                    @blur="handleBlur('message')"
                    :class="[
                      'w-full pl-10 pr-10 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-colors resize-none',
                      touched.message && getFieldError('message')
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : isFieldValid('message')
                        ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    ]"
                    :placeholder="t('contact.form.message.placeholder')"
                  ></textarea>
                  <div class="absolute right-3 top-3">
                    <ExclamationCircleIcon
                      v-if="touched.message && getFieldError('message')"
                      class="w-5 h-5 text-red-500"
                    />
                    <CheckCircleIcon
                      v-else-if="isFieldValid('message')"
                      class="w-5 h-5 text-green-500"
                    />
                  </div>
                </div>
                <p
                  v-if="touched.message && getFieldError('message')"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ t('contact.form.message.error') }}
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div class="flex items-center justify-center">
                <ArrowPathIcon v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                {{ isSubmitting ? t('contact.form.sending') : t('contact.form.submit') }}
              </div>
            </button>

            <!-- Success/Error Message -->
            <TransitionRoot appear :show="!!statusMessage" as="template">
              <div
                :class="[
                  'mt-4 p-4 rounded-lg text-sm',
                  statusMessage?.type === 'success'
                    ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400'
                ]"
              >
                {{ statusMessage?.text }}
              </div>
            </TransitionRoot>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('contact.contactInfo.title') }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ t('contact.contactInfo.description') }}</p>

          <!-- Contact Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Email Card -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start" :class="locale === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'">
                <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <EnvelopeIcon class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('contact.contactInfo.email.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('contact.contactInfo.email.description') }}</p>
                </div>
              </div>
            </div>

            <!-- Location Card -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start" :class="locale === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'">
                <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <MapPinIcon class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('contact.contactInfo.location.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('contact.contactInfo.location.description') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">{{ t('contact.contactInfo.social.title') }}</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group"
              >
                <component
                  :is="social.icon"
                  :class="[
                    'w-6 h-6 text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:scale-110',
                    social.color
                  ]"
                />
                <span :class="['mt-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300', social.color]">
                  {{ t(`contact.contactInfo.social.${social.name.toLowerCase()}`) }}
                </span>
              </a>
            </div>
          </div>

          <!-- Availability Status -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div class="flex items-center" :class="locale === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'">
              <div class="relative">
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <div class="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('contact.contactInfo.availability.title') }}</h3>
                <p class="text-gray-600 dark:text-gray-300">{{ t('contact.contactInfo.availability.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'
import {
  UserIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  MapPinIcon,
  LinkIcon,
  CodeBracketIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormError {
  field: keyof FormData
  message: string
}

interface StatusMessage {
  type: 'success' | 'error'
  text: string
}

interface SubmitFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  _subject: string;
  _template: string;
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const touched = reactive({
  name: false,
  email: false,
  subject: false,
  message: false
})

const formErrors = computed(() => {
  const errors: FormError[] = []
  
  if (touched.name && !formData.name.trim()) {
    errors.push({ field: 'name', message: t('contact.form.name.error') })
  } else if (touched.name && formData.name.length < 2) {
    errors.push({ field: 'name', message: t('contact.form.name.error') })
  }

  if (touched.email && !formData.email) {
    errors.push({ field: 'email', message: t('contact.form.email.error') })
  } else if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push({ field: 'email', message: t('contact.form.email.error') })
  }

  if (touched.subject && !formData.subject.trim()) {
    errors.push({ field: 'subject', message: t('contact.form.subject.error') })
  } else if (touched.subject && formData.subject.length < 5) {
    errors.push({ field: 'subject', message: t('contact.form.subject.error') })
  }

  if (touched.message && !formData.message.trim()) {
    errors.push({ field: 'message', message: t('contact.form.message.error') })
  } else if (touched.message && formData.message.length < 20) {
    errors.push({ field: 'message', message: t('contact.form.message.error') })
  }

  return errors
})

const getFieldError = (field: keyof FormData) => {
  return formErrors.value.find(error => error.field === field)?.message
}

const isFieldValid = (field: keyof FormData) => {
  return touched[field] && !getFieldError(field)
}

const isSubmitting = ref(false)
const statusMessage = ref<StatusMessage | null>(null)
const formSubmitted = ref(false)

const handleBlur = (field: keyof FormData) => {
  touched[field] = true
}

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/Ibrahim-Almsawa',
    icon: LinkIcon,
    color: 'hover:text-[#0A66C2]'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Ibrahim-Almsawa',
    icon: CodeBracketIcon,
    color: 'hover:text-[#171515]'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/EbrahimMusawa',
    icon: ArrowPathIcon,
    color: 'hover:text-[#1DA1F2]'
  }
]

const handleSubmit = async () => {
  // Mark all fields as touched
  Object.keys(touched).forEach(key => {
    touched[key as keyof FormData] = true
  })

  // Check for validation errors
  if (formErrors.value.length > 0) {
    statusMessage.value = {
      type: 'error',
      text: t('contact.form.error')
    }
    return
  }

  try {
    isSubmitting.value = true
    
    const submitData: SubmitFormData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      _subject: `Portfolio Contact: ${formData.subject}`,
      _template: 'table'
    }

    const response = await fetch('https://formsubmit.co/wwwi2021@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submitData)
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }
    
    statusMessage.value = {
      type: 'success',
      text: t('contact.form.success')
    }
    
    formSubmitted.value = true
    
    // Reset form
    Object.keys(formData).forEach(key => {
      formData[key as keyof FormData] = ''
      touched[key as keyof FormData] = false
    })
  } catch (error) {
    statusMessage.value = {
      type: 'error',
      text: t('contact.form.error')
    }
  } finally {
    isSubmitting.value = false
    // Clear status message after 5 seconds
    setTimeout(() => {
      statusMessage.value = null
    }, 5000)
  }
}
</script>

<style scoped>
.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Custom Scrollbar for Textarea */
textarea {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 transparent;
}

textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
}

.dark textarea::-webkit-scrollbar-thumb {
  background-color: #4B5563;
}
</style>
