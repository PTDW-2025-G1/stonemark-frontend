import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-partner-section',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">{{ 'partner.institutional' | translate }}</div>
        <h2 class="text-4xl md:text-5xl font-serif">{{ 'partner.title' | translate }}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div class="order-2 md:order-1">
          <h3 class="text-3xl font-serif mb-4">{{ 'partner.aprupp' | translate }}</h3>
          <p class="text-lg text-primary font-semibold mb-6">
            {{ 'partner.subtitle' | translate }}
          </p>
          <p class="text-text-muted mb-8 leading-relaxed">
            {{ 'partner.desc' | translate }}
          </p>

          <div class="grid grid-cols-3 gap-6 mb-8 border-t border-border pt-8">
            <div>
              <p class="text-3xl font-serif font-bold text-text mb-1">2012</p>
              <p class="text-sm text-text-muted">{{ 'partner.founded' | translate }}</p>
            </div>
            <div>
              <p class="text-3xl font-serif font-bold text-text mb-1">Porto</p>
              <p class="text-sm text-text-muted">{{ 'partner.headquarters' | translate }}</p>
            </div>
            <div>
              <p class="text-3xl font-serif font-bold text-text mb-1">Global</p>
              <p class="text-sm text-text-muted">{{ 'partner.reach' | translate }}</p>
            </div>
          </div>
        </div>

        <div class="order-1 md:order-2 aspect-square bg-surface border border-border relative flex items-center justify-center p-12">
          <img
            src="assets/images/aprupp.png"
            alt="APRUPP logo"
            class="w-full h-full object-contain"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">{{ 'partner.heritage' | translate }}</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'partner.heritage_desc' | translate }}
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">{{ 'partner.urban' | translate }}</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'partner.urban_desc' | translate }}
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">{{ 'partner.civic' | translate }}</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'partner.civic_desc' | translate }}
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">{{ 'partner.knowledge' | translate }}</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'partner.knowledge_desc' | translate }}
          </p>
        </div>
      </div>
    </section>
  `
})
export class PartnerSectionComponent {}
