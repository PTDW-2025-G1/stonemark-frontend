import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-indicators',
  template: `
    <div class="max-w-6xl mx-auto py-16 px-6">
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div class="bg-green-50 p-6 rounded-3xl hover:shadow-lg transition-shadow">
          <i class="bi bi-shield-check text-5xl text-success mb-4"></i>
          <h3 class="text-2xl font-semibold mb-2">GDPR Compliant</h3>
          <p class="text-text-muted">Your data is protected with industry-leading security standards</p>
        </div>
        <div class="bg-blue-50 p-6 rounded-3xl hover:shadow-lg transition-shadow">
          <i class="bi bi-people-fill text-5xl text-info mb-4"></i>
          <h3 class="text-2xl font-semibold mb-2">Community Driven</h3>
          <p class="text-text-muted">Join a global network of heritage enthusiasts and historians</p>
        </div>
        <div class="bg-yellow-50 p-6 rounded-3xl hover:shadow-lg transition-shadow">
          <i class="bi bi-cpu text-5xl text-warning mb-4"></i>
          <h3 class="text-2xl font-semibold mb-2">AI-Powered</h3>
          <p class="text-text-muted">Automatic analysis with human moderation for accuracy</p>
        </div>
      </div>
    </div>
  `,
})
export class TrustIndicatorsComponent {}
