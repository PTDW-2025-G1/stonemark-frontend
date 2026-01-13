import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CookieConsentService } from './cookie-consent.service';
import { CookieService } from '../cookie/cookie.service';

describe('CookieConsentService', () => {
  let service: CookieConsentService;
  let cookieServiceMock: any;

  beforeEach(() => {
    cookieServiceMock = {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
      delete: vi.fn()
    };

    service = new CookieConsentService(cookieServiceMock as CookieService);
  });

  describe('initialization', () => {
    it('should have pending status by default', () => {
      expect(service.consentStatus()).toBe('pending');
      expect(service.hasConsent()).toBe(false);
    });

    it('should load saved consent from cookies', () => {
      cookieServiceMock.get.mockImplementation((name: string) => {
        if (name === 'cookieConsent') return 'accepted';
        if (name === 'cookiePreferences') return JSON.stringify({
          necessary: true,
          analytics: true,
          marketing: false,
          preferences: true
        });
        return null;
      });

      const newService = new CookieConsentService(cookieServiceMock);

      expect(newService.consentStatus()).toBe('accepted');
      expect(newService.preferences().analytics).toBe(true);
    });
  });

  describe('acceptAll', () => {
    it('should accept all cookies and save preferences', () => {
      service.acceptAll();

      expect(cookieServiceMock.set).toHaveBeenCalledWith('cookieConsent', 'accepted', 365);
      expect(service.consentStatus()).toBe('accepted');
      expect(service.preferences().analytics).toBe(true);
      expect(service.preferences().marketing).toBe(true);
      expect(service.hasConsent()).toBe(true);
    });
  });

  describe('rejectAll', () => {
    it('should reject optional cookies and clear them', () => {
      service.rejectAll();

      expect(cookieServiceMock.set).toHaveBeenCalledWith('cookieConsent', 'rejected', 365);
      expect(service.consentStatus()).toBe('rejected');
      expect(service.preferences().necessary).toBe(true);
      expect(service.preferences().analytics).toBe(false);
      expect(service.preferences().marketing).toBe(false);
      expect(service.hasConsent()).toBe(true);
    });

    it('should clear optional cookies when rejecting', () => {
      service.rejectAll();

      expect(cookieServiceMock.delete).toHaveBeenCalledWith('_ga');
      expect(cookieServiceMock.delete).toHaveBeenCalledWith('_gid');
    });
  });

  describe('saveCustomPreferences', () => {
    it('should save custom preferences with necessary always true', () => {
      service.saveCustomPreferences({
        analytics: true,
        marketing: false,
        preferences: true
      });

      expect(service.preferences().necessary).toBe(true);
      expect(service.preferences().analytics).toBe(true);
      expect(service.preferences().marketing).toBe(false);
      expect(service.consentStatus()).toBe('accepted');
    });

    it('should set status to rejected if all optional are false', () => {
      service.saveCustomPreferences({
        analytics: false,
        marketing: false,
        preferences: false
      });

      expect(service.consentStatus()).toBe('rejected');
    });
  });

  describe('isAllowed', () => {
    it('should return true for necessary cookies', () => {
      expect(service.isAllowed('necessary')).toBe(true);
    });

    it('should return false for analytics by default', () => {
      expect(service.isAllowed('analytics')).toBe(false);
    });

    it('should return true after accepting all', () => {
      service.acceptAll();
      expect(service.isAllowed('analytics')).toBe(true);
      expect(service.isAllowed('marketing')).toBe(true);
    });
  });

  describe('resetConsent', () => {
    it('should reset consent and delete cookies', () => {
      service.acceptAll();
      service.resetConsent();

      expect(cookieServiceMock.delete).toHaveBeenCalledWith('cookieConsent');
      expect(cookieServiceMock.delete).toHaveBeenCalledWith('cookiePreferences');
      expect(service.consentStatus()).toBe('pending');
      expect(service.hasConsent()).toBe(false);
    });
  });
});

