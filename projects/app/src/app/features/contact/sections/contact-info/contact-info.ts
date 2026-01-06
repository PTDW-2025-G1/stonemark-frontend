import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <!-- Quick Contact -->
    <div class="bg-gradient-to-br from-surface-alt to-surface rounded-2xl border border-border p-6 shadow-sm">
      <h3 class="text-xl font-serif font-semibold text-text mb-6 flex items-center gap-2">
        <i class="bi bi-info-circle text-primary"></i>
        {{ 'contact.info.title' | translate }}
      </h3>

      <div class="space-y-4">
        <a href="mailto:contact@stonemark.org" class="flex items-start gap-4 p-3 rounded-xl hover:bg-surface transition-colors group">
          <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <i class="bi bi-envelope-fill text-primary"></i>
          </div>
          <div>
            <p class="text-sm font-semibold text-text-muted mb-1">{{ 'contact.info.email.title' | translate }}</p>
            <p class="text-sm text-text">{{ 'contact.info.email.value' | translate }}</p>
          </div>
        </a>

        <div class="flex items-start gap-4 p-3">
          <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="bi bi-geo-alt-fill text-primary"></i>
          </div>
          <div>
            <p class="text-sm font-semibold text-text-muted mb-1">{{ 'contact.info.location.title' | translate }}</p>
            <p class="text-sm text-text">{{ 'contact.info.location.value' | translate }}</p>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ContactInfoComponent {}
