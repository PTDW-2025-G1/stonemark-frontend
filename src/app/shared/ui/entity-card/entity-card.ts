import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entity-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      <div class="aspect-[4/3] overflow-hidden">
        <img
          [src]="image"
          [alt]="title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div class="p-5">
        <h3 class="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {{ title }}
        </h3>

        <div class="flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="line-clamp-1">{{ location }}</span>
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class EntityCardComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Input() location!: string;
}
