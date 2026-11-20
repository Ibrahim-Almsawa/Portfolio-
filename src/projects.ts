const images = import.meta.env.BASE_URL + 'projects/'

const projectsById = {
  budget: { id: 'budget', category: 'apps', image: images + 'Vue Budget Tracker.png', repo: 'vue-budget-tracker', demo: 'https://vue-tracker-budget.netlify.app/', stack: ['Vue 3', 'TypeScript', 'Vite'] },
  education: { id: 'education', category: 'sites', image: images + 'Edu-Resources.png', repo: 'edu-resources', demo: 'https://ibrahim-edu.netlify.app/', stack: ['Astro', 'JavaScript', 'Tailwind CSS'] },
  tasks: { id: 'tasks', category: 'apps', image: images + 'Taskmanager.png', repo: 'Task-Manager', demo: 'https://task-manager-hima.netlify.app/', stack: ['React', 'Firebase', 'TypeScript'] },
  commerce: { id: 'commerce', category: 'sites', image: images + 'E-commerce.png', repo: 'E-commerce', demo: undefined, stack: ['React', 'TypeScript', 'Tailwind CSS'] },
  memory: { id: 'memory', category: 'games', image: images + 'Memory Game.png', repo: 'Memory-Game', demo: 'https://hima-game.netlify.app/', stack: ['Vue 3', 'TypeScript', 'Tailwind CSS'] },
}

export const projects = Object.values(projectsById)
export const featuredProjects = [projectsById.education, projectsById.budget, projectsById.memory]
