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

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Why Choose Stone Mark?');
  });

  it('should render 4 feature cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.bg-surface-alt'));
    expect(cards.length).toBe(4);
  });

  it('should render Explore Monuments feature', () => {
    const featureHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(featureHeadings[0].nativeElement.textContent.trim()).toBe('Explore Monuments');
  });

  it('should render Discover Marks feature', () => {
    const featureHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(featureHeadings[1].nativeElement.textContent.trim()).toBe('Discover Marks');
  });

  it('should render Location Mapping feature', () => {
    const featureHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(featureHeadings[2].nativeElement.textContent.trim()).toBe('Location Mapping');
  });

  it('should render Track Your Impact feature', () => {
    const featureHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(featureHeadings[3].nativeElement.textContent.trim()).toBe('Track Your Impact');
  });

  it('should render globe icon for Explore Monuments', () => {
    const icon = fixture.debugElement.query(By.css('.bi-globe-europe-africa'));
    expect(icon).toBeTruthy();
  });

  it('should render hammer icon for Discover Marks', () => {
    const icon = fixture.debugElement.query(By.css('.bi-hammer'));
    expect(icon).toBeTruthy();
  });

  it('should render geo-alt-fill icon for Location Mapping', () => {
    const icon = fixture.debugElement.query(By.css('.bi-geo-alt-fill'));
    expect(icon).toBeTruthy();
  });

  it('should render graph-up-arrow icon for Track Your Impact', () => {
    const icon = fixture.debugElement.query(By.css('.bi-graph-up-arrow'));
    expect(icon).toBeTruthy();
  });

  it('should have proper grid layout', () => {
    const grid = fixture.debugElement.query(By.css('.grid.md\\:grid-cols-2'));
    expect(grid).toBeTruthy();
  });

  it('should render description for Explore Monuments feature', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('.text-text-muted.leading-relaxed'));
    expect(paragraphs[0].nativeElement.textContent).toContain('Navigate through an extensive database');
  });

  it('should render description for Discover Marks feature', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('.text-text-muted.leading-relaxed'));
    expect(paragraphs[1].nativeElement.textContent).toContain('Explore a living archive');
  });

  it('should render description for Location Mapping feature', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('.text-text-muted.leading-relaxed'));
    expect(paragraphs[2].nativeElement.textContent).toContain('automatically geotagged');
  });

  it('should render description for Track Your Impact feature', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('.text-text-muted.leading-relaxed'));
    expect(paragraphs[3].nativeElement.textContent).toContain('Monitor your submissions');
  });

  it('should have hover shadow transition on feature cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.hover\\:shadow-lg'));
    expect(cards.length).toBe(4);
  });

  it('should have proper icon container styling', () => {
    const iconContainers = fixture.debugElement.queryAll(By.css('.w-16.h-16.rounded-xl'));
    expect(iconContainers.length).toBe(4);
  });

  it('should apply primary color to globe icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-globe-europe-africa'));
    expect(icon.nativeElement.className).toContain('text-primary');
  });

  it('should apply info color to hammer icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-hammer'));
    expect(icon.nativeElement.className).toContain('text-info');
  });

  it('should apply success color to geo-alt icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-geo-alt-fill'));
    expect(icon.nativeElement.className).toContain('text-success');
  });

  it('should apply warning color to graph icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-graph-up-arrow'));
    expect(icon.nativeElement.className).toContain('text-warning');
  });
});
