import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/ui/button/button';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  template: `
    <section class="py-24 px-6 bg-surface border-t border-border">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-serif mb-4">
          {{ 'contribute-cta-section.title' | translate }}
        </h2>
        <p class="text-text-muted mb-12 max-w-3xl mx-auto">
          {{ 'contribute-cta-section.desc' | translate }}
        </p>

        <div class="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <app-button
            variant="primary"
            size="normal"
            [routerLink]="'/submit'"
            class="min-w-[220px]"
          >
            {{ 'contribute-cta-section.submit' | translate }}
          </app-button>
          <app-button
            variant="secondary"
            size="normal"
            [routerLink]="'/search/monuments'"
            class="min-w-[220px]"
          >
            {{ 'contribute-cta-section.explore' | translate }}
          </app-button>
        </div>

        <p class="text-text-muted italic">
          {{ 'contribute-cta-section.footer' | translate }}
        </p>
      </div>
    </section>
  `,
  imports: [RouterLink, ButtonComponent, TranslateModule]
})
export class CallToActionComponent {}
