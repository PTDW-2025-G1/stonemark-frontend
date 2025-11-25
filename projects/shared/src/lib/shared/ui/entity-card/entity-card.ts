import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entity-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
         (click)="open()" style="cursor:pointer;">
      <img
        [src]="cover"
        [alt]="title"
        class="w-full h-56 object-cover"
      />
      <div class="p-4 bg-white">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-600">
          {{ subtitle }}
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class EntityCardComponent {
  @Input() cover!: string;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() id!: number;
  @Input() type: 'marks' | 'monuments' = 'marks'


  constructor(private router: Router) {}

  open() {
    this.router.navigate([`/${this.type}`, this.id]);
  }
}
