import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entity-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        [src]="image"
        [alt]="title"
        class="w-full h-56 object-cover"
      />
      <div class="p-4 bg-white">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-600">
          {{ location }}
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class EntityCardComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Input() location!: string;
}
