import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesSectionComponent } from './features-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateFakeLoader} from '@test/translate-fake-loader';

describe('FeaturesSectionComponent', () => {
  let component: FeaturesSectionComponent;
  let fixture: ComponentFixture<FeaturesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeaturesSectionComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section container', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
  });

  it('should render header block', () => {
    const header = fixture.debugElement.query(By.css('.text-center'));
    expect(header).toBeTruthy();
  });

  it('should render 6 feature blocks', () => {
    const features = fixture.debugElement.queryAll(By.css('.relative.pl-8'));
    expect(features.length).toBe(6);
  });

  it('should render numbers 01 to 06', () => {
    const numbers = fixture.debugElement.queryAll(By.css('.absolute.left-0'));
    const values = numbers.map(n => n.nativeElement.textContent.trim());

    expect(values).toEqual(['01', '02', '03', '04', '05', '06']);
  });

  it('should render 6 feature titles', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3.font-serif'));
    expect(titles.length).toBe(6);
  });

  it('should use grid layout', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    expect(grid).toBeTruthy();
  });

  it('should have padding and border on section', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
    expect(classes).toContain('border-t');
  });

});
