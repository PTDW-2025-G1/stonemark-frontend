import { bootstrapApplication } from '@angular/platform-browser';
import { runInInjectionContext, inject } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AccessibilityService } from '@core/services/accessibility/accessibility.service';

bootstrapApplication(App, appConfig).then(appRef => {
  runInInjectionContext(appRef.injector, () => {
    const a11y = inject(AccessibilityService);
    a11y.applySavedSettings();
  });
});
