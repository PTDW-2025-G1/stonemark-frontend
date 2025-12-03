import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieRetentionSection } from './cookie-retention-section';
import { By } from '@angular/platform-browser';

describe('CookieRetentionSection', () => {
  let component: CookieRetentionSection;
  let fixture: ComponentFixture<CookieRetentionSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieRetentionSection]
    }).compileComponents();

    fixture = TestBed.createComponent(CookieRetentionSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe('Cookie Retention Periods');
  });

  it('should contain the introductory text', () => {
    const intro = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(intro.textContent).toContain('Different cookies are retained');
  });

  it('should render four retention cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.bg-surface.rounded-xl'));
    expect(cards.length).toBe(4);
  });

  it('should show correct headings for each cookie type', () => {
    const headings = fixture.debugElement.queryAll(By.css('h4')).map(h =>
      h.nativeElement.textContent.trim()
    );

    expect(headings).toContain('Session Cookies');
    expect(headings).toContain('Persistent Cookies');
    expect(headings).toContain('Authentication Cookies');
    expect(headings).toContain('Analytics Cookies');
  });

  it('should show correct descriptions for each cookie type', () => {
    const descriptions = fixture.debugElement.queryAll(By.css('.text-sm.text-text-muted'))
      .map(p => p.nativeElement.textContent.trim());

    expect(descriptions).toContain('Deleted when you close your browser');
    expect(descriptions).toContain('Remain for 30 days to 2 years depending on type');
    expect(descriptions).toContain('Retained for up to 30 days or until logout');
    expect(descriptions).toContain('Typically retained for 24 months');
  });
});
