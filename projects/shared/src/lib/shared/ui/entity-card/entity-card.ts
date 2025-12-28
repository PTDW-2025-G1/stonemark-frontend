import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-entity-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a
      [routerLink]="['/', type, id]"
      class="group relative aspect-square overflow-hidden border-2 border-border cursor-pointer
         transition-all duration-500 block"
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
              <i class="bi bi-calendar-event text-white text-xs"></i>
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
    </a>
  `,
  styles: []
})
export class EntityCardComponent {
  @Input() cover!: string;
  @Input() title?: string;
  @Input() subtitle!: string;
  @Input() id!: number;
  @Input() type: 'marks/occurrence' | 'monuments' = 'marks/occurrence';
  @Input() iconType: 'city' | 'time' = 'time';

  constructor(private router: Router) {}

  open(): void {
    this.router.navigate([`/${this.type}`, this.id]);
  }
}
