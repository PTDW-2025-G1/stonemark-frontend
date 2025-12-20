import { describe, it, beforeEach, expect, vi } from 'vitest';
import { moderatorGuard } from './moderator.guard';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('moderatorGuard', () => {
  let authService: any;
  let router: any;

  beforeEach(() => {
    authService = {
      getRole: vi.fn(),
    };

    router = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('should allow access for ADMIN role', () => {
    authService.getRole.mockReturnValue('ADMIN');

    const result = TestBed.runInInjectionContext(() => moderatorGuard({} as any, {} as any));

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should allow access for MODERATOR role', () => {
    authService.getRole.mockReturnValue('MODERATOR');

    const result = TestBed.runInInjectionContext(() => moderatorGuard({} as any, {} as any));

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access for USER role', () => {
    authService.getRole.mockReturnValue('USER');

    const result = TestBed.runInInjectionContext(() => moderatorGuard({} as any, {} as any));

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should deny access when no role exists', () => {
    authService.getRole.mockReturnValue(null);

    const result = TestBed.runInInjectionContext(() => moderatorGuard({} as any, {} as any));

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

