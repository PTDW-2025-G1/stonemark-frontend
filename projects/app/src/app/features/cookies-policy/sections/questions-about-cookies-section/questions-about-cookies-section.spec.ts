import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsAboutCookiesSection } from './questions-about-cookies-section';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('QuestionsAboutCookiesSection', () => {
  let component: QuestionsAboutCookiesSection;
  let fixture: ComponentFixture<QuestionsAboutCookiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        QuestionsAboutCookiesSection,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsAboutCookiesSection);
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

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should render the description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.className).toContain('text-text-muted');
  });

  it('should render two action buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(buttons.length).toBe(2);
  });

  it('should have a button linking to contact page', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const contactBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/contact'
    );
    expect(contactBtn).toBeTruthy();
  });

  it('should have a button linking to privacy policy page', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const privacyBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/privacy-policy'
    );
    expect(privacyBtn).toBeTruthy();
  });

  it('should render both icons inside buttons', () => {
    const icons = fixture.debugElement.queryAll(By.css('i'));
    expect(icons.length).toBe(2);

    const classes = icons.map(i => i.nativeElement.className);
    expect(classes.some(c => c.includes('bi-chat-dots'))).toBe(true);
    expect(classes.some(c => c.includes('bi-shield-check'))).toBe(true);
  });
});
