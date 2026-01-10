import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustIndicatorsComponent } from './trust-indicators';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('TrustIndicatorsComponent', () => {
  let component: TrustIndicatorsComponent;
  let fixture: ComponentFixture<TrustIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TrustIndicatorsComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrustIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 trust indicator cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.border-t.border-primary'));
    expect(cards.length).toBe(3);
  });

  it('should have proper grid layout for cards', () => {
    const grid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-3'));
    expect(grid).toBeTruthy();
  });

  it('should render 3 card titles with serif font', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4.font-serif'));
    expect(titles.length).toBe(3);
  });

  it('should render 3 card descriptions with small text', () => {
    const descriptions = fixture.debugElement.queryAll(By.css('p.text-sm'));
    expect(descriptions.length).toBe(3);
  });

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have proper section padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-16');
    expect(classes).toContain('px-6');
  });

  it('should not render any icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('.bi'));
    expect(icons.length).toBe(0);
  });
});
