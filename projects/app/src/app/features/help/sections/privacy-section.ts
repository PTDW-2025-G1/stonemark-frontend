import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-section',
  template: `
    <div class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Your Privacy Matters</h2>
          <p class="text-xl text-text-muted">
            Fully GDPR compliant — your data is secure and always under your control
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- What We Store -->
          <div class="bg-surface p-8 rounded-2xl border-2 border-success/20 shadow-lg hover:shadow-xl transition-shadow">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="bi bi-database-lock text-3xl text-success"></i>
              </div>
              <h3 class="text-2xl font-semibold">What We Store</h3>
            </div>
            <ul class="space-y-4 text-text-muted">
              <li class="flex items-start gap-3">
                <i class="bi bi-check-circle-fill text-success text-xl flex-shrink-0 mt-0.5"></i>
                <span>Photo file with basic metadata (GPS, timestamp)</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="bi bi-check-circle-fill text-success text-xl flex-shrink-0 mt-0.5"></i>
                <span>User ID for proper authorship attribution</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="bi bi-check-circle-fill text-success text-xl flex-shrink-0 mt-0.5"></i>
                <span>Submission status and review history</span>
              </li>
            </ul>
          </div>

          <!-- Your Rights -->
          <div class="bg-surface p-8 rounded-2xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="bi bi-person-check-fill text-3xl text-primary"></i>
              </div>
              <h3 class="text-2xl font-semibold">Your Rights</h3>
            </div>
            <ul class="space-y-4 text-text-muted">
              <li class="flex items-start gap-3">
                <i class="bi bi-check-circle-fill text-primary text-xl flex-shrink-0 mt-0.5"></i>
                <span>Edit or delete your submissions anytime</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="bi bi-check-circle-fill text-primary text-xl flex-shrink-0 mt-0.5"></i>
                <span>Request complete data removal instantly</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="bi bi-check-circle-fill text-primary text-xl flex-shrink-0 mt-0.5"></i>
                <span>No personal data shared without consent</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Additional Privacy Info -->
        <div class="mt-12 text-center p-6 bg-surface rounded-2xl border border-text-muted/10">
          <div class="flex items-center justify-center gap-3 text-text-muted">
            <i class="bi bi-shield-fill-check text-2xl text-success"></i>
            <p class="text-lg">
              We never sell your data. Ever. Read our full
              <a href="/privacy" class="text-primary font-semibold hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PrivacySectionComponent {}
