import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink],
  template: `
    <section
      class="min-h-[85vh] flex flex-col items-center justify-center text-center text-text px-4 sm:px-6 lg:px-8 py-16">
      <div class="max-w-5xl mx-auto w-full">
        <!-- Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 leading-tight">
          Discover the Story<br class="hidden sm:block">
          Behind Every <span class="text-info">Stone</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg sm:text-xl lg:text-2xl text-text-muted mb-12 sm:mb-16 max-w-2xl mx-auto">
          Preserving the Legacy Carved in Stone
        </p>

        <!-- Navigation Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <!-- Monuments Card -->
          <a routerLink="/monuments"
             class="group relative bg-surface border-2 border-border rounded-2xl p-8 sm:p-10 hover:border-primary hover:shadow-lg transition-all duration-300 ease-soft">
            <div class="flex flex-col items-center gap-4">
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-[--ease-soft]">
                <svg height="200px" width="200px" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> <g> <g> <g> <path
                    d="M290.216,0h-84.432L0,123.472V160v8v32h16v216H0v32v8v40h496v-40v-8v-32h-16V200h16v-32v-8v-36.528L290.216,0z M16,168 h64v16H16V168z M144,200v216h-16v32H96v-32H80V200h16v-32h32v32H144z M288,200v216h-16v32h-48v-32h-16V200h16v-32h48v32H288z M416,200v216h-16v32h-32v-32h-16V200h16v-32h32v32H416z M352,184h-64v-16h64V184z M336,200v216h-32V200H336z M352,432v16h-64 v-16H352z M208,184h-64v-16h64V184z M192,200v216h-32V200H192z M208,432v16h-64v-16H208z M64,200v216H32V200H64z M16,432h64v16 H16V432z M480,480H16v-16h464V480z M480,448h-64v-16h64V448z M432,416V200h32v216H432z M480,184h-64v-16h64V184z M480,152H16 v-19.472L210.216,16h75.568L480,132.528V152z"></path>
                    <path
                      d="M221.848,32L42.216,136h411.568L274.152,32H221.848z M101.784,120l124.36-72h43.704l124.36,72H101.784z"></path> </g> </g> </g> </g></svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif font-semibold">Monuments</h3>
            </div>
          </a>

          <!-- Guilds Card -->
          <a routerLink=""
             class="group relative bg-surface border-2 border-border rounded-2xl p-8 sm:p-10 hover:border-primary hover:shadow-lg transition-all duration-300 ease-soft">
            <div class="flex flex-col items-center gap-4">
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-[--ease-soft]">
                <i class="bi bi-camera text-5xl sm:text-6xl"></i>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif font-semibold">Capture Mark</h3>
            </div>
          </a>

          <!-- Marks Card -->
          <a routerLink="/marks"
             class="group relative bg-surface border-2 border-border rounded-2xl p-8 sm:p-10 hover:border-primary hover:shadow-lg transition-all duration-300 ease-soft">
            <div class="flex flex-col items-center gap-4">
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-[--ease-soft]">
                <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round"
                     stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 101 101" id="bricklaying">
                  <path
                    d="M49.135,60.709c0,-2.165 -1.755,-3.92 -3.92,-3.92l-39.795,0c-2.165,0 -3.92,1.755 -3.92,3.92l0,19.7c0,2.165 1.755,3.92 3.92,3.92l39.795,0c2.165,0 3.92,-1.755 3.92,-3.92l0,-19.7Zm50.365,0c0,-2.165 -1.755,-3.92 -3.92,-3.92l-39.795,0c-2.165,0 -3.92,1.755 -3.92,3.92l0,19.7c0,2.165 1.755,3.92 3.92,3.92l39.795,0c2.165,0 3.92,-1.755 3.92,-3.92l0,-19.7Zm-54.285,0l-39.795,0l0,19.7l39.795,0l0,-19.7Zm50.365,0l-39.795,0l0,19.7l39.795,0l0,-19.7Zm-79.731,3.772c-3.354,0 -6.078,2.723 -6.078,6.078c0,3.354 2.724,6.078 6.078,6.078c3.354,0 6.078,-2.724 6.078,-6.078c0,-3.355 -2.724,-6.078 -6.078,-6.078Zm18.937,0c-3.354,0 -6.078,2.723 -6.078,6.078c0,3.354 2.724,6.078 6.078,6.078c3.355,0 6.078,-2.724 6.078,-6.078c0,-3.355 -2.723,-6.078 -6.078,-6.078Zm31.428,0c-3.354,0 -6.078,2.723 -6.078,6.078c0,3.354 2.724,6.078 6.078,6.078c3.354,0 6.078,-2.724 6.078,-6.078c0,-3.355 -2.724,-6.078 -6.078,-6.078Zm18.937,0c-3.354,0 -6.078,2.723 -6.078,6.078c0,3.354 2.724,6.078 6.078,6.078c3.355,0 6.078,-2.724 6.078,-6.078c0,-3.355 -2.723,-6.078 -6.078,-6.078Zm-69.302,3.92c1.191,0 2.158,0.967 2.158,2.158c0,1.191 -0.967,2.158 -2.158,2.158c-1.191,0 -2.158,-0.967 -2.158,-2.158c0,-1.191 0.967,-2.158 2.158,-2.158Zm18.937,0c1.191,0 2.158,0.967 2.158,2.158c0,1.191 -0.967,2.158 -2.158,2.158c-1.191,0 -2.158,-0.967 -2.158,-2.158c0,-1.191 0.967,-2.158 2.158,-2.158Zm31.428,0c1.191,0 2.158,0.967 2.158,2.158c0,1.191 -0.967,2.158 -2.158,2.158c-1.191,0 -2.158,-0.967 -2.158,-2.158c0,-1.191 0.967,-2.158 2.158,-2.158Zm18.937,0c1.191,0 2.158,0.967 2.158,2.158c0,1.191 -0.967,2.158 -2.158,2.158c-1.191,0 -2.158,-0.967 -2.158,-2.158c0,-1.191 0.967,-2.158 2.158,-2.158Zm-42.298,-41.084l-4.493,2.011l-1.723,-3.849c-0.784,-1.752 -2.355,-3.124 -4.499,-3.651c-1.663,-0.409 -3.581,-0.248 -5.325,0.532c-0.693,0.31 -1.995,1.213 -3.575,2.638c-2.76,2.489 -6.894,6.783 -10.35,10.729c-2.378,2.714 -4.436,5.274 -5.571,7.004c-0.792,1.206 -1.22,2.208 -1.373,2.838c-0.718,2.952 0.503,5.698 3.171,7.142c0.573,0.31 1.607,0.665 3.036,0.887c2.052,0.318 5.342,0.505 8.96,0.557c5.26,0.075 11.233,-0.121 14.936,-0.507c2.126,-0.222 3.674,-0.591 4.367,-0.902c1.744,-0.78 3.142,-2.103 3.945,-3.616c1.034,-1.95 1.058,-4.036 0.274,-5.788l-1.723,-3.849l4.493,-2.011c1.113,0.923 2.698,1.193 4.107,0.562l15.339,-6.866c1.976,-0.884 2.861,-3.203 1.976,-5.179l-3.137,-7.009c-0.885,-1.976 -3.203,-2.861 -5.179,-1.976l-15.339,6.865c-1.409,0.631 -2.264,1.992 -2.317,3.438Zm6.503,26.076l29.4,0c1.082,0 1.96,-0.878 1.96,-1.96c0,-1.081 -0.878,-1.96 -1.96,-1.96l-29.4,0c-1.082,0 -1.96,0.879 -1.96,1.96c0,1.082 0.878,1.96 1.96,1.96Zm-14.574,-22.463l-1.723,-3.849c-0.318,-0.712 -0.987,-1.232 -1.858,-1.447c-0.871,-0.214 -1.873,-0.105 -2.786,0.304c-2.793,1.25 -17.925,17.527 -18.662,20.557c-0.278,1.144 0.194,2.209 1.228,2.769c2.76,1.494 25.044,1.152 27.832,-0.095c0.913,-0.409 1.662,-1.084 2.083,-1.876c0.42,-0.793 0.478,-1.638 0.159,-2.35l-1.723,-3.849l-3.882,1.738c-1.976,0.885 -4.295,0 -5.179,-1.976l-1.347,-3.009c-0.885,-1.976 0,-4.295 1.976,-5.18l3.882,-1.737Zm9.307,0.129l-11.587,5.186l1.346,3.009l11.588,-5.186l-1.347,-3.009Zm21.158,-3.459l-3.137,-7.008l-15.338,6.865l3.137,7.009l15.338,-6.866Z"></path>
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif font-semibold">Marks</h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent {}
