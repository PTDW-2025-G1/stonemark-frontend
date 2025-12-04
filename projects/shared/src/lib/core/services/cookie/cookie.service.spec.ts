import { describe, it, beforeEach, expect, vi } from 'vitest';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;

  let cookieStore: Record<string, string>;

  beforeEach(() => {
    cookieStore = {};

    vi.spyOn(document, 'cookie', 'get').mockImplementation(() => {
      return Object.entries(cookieStore)
        .map(([k, v]) => `${k}=${v}`)
        .join('; ');
    });

    vi.spyOn(document, 'cookie', 'set').mockImplementation((value: string) => {
      const [pair] = value.split(';');
      const [name, val] = pair.split('=');
      cookieStore[name] = val;
    });

    service = new CookieService();
  });

  it('should set a cookie with correct value', () => {
    service.set('token', 'abc123', 1);

    expect(cookieStore['token']).toBe('abc123');
  });

  it('should get an existing cookie', () => {
    cookieStore['token'] = 'xyz';
    expect(service.get('token')).toBe('xyz');
  });

  it('should return null for missing cookie', () => {
    expect(service.get('nope')).toBeNull();
  });

  it('should delete a cookie (set empty value)', () => {
    cookieStore['session'] = 'test';

    service.delete('session');

    expect(cookieStore['session']).toBe('');
  });

  it('should use localhost domain when getDomain() returns localhost', () => {
    const spy = vi
      .spyOn(CookieService.prototype as any, 'getDomain')
      .mockReturnValue('localhost');

    service.set('name', 'value', 1);

    expect(cookieStore['name']).toBe('value');
    expect(spy).toHaveBeenCalled();
  });

  it('should handle subdomain domain returned by getDomain()', () => {
    const spy = vi
      .spyOn(CookieService.prototype as any, 'getDomain')
      .mockReturnValue('.stonemark.pt');

    service.set('example', '123', 1);

    expect(cookieStore['example']).toBe('123');
    expect(spy).toHaveBeenCalled();
  });

  it('should handle two-level domain returned by getDomain()', () => {
    const spy = vi
      .spyOn(CookieService.prototype as any, 'getDomain')
      .mockReturnValue('stonemark.pt');

    service.set('x', 'y', 1);

    expect(cookieStore['x']).toBe('y');
    expect(spy).toHaveBeenCalled();
  });
});
