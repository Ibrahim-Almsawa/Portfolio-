<template>
  <div class="min-h-screen bg-[#0A0F1C] dark:bg-[#0A0F1C] relative overflow-hidden">
    <!-- Animated Background Grid -->
    <div class="absolute inset-0">
      <div class="grid-animation"></div>
    </div>

    <!-- Glowing Orbs -->
    <div class="glow-orb glow-orb-1"></div>
    <div class="glow-orb glow-orb-2"></div>
    <div class="glow-orb glow-orb-3"></div>

    <div class="container relative mx-auto px-4 py-16 z-10">
      <!-- Hero Section -->
      <div class="flex flex-col lg:flex-row items-center justify-between gap-16">
        <!-- Left Content -->
        <div class="flex-1 glass-card p-8 lg:p-12" :class="{ 
          'text-center lg:text-right order-2 lg:order-1': locale === 'ar',
          'text-center lg:text-left order-2 lg:order-1': locale === 'en'
        }">
          <!-- Status Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
            <span class="pulse-dot"></span>
            <span class="text-emerald-400 text-sm font-medium ml-2">{{ $t('home.available') }}</span>
          </div>

          <!-- Main Heading -->
          <div class="space-y-6 mb-12">
            <h1 class="text-5xl lg:text-7xl font-bold tracking-tight">
              <span class="text-white">{{ $t('home.greeting') }}</span>
              <div class="mt-4">
                <span class="gradient-text">{{ $t('home.role') }}</span>
              </div>
            </h1>
            
            <p class="text-gray-400 text-lg leading-relaxed max-w-2xl">
              {{ $t('home.description') }}
            </p>
          </div>

          <!-- Tech Stack -->
          <div class="tech-grid mb-12">
            <div v-for="tech in techStack" :key="tech.name"
                 class="tech-card group">
              <div class="tech-icon">
                <component :is="tech.icon" class="w-6 h-6" />
              </div>
              <span class="tech-name">{{ tech.name }}</span>
              <div class="tech-card-glow"></div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-6 justify-center lg:justify-start">
            <router-link to="/projects" class="cta-button primary">
              <FolderIcon class="w-5 h-5 mr-2" />
              <span>{{ $t('home.viewProjects') }}</span>
              <div class="cta-button-glow"></div>
            </router-link>
            
            <router-link to="/contact" class="cta-button secondary">
              <EnvelopeIcon class="w-5 h-5 mr-2" />
              <span>{{ $t('home.contactMe') }}</span>
              <div class="cta-button-glow"></div>
            </router-link>
          </div>
        </div>

        <!-- Right Content - Profile Section -->
        <div class="profile-container order-1 lg:order-2">
          <!-- Profile Frame -->
          <div class="profile-frame">
            <div class="profile-image-wrapper">
              <img 
                src="@/assets/profile-placeholder.svg"
                alt="Profile"
                class="profile-image"
              />
            </div>
            
            <!-- Decorative Elements -->
            <div class="decorative-circles">
              <div class="circle circle-1"></div>
              <div class="circle circle-2"></div>
              <div class="circle circle-3"></div>
            </div>
            
            <!-- Tech Particles -->
            <div class="tech-particles">
              <div v-for="i in 8" :key="i" class="particle"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="stats-grid">
        <div v-for="stat in localizedStats" :key="stat.label" class="stat-card">
          <div class="stat-icon">
            <component :is="stat.icon" />
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
          <div class="stat-card-glow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  FolderIcon,
  EnvelopeIcon,
  CodeBracketIcon,
  CubeIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()

const techStack = [
  { name: 'Vue.js', icon: CommandLineIcon },
  { name: 'TypeScript', icon: CodeBracketIcon },
  { name: 'Tailwind CSS', icon: CubeIcon },
  { name: 'Git', icon: RocketLaunchIcon }
]

const stats = [
  { key: 'projectsCompleted', value: '15+', icon: FolderIcon },
  { key: 'happyClients', value: '10+', icon: UserGroupIcon },
  { key: 'yearsExperience', value: '3+', icon: ClockIcon },
  { key: 'technologies', value: '10+', icon: CodeBracketIcon }
]

const localizedStats = computed(() => 
  stats.map(stat => ({
    ...stat,
    label: t(`home.stats.${stat.key}`)
  }))
)
</script>

<style scoped>
/* Base Styles */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
}

/* Grid Animation Background */
.grid-animation {
  position: absolute;
  inset: -100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* Glowing Orbs */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.glow-orb-1 {
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: rgba(59, 130, 246, 0.15);
  animation: float 8s ease-in-out infinite;
}

.glow-orb-2 {
  bottom: -150px;
  left: -100px;
  width: 500px;
  height: 500px;
  background: rgba(139, 92, 246, 0.15);
  animation: float 10s ease-in-out infinite reverse;
}

.glow-orb-3 {
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: rgba(236, 72, 153, 0.1);
  animation: float 12s ease-in-out infinite;
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(to right, #60A5FA, #A78BFA, #F472B6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient-shift 8s ease infinite;
  background-size: 200% auto;
  display: inline-block;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Tech Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.tech-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.1);
}

.tech-icon {
  color: #60A5FA;
  transition: all 0.3s ease;
}

.tech-name {
  color: #E5E7EB;
  font-medium: 500;
}

.tech-card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(96, 165, 250, 0.15), transparent 100px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tech-card:hover .tech-card-glow {
  opacity: 1;
}

/* CTA Buttons */
.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  overflow: hidden;
}

.cta-button.primary {
  background: linear-gradient(45deg, #3B82F6, #8B5CF6);
  color: white;
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.cta-button-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.15), transparent 100px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cta-button:hover .cta-button-glow {
  opacity: 1;
}

/* Profile Section */
.profile-container {
  flex-shrink: 0;
  width: 450px;
  height: 450px;
  position: relative;
}

.profile-frame {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.profile-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

.profile-image:hover {
  transform: scale(1.05);
}

/* Decorative Elements */
.decorative-circles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 100%;
  height: 100%;
  animation: rotate 20s linear infinite;
}

.circle-2 {
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  animation: rotate 15s linear infinite reverse;
}

.circle-3 {
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  animation: rotate 10s linear infinite;
}

/* Tech Particles */
.tech-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #60A5FA;
  border-radius: 50%;
  animation: particle-float 4s ease-in-out infinite;
}

.particle:nth-child(2n) {
  background: #8B5CF6;
  animation-delay: 1s;
}

.particle:nth-child(3n) {
  background: #EC4899;
  animation-delay: 2s;
}

/* Stats Grid */
.stats-grid {
  margin-top: 6rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.1);
}

.stat-icon {
  color: #60A5FA;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.stat-label {
  color: #9CA3AF;
  font-size: 0.875rem;
}

/* Pulse Animation */
.pulse-dot {
  position: relative;
  width: 8px;
  height: 8px;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #34D399;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.pulse-dot::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #34D399;
  border-radius: 50%;
  animation: pulse 2s ease-in-out 0.3s infinite;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 20px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes particle-float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .profile-container {
    width: 350px;
    height: 350px;
  }
}

@media (max-width: 768px) {
  .profile-container {
    width: 280px;
    height: 280px;
  }
}
</style>
