import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesOfCookiesSection } from './types-of-cookies-section';
import { By } from '@angular/platform-browser';

describe('TypesOfCookiesSection', () => {
  let component: TypesOfCookiesSection;
  let fixture: ComponentFixture<TypesOfCookiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesOfCookiesSection]
    }).compileComponents();

    fixture = TestBed.createComponent(TypesOfCookiesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main section title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe('Types of Cookies We Use');
  });

  it('should render all 4 cookie category headings', () => {
    const categoryHeadings = fixture.debugElement.queryAll(By.css('h3'));
    const texts = categoryHeadings.map(h => h.nativeElement.textContent.trim());

    expect(texts).toContain('1. Essential Cookies');
    expect(texts).toContain('2. Functional Cookies');
    expect(texts).toContain('3. Analytics Cookies');
    expect(texts).toContain('4. Marketing Cookies');
  });

  it('should render example lists for each cookie category', () => {
    const lists = fixture.debugElement.queryAll(By.css('ul'));
    expect(lists.length).toBe(4);
  });

  it('should render the section container with proper styling classes', () => {
    const section = fixture.debugElement.query(By.css('section')).nativeElement;
    expect(section.className).toContain('bg-surface-alt');
    expect(section.className).toContain('rounded-2xl');
  });
});
