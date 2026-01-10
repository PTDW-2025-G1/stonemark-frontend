import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacySectionComponent } from './privacy-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('PrivacySectionComponent', () => {
  let component: PrivacySectionComponent;
  let fixture: ComponentFixture<PrivacySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PrivacySectionComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main section container', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
  });

  it('should render the header area', () => {
    const header = fixture.debugElement.query(By.css('.text-center'));
    expect(header).toBeTruthy();
  });

  it('should render "What We Store" grid with 3 items', () => {
    const grids = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1.md\\:grid-cols-3'));
    expect(grids.length).toBeGreaterThanOrEqual(1);

    const items = grids[0].queryAll(By.css('.border-l-2'));
    expect(items.length).toBe(3);
  });

  it('should render "Your Rights" grid with 3 items', () => {
    const grids = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1.md\\:grid-cols-3'));
    expect(grids.length).toBeGreaterThanOrEqual(2);

    const items = grids[1].queryAll(By.css('.border-l-2'));
    expect(items.length).toBe(3);
  });

  it('should apply border and hover styles to list items', () => {
    const items = fixture.debugElement.queryAll(By.css('.border-l-2.border-border'));
    expect(items.length).toBe(6);

    const hoverItems = fixture.debugElement.queryAll(By.css('.hover\\:border-primary'));
    expect(hoverItems.length).toBe(6);
  });

  it('should render the promise section', () => {
    const card = fixture.debugElement.query(By.css('.bg-surface-alt.border.border-border'));
    expect(card).toBeTruthy();
  });

  it('should render exactly 3 section headings', () => {
    const headings = fixture.debugElement.queryAll(By.css('h3.font-serif'));
    expect(headings.length).toBe(3);
  });

  it('should have proper section padding and border', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
    expect(classes).toContain('border-t');
  });
});
