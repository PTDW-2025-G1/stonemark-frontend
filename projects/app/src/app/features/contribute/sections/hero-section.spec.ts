import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroSectionComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section container', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
  });

  it('should render the badge element', () => {
    const badge = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(badge).toBeTruthy();
  });

  it('should render the main heading element', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
  });

  it('should apply serif font to the heading', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should render the description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p.text-text-muted'));
    expect(paragraph).toBeTruthy();
  });

  it('should have centered text layout', () => {
    const container = fixture.debugElement.query(By.css('.text-center'));
    expect(container).toBeTruthy();
  });

  it('should have proper padding classes on section', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('pt-32');
    expect(classes).toContain('pb-20');
  });

  it('should have max-width constraint on container', () => {
    const container = fixture.debugElement.query(By.css('.max-w-4xl'));
    expect(container).toBeTruthy();
  });

  it('should not render any icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('.bi'));
    expect(icons.length).toBe(0);
  });
});
