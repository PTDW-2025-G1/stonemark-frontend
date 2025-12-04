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

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.trim()).toBe('Discover. Capture. Preserve.');
  });

  it('should render the description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toContain('Every mark tells a story');
  });

  it('should render the bank icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-bank2'));
    expect(icon).toBeTruthy();
  });

  it('should render the geo-alt-fill background icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-geo-alt-fill'));
    expect(icon).toBeTruthy();
  });

  it('should have proper text gradient styling on heading', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    const classes = heading.nativeElement.className;
    expect(classes).toContain('bg-gradient-to-r');
    expect(classes).toContain('bg-clip-text');
    expect(classes).toContain('text-transparent');
  });

  it('should have proper section structure with relative positioning', () => {
    const container = fixture.debugElement.query(By.css('.relative.py-20'));
    expect(container).toBeTruthy();
  });

  it('should render description with muted text styling', () => {
    const paragraph = fixture.debugElement.query(By.css('.text-text-muted'));
    expect(paragraph).toBeTruthy();
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
