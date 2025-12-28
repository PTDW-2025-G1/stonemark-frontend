import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-section',
  standalone: true,
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Privacy & Security</div>
        <h2 class="text-4xl md:text-5xl font-serif">Your Privacy Matters</h2>
        <p class="max-w-3xl mx-auto mt-4 text-text-muted">
          Fully GDPR compliant — your data is secure and always under your control
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- What We Store -->
        <div class="mb-24">
          <h3 class="text-3xl font-serif mb-8 text-center">What We Store</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">Photo Metadata</h4>
              <p class="text-text-muted text-sm">Photo file with basic metadata (GPS, timestamp)</p>
            </div>
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">User Attribution</h4>
              <p class="text-text-muted text-sm">User ID for proper authorship attribution</p>
            </div>
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">Submission History</h4>
              <p class="text-text-muted text-sm">Submission status and review history</p>
            </div>
          </div>
        </div>

        <!-- Your Rights -->
        <div class="mb-24">
          <h3 class="text-3xl font-serif mb-8 text-center">Your Rights</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">Full Control</h4>
              <p class="text-text-muted text-sm">Edit or delete your submissions anytime</p>
            </div>
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">Data Removal</h4>
              <p class="text-text-muted text-sm">Request complete data removal instantly</p>
            </div>
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">No Sharing</h4>
              <p class="text-text-muted text-sm">No personal data shared without consent</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-3xl font-serif mb-4">A Promise of Trust</h3>
          <div class="bg-surface-alt border border-border p-8 text-center max-w-3xl mx-auto rounded-lg">
            <p class="text-text-muted leading-relaxed mb-4">
              We never sell your data. Ever. Your privacy is not a commodity — it's a fundamental right that we respect and protect.
            </p>
            <p class="text-text-muted leading-relaxed">
              Read our full
              <a href="/privacy-policy" class="text-primary font-semibold border-b border-primary hover:opacity-70 transition-opacity">Privacy Policy</a>
              to learn more about how we safeguard your information.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PrivacySectionComponent {}
