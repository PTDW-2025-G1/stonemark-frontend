import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtaSectionComponent } from './cta-section';
import { By } from '@angular/platform-browser';

describe('CtaSectionComponent', () => {
  let component: CtaSectionComponent;
  let fixture: ComponentFixture<CtaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CtaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Join Us in Preserving History');
  });

  it('should render the description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph.nativeElement.textContent).toContain('Be part of a global movement');
  });

  it('should have a link to search monuments', () => {
    const link = fixture.debugElement.query(By.css('a[href="/search/monuments"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Start Exploring');
  });

  it('should have a link to contact page', () => {
    const link = fixture.debugElement.query(By.css('a[href="/contact"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Get in Touch');
  });

  it('should apply primary button styles to Start Exploring link', () => {
    const link = fixture.debugElement.query(By.css('a[href="/search/monuments"]'));
    const classes = link.nativeElement.className;
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('text-primary-foreground');
  });

  it('should apply secondary button styles to Get in Touch link', () => {
    const link = fixture.debugElement.query(By.css('a[href="/contact"]'));
    const classes = link.nativeElement.className;
    expect(classes).toContain('bg-surface-alt');
    expect(classes).toContain('border-2');
  });

  it('should render both action buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('a'));
    expect(buttons.length).toBe(2);
  });

  it('should have proper section structure', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.className).toContain('py-16');
  });
});
