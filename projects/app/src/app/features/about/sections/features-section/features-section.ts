import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">{{ 'features.label' | translate }}</div>
        <h2 class="text-4xl md:text-5xl font-serif">{{ 'features.title' | translate }}</h2>
        <p class="max-w-3xl mx-auto mt-4 text-text-muted">
          {{ 'features.desc' | translate }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">01</div>
          <h3 class="text-2xl font-serif mb-3">{{ 'features.1.title' | translate }}</h3>
          <p class="text-text-muted leading-relaxed">
            {{ 'features.1.desc' | translate }}
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">02</div>
          <h3 class="text-2xl font-serif mb-3">{{ 'features.2.title' | translate }}</h3>
          <p class="text-text-muted leading-relaxed">
            {{ 'features.2.desc' | translate }}
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">03</div>
          <h3 class="text-2xl font-serif mb-3">{{ 'features.3.title' | translate }}</h3>
          <p class="text-text-muted leading-relaxed">
            {{ 'features.3.desc' | translate }}
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">04</div>
          <h3 class="text-2xl font-serif mb-3">{{ 'features.4.title' | translate }}</h3>
          <p class="text-text-muted leading-relaxed">
            {{ 'features.4.desc' | translate }}
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">05</div>
          <h3 class="text-2xl font-serif mb-3">{{ 'features.5.title' | translate }}</h3>
          <p class="text-text-muted leading-relaxed">
            {{ 'features.5.desc' | translate }}
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">06</div>
          <h3 class="text-2xl font-serif mb-3">{{ 'features.6.title' | translate }}</h3>
          <p class="text-text-muted leading-relaxed">
            {{ 'features.6.desc' | translate }}
          </p>
        </div>
      </div>
    </section>
  `
})
export class FeaturesSectionComponent {}
