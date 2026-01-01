import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '@core/services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-flex items-center gap-1 p-1 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
      <button
        *ngFor="let lang of languages"
        (click)="changeLanguage(lang.code)"
        [class]="getButtonClasses(lang.code)"
        [attr.aria-label]="'Switch to ' + lang.name"
        class="group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ease-out">

        <!-- Flag -->
        <img [src]="'assets/' + lang.flag" [alt]="lang.name + ' flag'" class="w-5 h-4 object-cover rounded-sm" />

        <!-- Language Code -->
        <span class="text-xs font-semibold tracking-wide">
          {{ lang.code.toUpperCase() }}
        </span>

        <!-- Active indicator -->
        <span
          *ngIf="currentLang === lang.code"
          class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -z-10"></span>
      </button>
    </div>
  `,
  styles: []
})
export class LanguageSelectorComponent implements OnDestroy {
  private languageService = inject(LanguageService);
  private langChangeSubscription?: Subscription;

  languages = [
    {
      code: 'pt',
      name: 'Português',
      flag: 'flags/pt.svg'
    },
    {
      code: 'en',
      name: 'English',
      flag: 'flags/gb.svg'
    }
  ];

  currentLang: string = 'pt';

  constructor() {
    this.currentLang = this.languageService.getCurrentLanguage();

    this.langChangeSubscription = this.languageService.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

  changeLanguage(lang: string): void {
    this.languageService.changeLanguage(lang);
  }

  getButtonClasses(langCode: string): string {
    const baseClasses = 'cursor-pointer select-none';
    const isActive = this.currentLang === langCode;

    if (isActive) {
      return `${baseClasses} text-gray-900 bg-white shadow-md scale-105`;
    }

    return `${baseClasses} text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 hover:scale-102`;
  }
}

