import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionSectionComponent } from './mission-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('MissionSectionComponent', () => {
  let component: MissionSectionComponent;
  let fixture: ComponentFixture<MissionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MissionSectionComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MissionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render outer section with border top', () => {
    const section = fixture.debugElement.query(By.css('.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should render main grid layout', () => {
    const grid = fixture.debugElement.query(
      By.css('.grid.grid-cols-1.md\\:grid-cols-2')
    );
    expect(grid).toBeTruthy();
  });

  it('should render text content container', () => {
    const content = fixture.debugElement.query(By.css('.p-12.md\\:p-24'));
    expect(content).toBeTruthy();
  });

  it('should render label element', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
  });

  it('should render heading element', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading).toBeTruthy();
  });

  it('should render two paragraph elements', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBe(2);
  });

  it('should render image element', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image).toBeTruthy();
  });

  it('should render image with correct source', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.getAttribute('src')).toBe('assets/images/about_1.webp');
  });

  it('should apply visual effects to image', () => {
    const image = fixture.debugElement.query(By.css('img'));
    const classes = image.nativeElement.className;

    expect(classes).toContain('grayscale');
    expect(classes).toContain('hover:grayscale-0');
    expect(classes).toContain('mix-blend-multiply');
  });

  it('should render image container with muted background', () => {
    const container = fixture.debugElement.query(By.css('.bg-surface-muted'));
    expect(container).toBeTruthy();
  });

  it('should have split layout with two main columns', () => {
    const grid = fixture.debugElement.query(
      By.css('.grid.grid-cols-1.md\\:grid-cols-2')
    );
    expect(grid.nativeElement.children.length).toBe(2);
  });

  it('should use serif font on heading', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });
});

