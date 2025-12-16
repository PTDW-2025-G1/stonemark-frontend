import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

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
          <a
            routerLink="/submit"
            class="px-8 py-4 text-sm font-bold tracking-wide border border-primary bg-primary text-primary-foreground rounded-lg hover:bg-surface hover:text-primary hover:border-primary transition-colors duration-200 ease-soft shadow-sm"
          >
            Submit Your First Mark
          </a>
          <a
            href="/search/monuments"
            class="px-8 py-4 text-sm font-bold tracking-wide border border-border bg-surface text-text rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 ease-soft shadow-sm"
          >
            Explore Database
          </a>
        </div>

        <p class="text-text-muted italic">
          Secure • Private • Free Forever
        </p>
      </div>
    </section>
  `,
  imports: [
    RouterLink
  ]
})
export class CallToActionComponent {}
