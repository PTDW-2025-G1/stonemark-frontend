import { Component } from '@angular/core';

@Component({
  selector: 'app-partner-section',
  standalone: true,
  template: `
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <i class="bi bi-building text-primary"></i>
            <span class="text-sm font-semibold text-primary uppercase tracking-wider">Partner</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text mb-4">
            Institutional Partner
          </h2>
        </div>

        <div class="bg-gradient-to-br from-surface-alt to-surface rounded-3xl border border-border overflow-hidden shadow-xl">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">

            <!-- Conteúdo Esquerdo -->
            <div class="lg:col-span-3 p-8 sm:p-12 lg:p-16">
              <h3 class="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-text mb-4">
                APRUPP
              </h3>
              <p class="text-lg sm:text-xl text-primary font-semibold mb-6">
                Portuguese Association for Urban Rehabilitation and Heritage Protection
              </p>
              <p class="text-base sm:text-lg text-text-muted leading-relaxed mb-8">
                Founded in 2012, APRUPP is a non-profit association dedicated to promoting urban rehabilitation
                as a key driver for safeguarding cultural identity, reducing social asymmetries, and encouraging
                citizen participation.
              </p>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
                <div>
                  <p class="text-3xl font-bold text-primary mb-1">2012</p>
                  <p class="text-sm text-text-muted">Founded</p>
                </div>
                <div>
                  <p class="text-3xl font-bold text-primary mb-1">Porto</p>
                  <p class="text-sm text-text-muted">Headquarters</p>
                </div>
                <div>
                  <p class="text-3xl font-bold text-primary mb-1">Global</p>
                  <p class="text-sm text-text-muted">Reach</p>
                </div>
              </div>

              <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all duration-300 font-medium group">
                Learn More About APRUPP
                <i class="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>

            <!-- Pilares à Direita -->
            <div class="lg:col-span-2 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-12">
              <div class="space-y-6">
                <div class="flex gap-4">
                  <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="bi bi-shield-check text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-text mb-1">Heritage Protection</h4>
                    <p class="text-sm text-text-muted">Safeguarding built heritage as cultural identity</p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="bi bi-buildings text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-text mb-1">Urban Rehabilitation</h4>
                    <p class="text-sm text-text-muted">Revitalizing historic urban centers</p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="bi bi-people text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-text mb-1">Civic Participation</h4>
                    <p class="text-sm text-text-muted">Encouraging collaborative initiatives</p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="bi bi-lightbulb text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-text mb-1">Knowledge & Innovation</h4>
                    <p class="text-sm text-text-muted">Bridging tradition with technology</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Banner Inferior -->
          <div class="bg-primary text-primary-foreground px-8 sm:px-12 lg:px-16 py-6">
            <p class="text-center text-sm sm:text-base font-medium">
              <i class="bi bi-heart-fill text-red-400 mr-2"></i>
              Together for Urban and Cultural Heritage
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PartnerSectionComponent {}
