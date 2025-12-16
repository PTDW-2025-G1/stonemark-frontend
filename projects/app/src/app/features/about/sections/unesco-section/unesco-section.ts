import { Component } from '@angular/core';

@Component({
  selector: 'app-unesco-section',
  standalone: true,
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Global Initiative</div>
        <h2 class="text-4xl md:text-5xl font-serif">Partnering with UNESCO</h2>
        <p class="max-w-3xl mx-auto mt-4 text-text-muted">
          Stone Mark is being developed in collaboration with UNESCO to preserve and promote world heritage sites.
          With proven technology and a scalable architecture, we're preparing for international expansion.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="border-t border-primary pt-6">
          <div class="text-2xl mb-4 text-primary">
            <i class="bi bi-award"></i>
          </div>
          <h4 class="font-serif text-lg font-bold mb-3">UNESCO Partnership</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Official collaboration for heritage preservation
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <div class="text-2xl mb-4 text-primary">
            <i class="bi bi-globe2"></i>
          </div>
          <h4 class="font-serif text-lg font-bold mb-3">Global Expansion</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Deployment across multiple countries
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <div class="text-2xl mb-4 text-primary">
            <i class="bi bi-people"></i>
          </div>
          <h4 class="font-serif text-lg font-bold mb-3">Cultural Impact</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Empowering millions to connect with heritage
          </p>
        </div>
        <div class="border-t border-primary pt-6">
          <div class="text-2xl mb-4 text-primary">
            <i class="bi bi-graph-up"></i>
          </div>
          <h4 class="font-serif text-lg font-bold mb-3">Sustainable Growth</h4>
          <p class="text-text-muted text-sm leading-relaxed">
            Built for scale with proven architecture
          </p>
        </div>
      </div>
    </section>
  `
})
export class UnescoSectionComponent {}
