import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowItWorksComponent } from './how-it-works';
import { By } from '@angular/platform-browser';

describe('HowItWorksComponent', () => {
  let component: HowItWorksComponent;
  let fixture: ComponentFixture<HowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('How It Works');
  });

  it('should render the section description', () => {
    const description = fixture.debugElement.query(By.css('.text-xl.text-text-muted'));
    expect(description.nativeElement.textContent).toContain('From discovery to preservation');
  });

  it('should render 5 steps', () => {
    const steps = fixture.debugElement.queryAll(By.css('h3'));
    expect(steps.length).toBe(5);
  });

  it('should render Step 1: Upload Your Photo', () => {
    const stepHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(stepHeadings[0].nativeElement.textContent.trim()).toBe('Upload Your Photo');
  });

  it('should render Step 2: Smart Recognition', () => {
    const stepHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(stepHeadings[1].nativeElement.textContent.trim()).toBe('Smart Recognition');
  });

  it('should render Step 3: Review & Confirm', () => {
    const stepHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(stepHeadings[2].nativeElement.textContent.trim()).toBe('Review & Confirm');
  });

  it('should render Step 4: Instant Evaluation', () => {
    const stepHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(stepHeadings[3].nativeElement.textContent.trim()).toBe('Instant Evaluation');
  });

  it('should render Step 5: Published & Preserved', () => {
    const stepHeadings = fixture.debugElement.queryAll(By.css('h3'));
    expect(stepHeadings[4].nativeElement.textContent.trim()).toBe('Published & Preserved');
  });

  it('should render step number indicators', () => {
    const stepNumbers = fixture.debugElement.queryAll(By.css('.w-16.h-16.rounded-full'));
    expect(stepNumbers.length).toBe(5);
  });

  it('should render cloud-arrow-up icon for upload step', () => {
    const icon = fixture.debugElement.query(By.css('.bi-cloud-arrow-up'));
    expect(icon).toBeTruthy();
  });

  it('should render stars icon for smart recognition step', () => {
    const icon = fixture.debugElement.query(By.css('.bi-stars'));
    expect(icon).toBeTruthy();
  });

  it('should render check2-circle icon for review step', () => {
    const icon = fixture.debugElement.query(By.css('.bi-check2-circle'));
    expect(icon).toBeTruthy();
  });

  it('should render robot icon for evaluation step', () => {
    const icon = fixture.debugElement.query(By.css('.bi-robot'));
    expect(icon).toBeTruthy();
  });

  it('should render rocket-takeoff icon for published step', () => {
    const icon = fixture.debugElement.query(By.css('.bi-rocket-takeoff'));
    expect(icon).toBeTruthy();
  });

  it('should have gradient timeline on desktop', () => {
    const timeline = fixture.debugElement.query(By.css('.bg-gradient-to-b'));
    expect(timeline).toBeTruthy();
  });

  it('should render Auto GPS Detection tag in upload step', () => {
    const tags = fixture.debugElement.queryAll(By.css('.rounded-full.text-sm'));
    const tagTexts = tags.map(t => t.nativeElement.textContent);
    expect(tagTexts.some(t => t.includes('Auto GPS Detection'))).toBe(true);
  });

  it('should render Pattern Matching tag in smart recognition step', () => {
    const tags = fixture.debugElement.queryAll(By.css('.rounded-full.text-sm'));
    const tagTexts = tags.map(t => t.nativeElement.textContent);
    expect(tagTexts.some(t => t.includes('Pattern Matching'))).toBe(true);
  });

  it('should render Instant Results tag in smart recognition step', () => {
    const tags = fixture.debugElement.queryAll(By.css('.rounded-full.text-sm'));
    const tagTexts = tags.map(t => t.nativeElement.textContent);
    expect(tagTexts.some(t => t.includes('Instant Results'))).toBe(true);
  });

  it('should render Edit Suggestions tag in review step', () => {
    const tags = fixture.debugElement.queryAll(By.css('.rounded-full.text-sm'));
    const tagTexts = tags.map(t => t.nativeElement.textContent);
    expect(tagTexts.some(t => t.includes('Edit Suggestions'))).toBe(true);
  });

  it('should render Quality Check tag in evaluation step', () => {
    const tags = fixture.debugElement.queryAll(By.css('.rounded-full.text-sm'));
    const tagTexts = tags.map(t => t.nativeElement.textContent);
    expect(tagTexts.some(t => t.includes('Quality Check'))).toBe(true);
  });

  it('should render Expert Review tag in evaluation step', () => {
    const tags = fixture.debugElement.queryAll(By.css('.rounded-full.text-sm'));
    const tagTexts = tags.map(t => t.nativeElement.textContent);
    expect(tagTexts.some(t => t.includes('Expert Review'))).toBe(true);
  });

  it('should render Instant Notification tag in published step', () => {
    const tags = fixture.debugElement.queryAll(By.css('.rounded-full.text-sm'));
    const tagTexts = tags.map(t => t.nativeElement.textContent);
    expect(tagTexts.some(t => t.includes('Instant Notification'))).toBe(true);
  });

  it('should have proper card styling with shadow', () => {
    const cards = fixture.debugElement.queryAll(By.css('.shadow-lg'));
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should have hover shadow transition on step cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.hover\\:shadow-xl'));
    expect(cards.length).toBeGreaterThan(0);
  });
});
