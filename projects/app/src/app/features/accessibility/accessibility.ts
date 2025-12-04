import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from '@core/services/cookie/cookie.service'; // AJUSTA O PATH

interface AccessibilitySetting {
  id: string;
  category: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: string;
}

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accessibility.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AccessibilityComponent implements OnInit {

  private readonly COOKIE_NAME = 'a11y_settings';

  settings: AccessibilitySetting[] = [
    // Visual Settings
    { id: 'darkMode', category: 'Visual', title: 'Dark Mode', description: 'Reduces eye strain in low-light environments', enabled: false, icon: 'bi-moon-stars' },
    { id: 'highContrast', category: 'Visual', title: 'High Contrast', description: 'Increases contrast between text and background', enabled: false, icon: 'bi-circle-half' },
    { id: 'largeText', category: 'Visual', title: 'Large Text', description: 'Increases font size across the site', enabled: false, icon: 'bi-type-h1' },
    { id: 'dyslexiaFont', category: 'Visual', title: 'Dyslexia-Friendly Font', description: 'Uses OpenDyslexic font for better readability', enabled: false, icon: 'bi-fonts' },
    { id: 'monochrome',  category: 'Visual',  title: 'Monochrome Mode',  description: 'Removes colors and forces grayscale view for improved contrast perception',  enabled: false,  icon: 'bi-eyedropper' },
    { id: 'textSpacing',  category: 'Visual',  title: 'Text Spacing',  description: 'Improves readability with increased spacing between lines of text',  enabled: false,  icon: 'bi-text-paragraph'},

    // Motion Settings
    { id: 'reduceMotion', category: 'Motion', title: 'Reduce Motion', description: 'Minimizes animations and transitions', enabled: false, icon: 'bi-pause-circle' },
    { id: 'noAutoplay', category: 'Motion', title: 'Disable Autoplay', description: 'Prevents videos and carousels from playing automatically', enabled: false, icon: 'bi-stop-circle' },

    // Content Settings
    { id: 'simplifiedLayout', category: 'Content', title: 'Simplified Layout', description: 'Removes non-essential elements for cleaner interface', enabled: false, icon: 'bi-layout-text-sidebar' },
    { id: 'readingGuide', category: 'Content', title: 'Reading Guide', description: 'Highlights the line you\'re reading', enabled: false, icon: 'bi-text-center' }
  ];

  constructor(private titleService: Title, private cookies: CookieService) {}

  ngOnInit(): void {
    this.titleService.setTitle('Accessibility Settings - StoneMark');
    this.loadSettingsFromCookies();
    this.applySettings();
  }

  get categorizedSettings() {
    const categories = ['Visual', 'Motion', 'Content'];
    return categories.map(category => ({
      name: category,
      settings: this.settings.filter(s => s.category === category)
    }));
  }

  toggleSetting(setting: AccessibilitySetting): void {
    setting.enabled = !setting.enabled;
    this.saveSettingsToCookies();
    this.applySetting(setting);
  }

  resetSettings(): void {
    if (confirm('Are you sure you want to reset all accessibility settings?')) {
      this.settings.forEach(s => s.enabled = false);
      this.saveSettingsToCookies();
      this.applySettings();
    }
  }

  // ============================================
  // COOKIE HANDLING
  // ============================================

  private saveSettingsToCookies(): void {
    const settingsState = this.settings.reduce((acc, setting) => {
      acc[setting.id] = setting.enabled;
      return acc;
    }, {} as Record<string, boolean>);

    this.cookies.set(this.COOKIE_NAME, JSON.stringify(settingsState), 365);
  }

  private loadSettingsFromCookies(): void {
    const saved = this.cookies.get(this.COOKIE_NAME);
    if (saved) {
      const settingsState = JSON.parse(saved);
      this.settings.forEach(setting => {
        if (settingsState[setting.id] !== undefined) {
          setting.enabled = settingsState[setting.id];
        }
      });
    }
  }

  // ============================================
  // DOM CLASS APPLIERS
  // ============================================

  private applySettings(): void {
    this.settings.forEach(setting => this.applySetting(setting));
  }

  private applySetting(setting: AccessibilitySetting): void {
    const body = document.body;
    body.classList.toggle(setting.id.replace(/([A-Z])/g, '-$1').toLowerCase(), setting.enabled);
  }
}
