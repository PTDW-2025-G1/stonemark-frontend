import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagingCookiePreferencesSection } from './cookie-preferences-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('ManagingCookiePreferencesSection', () => {
  let component: ManagingCookiePreferencesSection;
  let fixture: ComponentFixture<ManagingCookiePreferencesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ManagingCookiePreferencesSection,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagingCookiePreferencesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main section container', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.className).toContain('rounded-2xl');
    expect(section.nativeElement.className).toContain('border');
  });

  it('should render the main header with icon', () => {
    const header = fixture.debugElement.query(By.css('h2'));
    expect(header).toBeTruthy();

    const icon = fixture.debugElement.query(By.css('.bi-sliders'));
    expect(icon).toBeTruthy();
  });

  it('should render three main preference blocks', () => {
    const blocks = fixture.debugElement.queryAll(By.css('.bg-surface.rounded-xl'));
    expect(blocks.length).toBe(3);
  });

  it('should render section icons for each block', () => {
    expect(fixture.debugElement.query(By.css('.bi-browser-chrome'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.bi-toggles'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.bi-box-arrow-right'))).toBeTruthy();
  });

  it('should render opt-out links with correct URLs', () => {
    const links = fixture.debugElement.queryAll(By.css('a')).map(a =>
      a.nativeElement.getAttribute('href')
    );

    expect(links).toContain('https://tools.google.com/dlpage/gaoptout');
    expect(links).toContain('https://www.youronlinechoices.com/');
    expect(links).toContain('https://optout.networkadvertising.org/');
  });

  it('should render the warning message container', () => {
    const warning = fixture.debugElement.query(By.css('.bg-warning\\/10'));
    expect(warning).toBeTruthy();
    expect(warning.nativeElement.className).toContain('border-warning');
  });
});
