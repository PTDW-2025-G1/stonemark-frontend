import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/ui/button/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-questions-about-cookies-section',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, TranslateModule],
  template: `
    <section class="bg-linear-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 lg:p-8 shadow-lg">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-text">
          {{ 'cookies_policy.questions.title' | translate }}
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        {{ 'cookies_policy.questions.desc' | translate }}
      </p>

      <div class="flex flex-wrap gap-4">
        <app-button
          [routerLink]="'/contact'"
          variant="primary"
          size="normal"
          [fullWidth]="false"
        >
          <i class="bi bi-chat-dots"></i>
          {{ 'cookies_policy.questions.contact_us' | translate }}
        </app-button>

        <app-button
          [routerLink]="'/privacy-policy'"
          variant="secondary"
          size="normal"
          [fullWidth]="false"
        >
          <i class="bi bi-shield-check"></i>
          {{ 'cookies_policy.questions.privacy_policy' | translate }}
        </app-button>
      </div>
    </section>
  `
})
export class QuestionsAboutCookiesSection {}
