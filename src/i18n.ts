import { createI18n } from 'vue-i18n'

const en = {
  contact: {
    title: 'Get in Touch',
    subtitle: "Let's Work Together",
    description: "I'm always open to new opportunities and collaborations. Feel free to reach out!",
    form: {
      name: {
        label: 'Your Name',
        placeholder: 'Enter your name',
        error: 'Name is required'
      },
      email: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        error: 'Please enter a valid email'
      },
      subject: {
        label: 'Subject',
        placeholder: 'What is this about?',
        error: 'Subject is required'
      },
      message: {
        label: 'Message',
        placeholder: 'Your message here...',
        error: 'Message is required'
      },
      submit: 'Send Message',
      sending: 'Sending...'
    },
    contactInfo: {
      title: 'Contact Information',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      followMe: 'Follow Me'
    },
    success: 'Message sent successfully!',
    error: 'Error sending message. Please try again.'
  }
}

const ar = {
  contact: {
    title: 'تواصل معي',
    subtitle: 'لنعمل معاً',
    description: 'أنا دائماً منفتح للفرص والتعاون الجديد. لا تتردد في التواصل!',
    form: {
      name: {
        label: 'الاسم',
        placeholder: 'أدخل اسمك',
        error: 'الاسم مطلوب'
      },
      email: {
        label: 'البريد الإلكتروني',
        placeholder: 'أدخل بريدك الإلكتروني',
        error: 'يرجى إدخال بريد إلكتروني صحيح'
      },
      subject: {
        label: 'الموضوع',
        placeholder: 'ما هو موضوع رسالتك؟',
        error: 'الموضوع مطلوب'
      },
      message: {
        label: 'الرسالة',
        placeholder: 'اكتب رسالتك هنا...',
        error: 'الرسالة مطلوبة'
      },
      submit: 'إرسال الرسالة',
      sending: 'جاري الإرسال...'
    },
    contactInfo: {
      title: 'معلومات التواصل',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      location: 'الموقع',
      followMe: 'تابعني'
    },
    success: 'تم إرسال الرسالة بنجاح!',
    error: 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.'
  }
}

type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], 'en' | 'ar'>({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ar
  }
})

export default i18n
