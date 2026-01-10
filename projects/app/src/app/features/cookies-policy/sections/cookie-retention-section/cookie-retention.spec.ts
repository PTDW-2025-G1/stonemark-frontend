import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieRetentionSection } from './cookie-retention-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('CookieRetentionSection', () => {
  let component: CookieRetentionSection;
  let fixture: ComponentFixture<CookieRetentionSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CookieRetentionSection,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CookieRetentionSection);
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

  it('should render the introductory paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.className).toContain('text-text-muted');
  });

  it('should render four retention cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.bg-surface.rounded-xl'));
    expect(cards.length).toBe(4);
  });

  it('should render a grid layout for the cards', () => {
    const grid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-2'));
    expect(grid).toBeTruthy();
  });

  it('each card should have a title and description', () => {
    const cards = fixture.debugElement.queryAll(By.css('.bg-surface.rounded-xl'));

    cards.forEach(card => {
      expect(card.query(By.css('h4'))).toBeTruthy();
      expect(card.query(By.css('p.text-sm'))).toBeTruthy();
    });
  });
});
