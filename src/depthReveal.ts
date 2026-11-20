import type { ObjectDirective } from 'vue'

let observer: IntersectionObserver | undefined

export const depthReveal: ObjectDirective<HTMLElement> = {
  mounted(element) {
    if (!('IntersectionObserver' in window)) return

    observer ??= new IntersectionObserver((entries, watcher) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
          entry.target.classList.add('depth-reveal')
        }
        watcher.unobserve(entry.target)
      }
    }, { threshold: 0.12 })

    observer.observe(element)
  },
  unmounted(element) {
    observer?.unobserve(element)
  },
}
