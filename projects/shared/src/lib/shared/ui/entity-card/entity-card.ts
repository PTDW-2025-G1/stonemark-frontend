import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entity-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="group relative aspect-square overflow-hidden border-2 border-border cursor-pointer
             transition-all duration-500"
      (click)="open()"
    >
      <!-- Image -->
      <img
        [src]="cover"
        [alt]="title || subtitle"
        class="w-full h-full object-cover transition-all duration-700"
      />

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent
                  opacity-60 group-hover:opacity-80 transition-opacity duration-300">
      </div>

      <!-- Content Overlay -->
      <div class="absolute inset-0 flex flex-col justify-end p-6">

        <!-- Subtitle (Monument or City) -->
        <div class="transform translate-y-0 transition-all duration-300">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xl
                      border border-white/20 rounded-full mb-3">
            @if (iconType === 'city') {
              <i class="bi bi-geo-alt-fill text-white text-xs"></i>
            } @else {
              <svg fill="#ffffff" height="12" width="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" stroke="#ffffff">
                <g><path d="M290.216,0h-84.432L0,123.472V160v8v32h16v216H0v32v8v40h496v-40v-8v-32h-16V200h16v-32v-8v-36.528L290.216,0z M16,168 h64v16H16V168z M144,200v216h-16v32H96v-32H80V200h16v-32h32v32H144z M288,200v216h-16v32h-48v-32h-16V200h16v-32h48v32H288z M416,200v216h-16v32h-32v-32h-16V200h16v-32h32v32H416z M352,184h-64v-16h64V184z M336,200v216h-32V200H336z M352,432v16h-64 v-16H352z M208,184h-64v-16h64V184z M192,200v216h-32V200H192z M208,432v16h-64v-16H208z M64,200v216H32V200H64z M16,432h64v16 H16V432z M480,480H16v-16h464V480z M480,448h-64v-16h64V448z M432,416V200h32v216H432z M480,184h-64v-16h64V184z M480,152H16 v-19.472L210.216,16h75.568L480,132.528V152z"></path><path d="M221.848,32L42.216,136h411.568L274.152,32H221.848z M101.784,120l124.36-72h43.704l124.36,72H101.784z"></path></g>
              </svg>
            }
            <p class="text-white text-xs font-medium tracking-wide truncate max-w-[200px]">
              {{ subtitle }}
            </p>
          </div>
        </div>

        <!-- Title (if exists) - Monuments -->
        @if (title) {
          <h3 class="text-white text-2xl font-serif font-bold leading-tight
                     transform transition-all duration-300 group-hover:translate-x-1">
            {{ title }}
          </h3>
        }

        <!-- Hover Arrow -->
        <div class="absolute bottom-6 right-6 w-10 h-10 bg-white rounded-full
                    flex items-center justify-center opacity-0 group-hover:opacity-100
                    transform translate-x-4 group-hover:translate-x-0
                    transition-all duration-300">
          <i class="bi bi-arrow-right text-primary text-lg"></i>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class EntityCardComponent {
  @Input() cover!: string;
  @Input() title?: string;
  @Input() subtitle!: string;
  @Input() id!: number;
  @Input() type: 'marks/occurrence' | 'monuments' = 'marks/occurrence';
  @Input() iconType: 'city' | 'monument' = 'monument';

  constructor(private router: Router) {}

  open(): void {
    this.router.navigate([`/${this.type}`, this.id]);
  }
}
