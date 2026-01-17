import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerSectionComponent } from './partner-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('PartnerSectionComponent', () => {
  let component: PartnerSectionComponent;
  let fixture: ComponentFixture<PartnerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PartnerSectionComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section container with padding and border', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();

    const classes = section.nativeElement.className;
    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
  });

  it('should render centered header', () => {
    const header = fixture.debugElement.query(By.css('.text-center'));
    expect(header).toBeTruthy();
  });

  it('should render section label element', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
  });

  it('should render main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should render main content grid', () => {
    const grid = fixture.debugElement.query(
      By.css('.grid.grid-cols-1.md\\:grid-cols-2')
    );
    expect(grid).toBeTruthy();
  });

  it('should render partner info block', () => {
    const title = fixture.debugElement.query(By.css('h3'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.className).toContain('font-serif');
  });

  it('should render statistics grid', () => {
    const statsGrid = fixture.debugElement.query(
      By.css('.grid.grid-cols-3.gap-6.border-t')
    );
    expect(statsGrid).toBeTruthy();
  });

  it('should render four statistic items', () => {
    const values = fixture.debugElement.queryAll(By.css('.text-3xl.font-serif'));
    expect(values.length).toBe(4);
  });

  it('should render image container', () => {
    const container = fixture.debugElement.query(
      By.css('.aspect-square.bg-surface.border')
    );
    expect(container).toBeTruthy();
  });

  it('should render partner logo image', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image).toBeTruthy();
    expect(image.nativeElement.getAttribute('src')).toBe('assets/images/aprupp.webp');
  });

  it('should render pillars grid', () => {
    const grid = fixture.debugElement.query(
      By.css('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4')
    );
    expect(grid).toBeTruthy();
  });

  it('should render four pillars', () => {
    const pillars = fixture.debugElement.queryAll(
      By.css('.border-t.border-primary.pt-6')
    );
    expect(pillars.length).toBe(4);
  });

  it('should render pillar headings with serif font', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4.font-serif'));
    expect(titles.length).toBe(4);
  });
});
