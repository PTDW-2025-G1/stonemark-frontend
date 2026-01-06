import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-response-time',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <i class="bi bi-clock text-primary text-xl"></i>
        </div>
        <div>
          <h4 class="font-semibold text-text mb-1">{{ 'contact.info.response.title' | translate }}</h4>
          <p class="text-sm text-text-muted">{{ 'contact.info.response.detail' | translate }}</p>
        </div>
      </div>
    </div>
  `
})
export class ResponseTimeComponent {}
