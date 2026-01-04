import { Component } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-trust-indicators',
  standalone: true,
  template: `
    <section class="py-16 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">
            {{ 'contribute-trust-indicators.gdpr_title' | translate }}
          </h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'contribute-trust-indicators.gdpr_desc' | translate }}
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">
            {{ 'contribute-trust-indicators.community_title' | translate }}
          </h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'contribute-trust-indicators.community_desc' | translate }}
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">
            {{ 'contribute-trust-indicators.ai_title' | translate }}
          </h4>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'contribute-trust-indicators.ai_desc' | translate }}
          </p>
        </div>
      </div>
    </section>
  `,
  imports: [TranslateModule]
})
export class TrustIndicatorsComponent {}
