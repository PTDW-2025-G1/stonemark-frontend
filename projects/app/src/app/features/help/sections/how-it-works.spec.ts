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

  it('should render the section label', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('How it works');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('From Stone to Cloud');
  });

  it('should render the subtitle italic text', () => {
    const subtitle = fixture.debugElement.query(By.css('.italic'));
    expect(subtitle.nativeElement.textContent).toContain('A seamless 5-step preservation journey');
  });

  it('should render 5 steps', () => {
    const steps = fixture.debugElement.queryAll(By.css('h3'));
    expect(steps.length).toBe(5);
  });

  it('should render numbers 01 to 05', () => {
    const numbers = fixture.debugElement.queryAll(By.css('.absolute.left-0'));
    expect(numbers.length).toBe(5);
    expect(numbers[0].nativeElement.textContent.trim()).toBe('01');
    expect(numbers[1].nativeElement.textContent.trim()).toBe('02');
    expect(numbers[2].nativeElement.textContent.trim()).toBe('03');
    expect(numbers[3].nativeElement.textContent.trim()).toBe('04');
    expect(numbers[4].nativeElement.textContent.trim()).toBe('05');
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

  it('should have font-serif on all step titles', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3.font-serif'));
    expect(titles.length).toBe(5);
  });

  it('should have font-serif on numbers', () => {
    const numbers = fixture.debugElement.queryAll(By.css('.font-serif.text-xl'));
    expect(numbers.length).toBe(5);
  });

  it('should have text-primary on numbers', () => {
    const numbers = fixture.debugElement.queryAll(By.css('.text-primary.font-serif'));
    expect(numbers.length).toBe(5);
  });

  it('should not render any icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('.bi'));
    expect(icons.length).toBe(0);
  });

  it('should have step 5 span 2 columns in desktop', () => {
    const lastStep = fixture.debugElement.queryAll(By.css('.md\\:col-span-2'));
    expect(lastStep.length).toBe(1);
  });
});

