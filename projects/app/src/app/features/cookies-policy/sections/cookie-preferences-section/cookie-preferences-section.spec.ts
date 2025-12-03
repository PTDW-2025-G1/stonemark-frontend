import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagingCookiePreferencesSection } from './cookie-preferences-section';
import { By } from '@angular/platform-browser';

describe('ManagingCookiePreferencesSection', () => {
  let component: ManagingCookiePreferencesSection;
  let fixture: ComponentFixture<ManagingCookiePreferencesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagingCookiePreferencesSection]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagingCookiePreferencesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe('Managing Your Cookie Preferences');
  });

  it('should contain introductory text', () => {
    const intro = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(intro.textContent).toContain('You have the right to control');
  });

  it('should render the three main preference blocks', () => {
    const blocks = fixture.debugElement.queryAll(By.css('.bg-surface.rounded-xl'));
    expect(blocks.length).toBe(3);
  });

  it('should include Browser Settings section', () => {
    const heading = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(heading.textContent).toContain('Browser Settings');
  });

  it('should include Cookie Consent Banner section', () => {
    const headings = fixture.debugElement.queryAll(By.css('h4')).map(h =>
      h.nativeElement.textContent.trim()
    );
    expect(headings).toContain('Cookie Consent Banner');
  });

  it('should include Third-Party Opt-Out section', () => {
    const headings = fixture.debugElement.queryAll(By.css('h4')).map(h =>
      h.nativeElement.textContent.trim()
    );
    expect(headings).toContain('Third-Party Opt-Out');
  });

  it('should render opt-out links', () => {
    const links = fixture.debugElement.queryAll(By.css('a')).map(a =>
      a.nativeElement.getAttribute('href')
    );

    expect(links).toContain('https://tools.google.com/dlpage/gaoptout');
    expect(links).toContain('https://www.youronlinechoices.com/');
    expect(links).toContain('https://optout.networkadvertising.org/');
  });

  it('should display the important warning message', () => {
    const warning = fixture.debugElement.query(By.css('.bg-warning\\/10 p')).nativeElement;
    expect(warning.textContent).toContain('Blocking certain cookies may affect your experience');
  });
});
