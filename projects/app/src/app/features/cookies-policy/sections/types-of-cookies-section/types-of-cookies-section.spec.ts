import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesOfCookiesSection } from './types-of-cookies-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('TypesOfCookiesSection', () => {
  let component: TypesOfCookiesSection;
  let fixture: ComponentFixture<TypesOfCookiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TypesOfCookiesSection,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TypesOfCookiesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main section container', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.className).toContain('bg-surface-alt');
    expect(section.nativeElement.className).toContain('rounded-2xl');
  });

  it('should render the main title', () => {
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.className).toContain('font-serif');
  });

  it('should render 4 cookie category headings', () => {
    const headings = fixture.debugElement.queryAll(By.css('h3'));
    expect(headings.length).toBe(4);
  });

  it('should render a description paragraph for each category', () => {
    const descriptions = fixture.debugElement.queryAll(By.css('h3 + p'));
    expect(descriptions.length).toBe(4);
  });

  it('should render example blocks for each category', () => {
    const exampleBlocks = fixture.debugElement.queryAll(By.css('.bg-surface.rounded-xl'));
    expect(exampleBlocks.length).toBe(4);
  });

  it('should render one list per cookie category', () => {
    const lists = fixture.debugElement.queryAll(By.css('ul'));
    expect(lists.length).toBe(4);
  });

  it('should render check icons inside lists', () => {
    const icons = fixture.debugElement.queryAll(By.css('.bi-check-circle-fill'));
    expect(icons.length).toBeGreaterThan(0);

    icons.forEach(icon => {
      expect(icon.nativeElement.className).toContain('text-primary');
    });
  });

  it('should render italic or small notes where applicable', () => {
    const notes = fixture.debugElement.queryAll(By.css('p.text-xs'));
    expect(notes.length).toBeGreaterThan(0);
  });
});
