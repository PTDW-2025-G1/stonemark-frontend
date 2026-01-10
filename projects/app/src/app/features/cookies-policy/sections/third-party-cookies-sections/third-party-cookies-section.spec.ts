import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdPartyCookiesSection } from './third-party-cookies-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('ThirdPartyCookiesSection', () => {
  let component: ThirdPartyCookiesSection;
  let fixture: ComponentFixture<ThirdPartyCookiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ThirdPartyCookiesSection,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThirdPartyCookiesSection);
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

  it('should render the section title', () => {
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.className).toContain('font-serif');
  });

  it('should render the introduction paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p.text-text-muted'));
    expect(paragraph).toBeTruthy();
  });

  it('should render four third-party cookie blocks', () => {
    const blocks = fixture.debugElement.queryAll(By.css('.bg-surface.rounded-xl'));
    expect(blocks.length).toBe(4);
  });

  it('should render a title and description inside each block', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    const descriptions = fixture.debugElement.queryAll(By.css('p.text-sm'));

    expect(titles.length).toBe(4);
    expect(descriptions.length).toBe(5);
  });

  it('should render icons for all blocks', () => {
    const icons = fixture.debugElement.queryAll(By.css('i.bi'));
    expect(icons.length).toBe(4);

    const classes = icons.map(i => i.nativeElement.className);
    expect(classes.some(c => c.includes('bi-bar-chart'))).toBe(true);
    expect(classes.some(c => c.includes('bi-map'))).toBe(true);
    expect(classes.some(c => c.includes('bi-share'))).toBe(true);
    expect(classes.some(c => c.includes('bi-shield-check'))).toBe(true);
  });

  it('should render an italic disclaimer note at the bottom', () => {
    const note = fixture.debugElement.query(By.css('p.italic'));
    expect(note).toBeTruthy();
    expect(note.nativeElement.className).toContain('text-sm');
  });
});
