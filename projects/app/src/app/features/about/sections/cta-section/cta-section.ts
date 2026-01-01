import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/ui/button/button';
import {RouterLink} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [ButtonComponent, RouterLink, TranslateModule],
  template: `
    <section class="py-24 px-6 bg-surface border-t border-border">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-serif mb-4">
          {{ 'cta.title' | translate }}
        </h2>
        <p class="text-text-muted mb-12 max-w-3xl mx-auto">
          {{ 'cta.desc' | translate }}
        </p>

        <div class="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <app-button
            variant="primary"
            size="normal"
            [routerLink]="'/search/monuments'"
          >
            {{ 'cta.explore' | translate }}
          </app-button>
          <app-button
            variant="secondary"
            size="normal"
            [routerLink]="'/contact'"
          >
            {{ 'cta.contact' | translate }}
          </app-button>
        </div>

        <p class="text-text-muted italic">
          {{ 'cta.footer' | translate }}
        </p>
      </div>
    </section>
  `
})
export class CtaSectionComponent {}
