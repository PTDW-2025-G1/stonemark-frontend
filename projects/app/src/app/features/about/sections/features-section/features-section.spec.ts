import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesSectionComponent } from './features-section';
import { FeatureCardComponent } from '@shared/ui/feature-card/feature-card';
import { By } from '@angular/platform-browser';

describe('FeaturesSectionComponent', () => {
  let component: FeaturesSectionComponent;
  let fixture: ComponentFixture<FeaturesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesSectionComponent, FeatureCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section badge with correct text', () => {
    const badge = fixture.debugElement.query(By.css('.bg-primary\\/10'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('Features');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Powerful Features for Every Explorer');
  });

  it('should render the description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('.text-text-muted'));
    expect(paragraph.nativeElement.textContent.trim()).toBe('Designed to make your journey through history seamless, engaging, and unforgettable');
  });

  it('should render 6 feature cards', () => {
    const featureCards = fixture.debugElement.queryAll(By.directive(FeatureCardComponent));
    expect(featureCards.length).toBe(6);
  });

  it('should render Capture & Submit Marks feature card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(FeatureCardComponent));
    const captureCard = cards[0].componentInstance;

    expect(captureCard.icon).toBe('bi bi-camera-fill');
    expect(captureCard.title).toBe('Capture & Submit Marks');
    expect(captureCard.description).toContain('Photograph and submit authentic stonemason marks');
  });

  it('should render Search Monuments feature card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(FeatureCardComponent));
    const searchCard = cards[1].componentInstance;

    expect(searchCard.icon).toBe('bi bi-search');
    expect(searchCard.title).toBe('Search Monuments');
    expect(searchCard.description).toContain('Discover monuments and stonemason symbols');
  });

  it('should render Advanced Filtering feature card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(FeatureCardComponent));
    const filterCard = cards[2].componentInstance;

    expect(filterCard.icon).toBe('bi bi-funnel-fill');
    expect(filterCard.title).toBe('Advanced Filtering');
    expect(filterCard.description).toContain('Filter marks by monument');
  });

  it('should render Bookmarks & Collections feature card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(FeatureCardComponent));
    const bookmarkCard = cards[3].componentInstance;

    expect(bookmarkCard.icon).toBe('bi bi-bookmark-fill');
    expect(bookmarkCard.title).toBe('Bookmarks & Collections');
    expect(bookmarkCard.description).toContain('Save your favourite monuments');
  });

  it('should render Geolocation on Map feature card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(FeatureCardComponent));
    const geoCard = cards[4].componentInstance;

    expect(geoCard.icon).toBe('bi bi-geo-alt-fill');
    expect(geoCard.title).toBe('Geolocation on Map');
    expect(geoCard.description).toContain('Explore nearby stonemason marks');
  });

  it('should render Cultural Preservation feature card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(FeatureCardComponent));
    const preservationCard = cards[5].componentInstance;

    expect(preservationCard.icon).toBe('bi bi-shield-check');
    expect(preservationCard.title).toBe('Cultural Preservation');
    expect(preservationCard.description).toContain('Support the documentation and preservation');
  });

  it('should have proper grid layout classes', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    const classes = grid.nativeElement.className;

    expect(classes).toContain('grid-cols-1');
    expect(classes).toContain('md:grid-cols-2');
    expect(classes).toContain('lg:grid-cols-3');
  });

  it('should have proper section structure with padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-16');
    expect(classes).toContain('sm:py-20');
    expect(classes).toContain('lg:py-28');
  });

  it('should render star icon in badge', () => {
    const icon = fixture.debugElement.query(By.css('.bi-stars'));
    expect(icon).toBeTruthy();
  });
});
