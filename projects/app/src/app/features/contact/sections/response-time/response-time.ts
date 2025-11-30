import { Component } from '@angular/core';

@Component({
  selector: 'app-response-time',
  standalone: true,
  template: `
    <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <i class="bi bi-clock text-primary text-xl"></i>
        </div>
        <div>
          <h4 class="font-semibold text-text mb-1">Response Time</h4>
          <p class="text-sm text-text-muted">We typically respond within 24-48 hours on business days.</p>
        </div>
      </div>
    </div>
  `
})
export class ResponseTimeComponent {}
