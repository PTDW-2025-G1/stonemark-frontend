import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-unesco-section',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">{{ 'unesco.label' | translate }}</div>
        <h2 class="text-4xl md:text-5xl font-serif">{{ 'unesco.title' | translate }}</h2>
        <p class="max-w-3xl mx-auto mt-4 text-text-muted">
          {{ 'unesco.desc' | translate }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="border-t border-primary pt-6">
          <div class="text-2xl mb-4 text-primary">
            <i class="bi bi-award"></i>
          </div>
          <h4 class="font-serif text-lg font-bold mb-3">{{ 'unesco.partnership' | translate }}</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'unesco.partnership_desc' | translate }}
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <div class="text-2xl mb-4 text-primary">
            <i class="bi bi-globe2"></i>
          </div>
          <h4 class="font-serif text-lg font-bold mb-3">{{ 'unesco.expansion' | translate }}</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'unesco.expansion_desc' | translate }}
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <div class="text-2xl mb-4 text-primary">
            <i class="bi bi-people"></i>
          </div>
          <h4 class="font-serif text-lg font-bold mb-3">{{ 'unesco.impact' | translate }}</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'unesco.impact_desc' | translate }}
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <div class="text-2xl mb-4 text-primary">
            <i class="bi bi-graph-up"></i>
          </div>
          <h4 class="font-serif text-lg font-bold mb-3">{{ 'unesco.growth' | translate }}</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'unesco.growth_desc' | translate }}
          </p>
        </div>
      </div>
    </section>
  `
})
export class UnescoSectionComponent {}
