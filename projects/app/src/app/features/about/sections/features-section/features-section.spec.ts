import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesSectionComponent } from './features-section';
import { By } from '@angular/platform-browser';

describe('FeaturesSectionComponent', () => {
  let component: FeaturesSectionComponent;
  let fixture: ComponentFixture<FeaturesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section label', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('Key Features');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Tools for Heritage Explorers');
  });

  it('should render the description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p.text-text-muted'));
    expect(paragraph.nativeElement.textContent).toContain('Designed to make your journey through history seamless, engaging, and unforgettable');
  });

  it('should render 6 numbered features', () => {
    const features = fixture.debugElement.queryAll(By.css('.relative.pl-8'));
    expect(features.length).toBe(6);
  });

  it('should render numbers 01 to 06', () => {
    const numbers = fixture.debugElement.queryAll(By.css('.absolute.left-0'));
    expect(numbers.length).toBe(6);
    expect(numbers[0].nativeElement.textContent.trim()).toBe('01');
    expect(numbers[1].nativeElement.textContent.trim()).toBe('02');
    expect(numbers[2].nativeElement.textContent.trim()).toBe('03');
    expect(numbers[3].nativeElement.textContent.trim()).toBe('04');
    expect(numbers[4].nativeElement.textContent.trim()).toBe('05');
    expect(numbers[5].nativeElement.textContent.trim()).toBe('06');
  });

  it('should render Capture & Submit Marks feature', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles[0].nativeElement.textContent.trim()).toBe('Capture & Submit Marks');
  });

  it('should render Search Monuments feature', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles[1].nativeElement.textContent.trim()).toBe('Search Monuments');
  });

  it('should render Advanced Filtering feature', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles[2].nativeElement.textContent.trim()).toBe('Advanced Filtering');
  });

  it('should render Bookmarks & Collections feature', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles[3].nativeElement.textContent.trim()).toBe('Bookmarks & Collections');
  });

  it('should render Geolocation on Map feature', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles[4].nativeElement.textContent.trim()).toBe('Geolocation on Map');
  });

  it('should render Cultural Preservation feature', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles[5].nativeElement.textContent.trim()).toBe('Cultural Preservation');
  });

  it('should have proper grid layout classes', () => {
    const grid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-2'));
    expect(grid).toBeTruthy();
  });

  it('should have proper section structure with padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
  });

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have font-serif on all feature titles', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3.font-serif'));
    expect(titles.length).toBe(6);
  });

  it('should have font-serif on numbers', () => {
    const numbers = fixture.debugElement.queryAll(By.css('.font-serif.text-xl'));
    expect(numbers.length).toBe(6);
  });

  it('should have text-primary on numbers', () => {
    const numbers = fixture.debugElement.queryAll(By.css('.text-primary.font-serif'));
    expect(numbers.length).toBe(6);
  });
});
