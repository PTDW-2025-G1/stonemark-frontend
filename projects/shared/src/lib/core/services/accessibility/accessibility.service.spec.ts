import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AccessibilityService } from './accessibility.service';
import { CookieService } from '@core/services/cookie/cookie.service';
import { CookieConsentService } from '@core/services/cookie-consent/cookie-consent.service';

describe('AccessibilityService', () => {
  let service: AccessibilityService;
  let cookieMock: CookieService;
  let cookieConsentMock: any;

  beforeEach(() => {
    cookieMock = {
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn()
    } as any;

    cookieConsentMock = {
      isAllowed: vi.fn().mockReturnValue(true),
      hasConsent: vi.fn().mockReturnValue(true),
      consentStatus: vi.fn().mockReturnValue('accepted'),
      preferences: vi.fn().mockReturnValue({
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true
      })
    };

    TestBed.configureTestingModule({
      providers: [
        AccessibilityService,
        { provide: CookieService, useValue: cookieMock },
        { provide: CookieConsentService, useValue: cookieConsentMock }
      ]
    });

    service = TestBed.inject(AccessibilityService);

    document.body.className = '';
  });

  it('should do nothing when no cookie is saved', () => {
    (cookieMock.get as any).mockReturnValue(null);
    cookieConsentMock.isAllowed.mockReturnValue(true);

    service.applySavedSettings();

    expect(document.body.className).toBe('');
  });

  it('should do nothing when preferences cookies are not allowed', () => {
    const mockSettings = JSON.stringify({
      highContrast: true
    });
    (cookieMock.get as any).mockReturnValue(mockSettings);
    cookieConsentMock.isAllowed.mockReturnValue(false);

    service.applySavedSettings();

    expect(document.body.className).toBe('');
    expect(cookieConsentMock.isAllowed).toHaveBeenCalledWith('preferences');
  });

  it('should ignore invalid JSON in cookie', () => {
    (cookieMock.get as any).mockReturnValue('BAD_JSON');
    cookieConsentMock.isAllowed.mockReturnValue(true);

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
    cookieConsentMock.isAllowed.mockReturnValue(true);

    service.applySavedSettings();

    expect(document.body.classList.contains('high-contrast')).toBe(true);
    expect(document.body.classList.contains('large-text')).toBe(false);
    expect(document.body.classList.contains('dyslexia-mode')).toBe(true);
  });

  it('should convert camelCase IDs to kebab-case CSS classes', () => {
    (cookieMock.get as any).mockReturnValue(
      JSON.stringify({ reduceMotionSetting: true })
    );
    cookieConsentMock.isAllowed.mockReturnValue(true);

    service.applySavedSettings();

    expect(document.body.classList.contains('reduce-motion-setting')).toBe(true);
  });

  it('should save settings when preferences cookies are allowed', () => {
    const settings = { highContrast: true, largeText: false };
    cookieConsentMock.isAllowed.mockReturnValue(true);

    service.saveSettings(settings);

    expect(cookieMock.set).toHaveBeenCalledWith('a11y_settings', JSON.stringify(settings), 365);
    expect(cookieConsentMock.isAllowed).toHaveBeenCalledWith('preferences');
  });

  it('should not save settings when preferences cookies are not allowed', () => {
    const settings = { highContrast: true };
    cookieConsentMock.isAllowed.mockReturnValue(false);

    service.saveSettings(settings);

    expect(cookieMock.set).not.toHaveBeenCalled();
    expect(cookieConsentMock.isAllowed).toHaveBeenCalledWith('preferences');
  });
});
