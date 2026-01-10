import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnescoSectionComponent } from './unesco-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('UnescoSectionComponent', () => {
  let component: UnescoSectionComponent;
  let fixture: ComponentFixture<UnescoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UnescoSectionComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UnescoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section container with padding and border', () => {
    const section = fixture.debugElement.query(
      By.css('section.border-t.border-border')
    );
    expect(section).toBeTruthy();

    const classes = section.nativeElement.className;
    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
    expect(classes).toContain('max-w-7xl');
  });

  it('should render centered header container', () => {
    const header = fixture.debugElement.query(By.css('.text-center'));
    expect(header).toBeTruthy();
  });

  it('should render section label element', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
  });

  it('should render main heading with serif font', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should render description paragraph in header', () => {
    const paragraph = fixture.debugElement.query(
      By.css('.text-center p.text-text-muted')
    );
    expect(paragraph).toBeTruthy();
  });

  it('should render cards grid layout', () => {
    const grid = fixture.debugElement.query(
      By.css('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4')
    );
    expect(grid).toBeTruthy();
  });

  it('should render four cards', () => {
    const cards = fixture.debugElement.queryAll(
      By.css('.border-t.border-primary.pt-6')
    );
    expect(cards.length).toBe(4);
  });

  it('should render card icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('.bi'));
    expect(icons.length).toBe(4);
  });

  it('should render specific icons for each card', () => {
    expect(fixture.debugElement.query(By.css('.bi-award'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.bi-globe2'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.bi-people'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.bi-graph-up'))).toBeTruthy();
  });

  it('should render card titles with serif font', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4.font-serif'));
    expect(titles.length).toBe(4);
  });

  it('should apply text-primary color to icon containers', () => {
    const iconContainers = fixture.debugElement.queryAll(By.css('.text-primary'));
    expect(iconContainers.length).toBeGreaterThanOrEqual(4);
  });
});
