import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MonumentDetailComponent } from './monument-detail';
import { of, throwError } from 'rxjs';
import { convertToParamMap } from '@angular/router';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { firstValueFrom } from 'rxjs';
import {MarkOccurrenceService} from '@core/services/mark/mark-occurrence.service';

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

describe('MonumentDetailComponent', () => {
  let component: MonumentDetailComponent;
  let monumentService: any;
  let activatedRoute: any;
  let router: any;
  let markOccurrenceService: any;
  let sanitizer: any;
  let titleService: any;
  let notificationService: any;
  let bookmarkService: any;

  const mockMonument: MonumentResponseDto = {
    id: 1,
    name: 'Torre de Belém',
    city: 'Lisboa',
    latitude: 38.6916,
    longitude: -9.2160,
    description: 'Torre histórica localizada em Lisboa',
    address: 'Av. Brasília, Lisboa',
    protectionTitle: 'Monumento Nacional',
    website: 'https://example.com',
    lastModifiedAt: '2024-01-01T10:00:00Z',
    lastModifiedBy: 'Admin',
  };

  beforeEach(() => {
    monumentService = {
      getMonumentById: vi.fn(),
    };

    activatedRoute = {
      paramMap: of(convertToParamMap({ id: '1' })),
      snapshot: {
        paramMap: {
          get: vi.fn().mockReturnValue('1'),
        },
      },
    };

    router = {
      navigate: vi.fn(),
    };

    markOccurrenceService = {
      getByMonumentId: vi.fn().mockReturnValue(of([])),
    };

    sanitizer = {
      bypassSecurityTrustResourceUrl: vi.fn().mockReturnValue('safe-url'),
    };

    titleService = {
      setTitle: vi.fn(),
    };

    notificationService = {
      showSuccess: vi.fn(),
    };

    bookmarkService = {
      isBookmarked: vi.fn().mockReturnValue(of(false)),
      getUserBookmarks: vi.fn().mockReturnValue(of([])),
      createBookmark: vi.fn().mockReturnValue(of({ id: 1 })),
      deleteBookmark: vi.fn().mockReturnValue(of({})),
    };

    component = new MonumentDetailComponent(
      activatedRoute,
      router,
      monumentService,
      markOccurrenceService,
      sanitizer,
      titleService,
      notificationService,
      bookmarkService,
    );
  });


  it('should load monument on init', async () => {
    monumentService.getMonumentById.mockReturnValue(of(mockMonument));

    component.ngOnInit();

    await firstValueFrom(component.monument$);

    expect(monumentService.getMonumentById).toHaveBeenCalledWith(1);
  });

  it('should set page title with monument name', async () => {
    monumentService.getMonumentById.mockReturnValue(of(mockMonument));

    component.ngOnInit();

    await firstValueFrom(component.monument$);

    expect(titleService.setTitle).toHaveBeenCalledWith('Torre de Belém - StoneMark');
  });

  it('should set map URL when monument has coordinates', async () => {
    monumentService.getMonumentById.mockReturnValue(of(mockMonument));

    component.ngOnInit();

    await firstValueFrom(component.monument$);

    expect(component.mapUrl).toBe('safe-url');
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
  });

  it('should not set map URL when monument has no coordinates', async () => {
    const monumentWithoutCoords = { ...mockMonument, latitude: null, longitude: null };
    monumentService.getMonumentById.mockReturnValue(of(monumentWithoutCoords));

    component.ngOnInit();

    await firstValueFrom(component.monument$);

    expect(component.mapUrl).toBeNull();
  });

  it('should toggle bookmark from false to true', async () => {
    component.isBookmarked = false;

    bookmarkService.createBookmark.mockReturnValue(of({ id: 1 }));

    component.toggleBookmark();

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(bookmarkService.createBookmark).toHaveBeenCalledWith('MONUMENT', 1);
    expect(component.isBookmarked).toBe(true);
    expect(component.bookmarksCount).toBe(1);
  });

  it('should toggle bookmark from true to false', async () => {
    component.isBookmarked = true;
    component.bookmarksCount = 1;

    const mockBookmarks = [
      { id: 1, type: 'MONUMENT', targetId: 1 }
    ];

    bookmarkService.getUserBookmarks.mockReturnValue(of(mockBookmarks));
    bookmarkService.deleteBookmark.mockReturnValue(of({}));

    component.toggleBookmark();

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(bookmarkService.getUserBookmarks).toHaveBeenCalled();
    expect(bookmarkService.deleteBookmark).toHaveBeenCalledWith(1);
    expect(component.isBookmarked).toBe(false);
    expect(component.bookmarksCount).toBe(0);
  });


  it('should navigate to capture mark page', () => {
    component.captureMark();

    expect(router.navigate).toHaveBeenCalledWith(['/marks/capture']);
  });

  it('should navigate to view marks with monument ID', () => {
    component.viewMarks();

    expect(router.navigate).toHaveBeenCalledWith(['/search/marks'], {
      queryParams: { monumentId: '1' },
    });
  });

  it('should navigate to suggest correction with monument ID', () => {
    component.suggestCorrection();

    expect(router.navigate).toHaveBeenCalledWith(['/suggestions/new'], {
      queryParams: { monumentId: '1' },
    });
  });

  it('should set map URL with correct coordinates', () => {
    const latitude = 38.6916;
    const longitude = -9.2160;

    component.setMapUrl(latitude, longitude);

    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
    );
    expect(component.mapUrl).toBe('safe-url');
  });

  it('should open directions in new window', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const latitude = 38.6916;
    const longitude = -9.2160;

    component.openDirections(latitude, longitude);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    );
  });

  it('should copy link to clipboard', async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextSpy,
      },
    });

    await component.copyLink();

    expect(writeTextSpy).toHaveBeenCalledWith(window.location.href);
    expect(notificationService.showSuccess).toHaveBeenCalledWith('Link copied to clipboard!');
  });

  it('should share on Facebook', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const currentUrl = encodeURIComponent(window.location.href);

    component.shareOnFacebook();

    expect(windowOpenSpy).toHaveBeenCalledWith(
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      '_blank'
    );
  });

  it('should share on Instagram', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    component.shareOnInstagram();

    expect(windowOpenSpy).toHaveBeenCalledWith('https://www.instagram.com/', '_blank');
  });

  it('should handle monument service error', async () => {
    const error = new Error('Failed to load monument');
    monumentService.getMonumentById.mockReturnValue(throwError(() => error));

    component.ngOnInit();

    await expect(firstValueFrom(component.monument$)).rejects.toThrow('Failed to load monument');
  });

  it('should parse monument ID from route params', async () => {
    monumentService.getMonumentById.mockReturnValue(of(mockMonument));

    component.ngOnInit();

    await firstValueFrom(component.monument$);

    expect(monumentService.getMonumentById).toHaveBeenCalledWith(1);
  });

});
