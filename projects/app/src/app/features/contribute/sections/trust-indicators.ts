import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-indicators',
  standalone: true,
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">GDPR Compliant</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Your data is protected with industry-leading security standards
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">Community Driven</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Join a global network of heritage enthusiasts and historians
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">AI-Powered</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Automatic analysis with human moderation for accuracy
          </p>
        </div>
      </div>
    </section>
  `,
})
export class TrustIndicatorsComponent {}
