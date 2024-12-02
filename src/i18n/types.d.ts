import { DefineLocaleMessage } from 'vue-i18n'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    timeline: {
      title: string
      subtitle: string
      events: {
        start: {
          title: string
          description: string
        }
        firstProject: {
          title: string
          description: string
        }
        current: {
          title: string
          description: string
        }
      }
    }
  }
}
