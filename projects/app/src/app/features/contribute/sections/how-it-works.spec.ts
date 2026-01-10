import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowItWorksComponent } from './how-it-works';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('HowItWorksComponent', () => {
  let component: HowItWorksComponent;
  let fixture: ComponentFixture<HowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HowItWorksComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main section', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
  });

  it('should render the header area', () => {
    const header = fixture.debugElement.query(By.css('.text-center'));
    expect(header).toBeTruthy();
  });

  it('should render the steps grid', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    expect(grid).toBeTruthy();
  });

  it('should render 4 step cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.rounded-2xl'));
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it('should render step numbers from 1 to 14', () => {
    const numbers = fixture.debugElement.queryAll(By.css('.rounded-full'));
    expect(numbers.length).toBe(14);
  });

  it('should render desktop image showcase', () => {
    const desktop = fixture.debugElement.query(By.css('.hidden.md\\:block'));
    expect(desktop).toBeTruthy();

    const img = desktop.query(By.css('img'));
    expect(img).toBeTruthy();
  });

  it('should render mobile image showcase with 3 images', () => {
    const mobile = fixture.debugElement.query(By.css('.md\\:hidden'));
    expect(mobile).toBeTruthy();

    const images = mobile.queryAll(By.css('img'));
    expect(images.length).toBe(3);
  });

  it('should render the detailed guide section', () => {
    const guideHeading = fixture.debugElement.query(By.css('h3'));
    expect(guideHeading).toBeTruthy();
  });

  it('should render 9 detailed steps', () => {
    const steps = fixture.debugElement.queryAll(By.css('h4'));
    expect(steps.length).toBe(9);
  });

  it('should apply proper grid layout classes to steps grid', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    const classes = grid.nativeElement.className;

    expect(classes).toContain('grid-cols-1');
    expect(classes).toContain('md:grid-cols-2');
    expect(classes).toContain('lg:grid-cols-4');
  });
});
