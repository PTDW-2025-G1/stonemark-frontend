import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsAboutCookiesSection } from './questions-about-cookies-section';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('QuestionsAboutCookiesSection', () => {
  let component: QuestionsAboutCookiesSection;
  let fixture: ComponentFixture<QuestionsAboutCookiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        QuestionsAboutCookiesSection
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

  it('should display the title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe('Questions About Cookies?');
  });

  it('should display the description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(paragraph.textContent).toContain('If you have questions about how we use cookies');
  });

  it('should have a link to contact page', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/contact"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Contact Us');
  });

  it('should have a link to the privacy policy page', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/privacy-policy"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Privacy Policy');
  });

  it('should contain both icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('i'));

    expect(icons.length).toBe(2);

    const iconClasses = icons.map(i => i.nativeElement.className);
    expect(iconClasses.some(c => c.includes('bi-chat-dots'))).toBeTruthy();
    expect(iconClasses.some(c => c.includes('bi-shield-check'))).toBeTruthy();
  });
});
