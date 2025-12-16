import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section';
import { By } from '@angular/platform-browser';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section badge with correct text', () => {
    const badge = fixture.debugElement.query(By.css('.border.border-border'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent.trim()).toBe('Help & Guide');
  });

  it('should render badge with uppercase tracking-widest style', () => {
    const badge = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(badge).toBeTruthy();
  });

  it('should render the main heading with Capture in italic', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent).toContain('Discover');
    expect(heading.nativeElement.textContent).toContain('Capture');
    expect(heading.nativeElement.textContent).toContain('Preserve');
  });

  it('should have italic span for Capture word', () => {
    const italicSpan = fixture.debugElement.query(By.css('h1 .italic'));
    expect(italicSpan).toBeTruthy();
    expect(italicSpan.nativeElement.textContent).toBe('Capture');
  });

  it('should render subtitle paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p.text-text-muted'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toContain('Every mark tells a story');
  });

  it('should have centered text layout', () => {
    const container = fixture.debugElement.query(By.css('.text-center'));
    expect(container).toBeTruthy();
  });

  it('should have proper section structure with padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('pt-32');
    expect(classes).toContain('pb-20');
  });

  it('should have max-width constraint on container', () => {
    const container = fixture.debugElement.query(By.css('.max-w-4xl'));
    expect(container).toBeTruthy();
  });

  it('should have font-serif on heading', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should not render any icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('.bi'));
    expect(icons.length).toBe(0);
  });

  it('should mention joining explorers in the description', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph.nativeElement.textContent).toContain('Join thousands of explorers');
  });

  it('should mention cultural heritage preservation', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph.nativeElement.textContent).toContain('preserving cultural heritage');
  });
});
