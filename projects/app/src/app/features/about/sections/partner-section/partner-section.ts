import { Component } from '@angular/core';

@Component({
  selector: 'app-partner-section',
  standalone: true,
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Institutional Partner</div>
        <h2 class="text-4xl md:text-5xl font-serif">Working with APRUPP</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div class="order-2 md:order-1">
          <h3 class="text-3xl font-serif mb-4">APRUPP</h3>
          <p class="text-lg text-primary font-semibold mb-6">
            Portuguese Association for Urban Rehabilitation and Heritage Protection
          </p>
          <p class="text-text-muted mb-8 leading-relaxed">
            Founded in 2012, APRUPP is a non-profit association dedicated to promoting urban rehabilitation
            as a key driver for safeguarding cultural identity, reducing social asymmetries, and encouraging
            citizen participation.
          </p>

          <div class="grid grid-cols-3 gap-6 mb-8 border-t border-border pt-8">
            <div>
              <p class="text-3xl font-serif font-bold text-text mb-1">2012</p>
              <p class="text-sm text-text-muted">Founded</p>
            </div>
            <div>
              <p class="text-3xl font-serif font-bold text-text mb-1">Porto</p>
              <p class="text-sm text-text-muted">Headquarters</p>
            </div>
            <div>
              <p class="text-3xl font-serif font-bold text-text mb-1">Global</p>
              <p class="text-sm text-text-muted">Reach</p>
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
          <h4 class="font-serif text-lg font-bold mb-3">Heritage Protection</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Safeguarding built heritage as cultural identity
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">Urban Rehabilitation</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Revitalizing historic urban centers
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">Civic Participation</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Encouraging collaborative initiatives
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <h4 class="font-serif text-lg font-bold mb-3">Knowledge & Innovation</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Bridging tradition with technology
          </p>
        </div>
      </div>
    </section>
  `
})
export class PartnerSectionComponent {}
