import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  template: `
    <section class="py-24 px-6 bg-surface border-t border-border">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-serif mb-4">
          Ready to Make History?
        </h2>
        <p class="text-text-muted mb-12 max-w-3xl mx-auto">
          Join our growing community of explorers, historians, and heritage enthusiasts.
          Every contribution helps preserve stories carved in stone for future generations.
        </p>

        <div class="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <app-button
            variant="primary"
            size="normal"
            [routerLink]="'/submit'"
            class="min-w-[220px]"
          >
            Submit Your First Mark
          </app-button>
          <app-button
            variant="secondary"
            size="normal"
            [routerLink]="'/search/monuments'"
            class="min-w-[220px]"
          >
            Explore Database
          </app-button>
        </div>


        <p class="text-text-muted italic">
          Secure • Private • Free Forever
        </p>
      </div>
    </section>
  `,
  imports: [
    RouterLink,
    ButtonComponent
  ]
})
export class CallToActionComponent {}
