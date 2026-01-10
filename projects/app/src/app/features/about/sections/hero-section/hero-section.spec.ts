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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section container', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
  });

  it('should render centered content container', () => {
    const container = fixture.debugElement.query(By.css('.text-center'));
    expect(container).toBeTruthy();
  });

  it('should render badge element', () => {
    const badge = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(badge).toBeTruthy();
  });

  it('should render main heading element', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
  });

  it('should render subtitle paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p.text-text-muted'));
    expect(paragraph).toBeTruthy();
  });

  it('should use serif font on heading', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should have padding classes on section', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('pt-32');
    expect(classes).toContain('pb-20');
  });

  it('should not render buttons or links', () => {
    expect(fixture.debugElement.queryAll(By.css('button')).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css('a')).length).toBe(0);
  });

  it('should not render images', () => {
    expect(fixture.debugElement.queryAll(By.css('img')).length).toBe(0);
  });
});
