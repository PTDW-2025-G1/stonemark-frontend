import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AccessibilityService } from './accessibility.service';
import { CookieService } from '@core/services/cookie/cookie.service';

describe('AccessibilityService', () => {
  let service: AccessibilityService;
  let cookieMock: CookieService;

  beforeEach(() => {
    cookieMock = {
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        AccessibilityService,
        { provide: CookieService, useValue: cookieMock }
      ]
    });

    service = TestBed.inject(AccessibilityService);

    document.body.className = '';
  });

  it('should do nothing when no cookie is saved', () => {
    (cookieMock.get as any).mockReturnValue(null);

    service.applySavedSettings();

    expect(document.body.className).toBe('');
  });

  it('should ignore invalid JSON in cookie', () => {
    (cookieMock.get as any).mockReturnValue('BAD_JSON');

    service.applySavedSettings();

    expect(document.body.className).toBe('');
  });

  it('should apply classes mapped from settings', () => {
    const mockSettings = JSON.stringify({
      highContrast: true,
      largeText: false,
      dyslexiaMode: true
    });

    (cookieMock.get as any).mockReturnValue(mockSettings);

    service.applySavedSettings();

    expect(document.body.classList.contains('high-contrast')).toBe(true);
    expect(document.body.classList.contains('large-text')).toBe(false);
    expect(document.body.classList.contains('dyslexia-mode')).toBe(true);
  });

  it('should convert camelCase IDs to kebab-case CSS classes', () => {
    (cookieMock.get as any).mockReturnValue(
      JSON.stringify({ reduceMotionSetting: true })
    );

    service.applySavedSettings();

    expect(document.body.classList.contains('reduce-motion-setting')).toBe(true);
  });
});
