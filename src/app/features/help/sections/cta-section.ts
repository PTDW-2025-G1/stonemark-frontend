import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-call-to-action',
  template: `
    <div class="text-center py-24 px-6 relative overflow-hidden">
      <div class="absolute inset-0"></div>
      <div class="relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to Make History?</h2>
        <p class="text-xl text-text-muted mb-10 max-w-3xl mx-auto leading-relaxed">
          Join our growing community of explorers, historians, and heritage enthusiasts.
          Every contribution helps preserve stories carved in stone for future generations.
        </p>
        <a
          routerLink="/submit"
          class="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <i class="bi bi-camera-fill text-2xl"></i>
          Submit Your First Mark
          <i class="bi bi-arrow-right text-xl"></i>
        </a>
        <p class="mt-6 text-sm text-text-muted">
          <i class="bi bi-shield-check"></i> Secure • Private • Free Forever
        </p>
      </div>
    </div>
  `,
  imports: [
    RouterLink
  ]
})
export class CallToActionComponent {}
