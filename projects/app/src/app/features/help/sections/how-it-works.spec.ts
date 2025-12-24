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
    expect(label.nativeElement.textContent.trim()).toContain('Simple Contribution');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('History in Your Pocket');
  });

  it('should render 4 main steps cards', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    const steps = grid.queryAll(By.css('h3'));
    expect(steps.length).toBe(4);
  });

  it('should render Step 1: Connect', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    const stepHeadings = grid.queryAll(By.css('h3'));
    expect(stepHeadings[0].nativeElement.textContent.trim()).toBe('Connect');
  });

  it('should render Step 2: Snap & Share', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    const stepHeadings = grid.queryAll(By.css('h3'));
    expect(stepHeadings[1].nativeElement.textContent.trim()).toBe('Snap & Share');
  });

  it('should render Step 3: Pin Location', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    const stepHeadings = grid.queryAll(By.css('h3'));
    expect(stepHeadings[2].nativeElement.textContent.trim()).toBe('Pin Location');
  });

  it('should render Step 4: Confirm', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    const stepHeadings = grid.queryAll(By.css('h3'));
    expect(stepHeadings[3].nativeElement.textContent.trim()).toBe('Confirm');
  });

  it('should render desktop image showcase', () => {
    const desktopImageContainer = fixture.debugElement.query(By.css('.hidden.md\\:block'));
    expect(desktopImageContainer).toBeTruthy();
    const img = desktopImageContainer.query(By.css('img'));
    expect(img.attributes['src']).toContain('captureMark.png');
  });

  it('should render mobile image showcase', () => {
    const mobileImageContainer = fixture.debugElement.query(By.css('.md\\:hidden'));
    expect(mobileImageContainer).toBeTruthy();
    const images = mobileImageContainer.queryAll(By.css('img'));
    expect(images.length).toBe(3);
    expect(images[0].attributes['src']).toContain('captureMarkMobile1.png');
    expect(images[1].attributes['src']).toContain('captureMarkMobile2.png');
    expect(images[2].attributes['src']).toContain('captureMarkMobile3.png');
  });

  it('should have proper grid layout for steps', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    expect(grid).toBeTruthy();
    expect(grid.classes['grid-cols-1']).toBe(true);
    expect(grid.classes['md:grid-cols-2']).toBe(true);
    expect(grid.classes['lg:grid-cols-4']).toBe(true);
  });

  it('should render "The Complete Journey" section', () => {
    const headings = fixture.debugElement.queryAll(By.css('h3'));
    const journeyHeading = headings.find(h => h.nativeElement.textContent.includes('The Complete Journey'));
    expect(journeyHeading).toBeTruthy();
  });

  it('should render 9 detailed steps', () => {
    const detailedSteps = fixture.debugElement.queryAll(By.css('h4'));
    expect(detailedSteps.length).toBe(9);
  });

  it('should render the first detailed step "Secure Authentication"', () => {
    const detailedSteps = fixture.debugElement.queryAll(By.css('h4'));
    expect(detailedSteps[0].nativeElement.textContent).toContain('Secure Authentication');
  });

  it('should render the last detailed step "Confirmation"', () => {
    const detailedSteps = fixture.debugElement.queryAll(By.css('h4'));
    expect(detailedSteps[8].nativeElement.textContent).toContain('Confirmation');
  });
});
