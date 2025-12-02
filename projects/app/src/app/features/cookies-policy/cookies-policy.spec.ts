import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { CookiesPolicyComponent } from './cookies-policy';
import { RouterTestingModule } from '@angular/router/testing';

describe('CookiesPolicyComponent Test', () => {
  let fixture: any;
  let dom: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CookiesPolicyComponent, RouterTestingModule],
    });

    fixture = TestBed.createComponent(CookiesPolicyComponent);
    fixture.detectChanges();
    dom = fixture.nativeElement as HTMLElement;
  });

  it('should render the component without errors', () => {
    expect(dom).toBeTruthy();
  });

  it('should render the main H1 title', () => {
    const h1 = dom.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toContain('Cookie Policy');
  });

  it('should render all H2 headings', () => {
    const h2Headings = Array.from(dom.querySelectorAll('h2')).map(h => h.textContent?.trim());
    const expectedH2s = [
      'Introduction',
      'What Are Cookies?',
      'Types of Cookies We Use',
      'Third-Party Cookies',
      'Managing Your Cookie Preferences',
      'Cookie Retention Periods',
      'Updates to This Policy',
      'Questions About Cookies?'
    ];
    expectedH2s.forEach(title => {
      expect(h2Headings).toContain(title);
    });
  });

  it('should render all H3 headings inside Types of Cookies', () => {
    const h3Headings = Array.from(dom.querySelectorAll('h3')).map(h => h.textContent?.trim());
    const expectedH3s = [
      '1. Essential Cookies',
      '2. Functional Cookies',
      '3. Analytics Cookies',
      '4. Marketing Cookies'
    ];
    expectedH3s.forEach(title => {
      expect(h3Headings).toContain(title);
    });
  });

  it('should render all examples lists inside Types of Cookies', () => {
    const ulLists = Array.from(dom.querySelectorAll('section ul'));
    expect(ulLists.length).toBeGreaterThanOrEqual(4);
    const firstListItems = ulLists[0].querySelectorAll('li');
    expect(firstListItems[0].textContent).toContain('Authentication tokens');
  });

  it('should render third-party cookies cards', () => {
    const thirdPartyCards = dom.querySelectorAll('section h4');
    const expectedThirdParty = [
      'Google Analytics',
      'Mapping Services',
      'Social Media Platforms',
      'Security Services'
    ];
    expectedThirdParty.forEach(name => {
      const found = Array.from(thirdPartyCards).some(card => card.textContent?.includes(name));
      expect(found).toBe(true);
    });
  });

  it('should render browser settings, cookie banner and opt-out sections', () => {
    const browserSection = dom.querySelector('h4 i.bi-browser-chrome');
    const bannerSection = dom.querySelector('h4 i.bi-toggles');
    const optOutSection = dom.querySelector('h4 i.bi-box-arrow-right');

    expect(browserSection).toBeTruthy();
    expect(bannerSection).toBeTruthy();
    expect(optOutSection).toBeTruthy();
  });

  it('should contain links for contact and privacy policy', () => {
    const contactLink = dom.querySelector('a[routerLink="/contact"]') as HTMLAnchorElement;
    const privacyLink = dom.querySelector('a[routerLink="/privacy-policy"]') as HTMLAnchorElement;

    expect(contactLink).toBeTruthy();
    expect(contactLink.textContent).toContain('Contact Us');

    expect(privacyLink).toBeTruthy();
    expect(privacyLink.textContent).toContain('Privacy Policy');
  });

  it('should contain external third-party opt-out links', () => {
    const gaOptOut = dom.querySelector('a[href="https://tools.google.com/dlpage/gaoptout"]');
    const euOptOut = dom.querySelector('a[href="https://www.youronlinechoices.com/"]');
    const naiOptOut = dom.querySelector('a[href="https://optout.networkadvertising.org/"]');

    expect(gaOptOut).toBeTruthy();
    expect(euOptOut).toBeTruthy();
    expect(naiOptOut).toBeTruthy();
  });

  it('should render cookie retention cards', () => {
    const retentionCards = Array.from(dom.querySelectorAll('section div.grid > div'));
    const expectedCards = [
      'Session Cookies',
      'Persistent Cookies',
      'Authentication Cookies',
      'Analytics Cookies'
    ];
    expectedCards.forEach(card => {
      const found = retentionCards.some(c => c.textContent?.includes(card));
      expect(found).toBe(true);
    });
  });

  it('should render policy update section', () => {
    const updateSection = Array.from(dom.querySelectorAll('h2'))
      .find(h => h.textContent?.includes('Updates to This Policy'));

    expect(updateSection).toBeTruthy();
    expect(updateSection?.textContent).toContain('Updates to This Policy');
  });

  it('should contain warning message about cookies', () => {
    const warning = dom.querySelector('div[class*="bg-warning"]');
    expect(warning).toBeTruthy();
    expect(warning?.textContent).toContain('Important');
  });

  it('should match snapshot', () => {
    expect(dom.innerHTML).toMatchSnapshot();
  });
});
