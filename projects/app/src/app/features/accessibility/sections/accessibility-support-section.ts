import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-accessibility-support-section',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="mt-16 bg-info/10 border-2 border-info rounded-2xl p-8">
      <div class="flex flex-col sm:flex-row items-start gap-6">
        <div class="shrink-0">
          <div class="w-12 h-12 bg-info rounded-xl flex items-center justify-center">
            <i class="bi bi-info-circle text-2xl text-primary-foreground"></i>
          </div>
        </div>
        <div class="flex-1">
          <h3 class="font-sans font-semibold text-text text-xl mb-3">
            {{ 'accessibility.support.title' | translate }}
          </h3>
          <p class="text-text-muted leading-relaxed mb-4 font-sans">
            {{ 'accessibility.support.desc' | translate }}
          </p>
          <a
            routerLink="/contact"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-text transition-colors duration-300 group"
          >
            <span>{{ 'accessibility.support.contact' | translate }}</span>
            <i class="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
          </a>
        </div>
      </div>
    </div>
  `
})
export class AccessibilitySupportSectionComponent {}

