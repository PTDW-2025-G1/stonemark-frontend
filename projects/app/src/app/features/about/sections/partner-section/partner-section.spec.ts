import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerSectionComponent } from './partner-section';
import { By } from '@angular/platform-browser';

describe('PartnerSectionComponent', () => {
  let component: PartnerSectionComponent;
  let fixture: ComponentFixture<PartnerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section label', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('Institutional Partner');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Working with APRUPP');
  });

  it('should render APRUPP title', () => {
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.textContent.trim()).toBe('APRUPP');
  });

  it('should render APRUPP full name', () => {
    const fullName = fixture.debugElement.query(By.css('.text-primary.font-semibold'));
    expect(fullName.nativeElement.textContent.trim()).toBe('Portuguese Association for Urban Rehabilitation and Heritage Protection');
  });

  it('should render APRUPP description paragraph', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p.text-text-muted'));
    const description = paragraphs[0];
    expect(description.nativeElement.textContent).toContain('Founded in 2012');
    expect(description.nativeElement.textContent).toContain('non-profit association');
  });

  it('should render statistics with border-top', () => {
    const statsGrid = fixture.debugElement.query(By.css('.grid.grid-cols-3.gap-6.border-t'));
    expect(statsGrid).toBeTruthy();
  });

  it('should render statistic labels', () => {
    const labels = fixture.debugElement.queryAll(By.css('.text-sm.text-text-muted'));

    expect(labels[0].nativeElement.textContent.trim()).toBe('Founded');
    expect(labels[1].nativeElement.textContent.trim()).toBe('Headquarters');
    expect(labels[2].nativeElement.textContent.trim()).toBe('Reach');
  });

  it('should render statistic values in serif font', () => {
    const values = fixture.debugElement.queryAll(By.css('.font-serif.font-bold'));
    expect(values.length).toBeGreaterThanOrEqual(3);
  });

  it('should render APRUPP logo image', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image).toBeTruthy();
    expect(image.nativeElement.getAttribute('src')).toBe('assets/images/aprupp.png');
    expect(image.nativeElement.getAttribute('alt')).toBe('APRUPP logo');
  });

  it('should have logo with object-contain', () => {
    const image = fixture.debugElement.query(By.css('img.object-contain'));
    expect(image).toBeTruthy();
  });

  it('should render 4 pillars with border-top', () => {
    const pillars = fixture.debugElement.queryAll(By.css('.border-t.border-primary.pt-6'));
    expect(pillars.length).toBe(4);
  });

  it('should render Heritage Protection pillar', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles[0].nativeElement.textContent.trim()).toBe('Heritage Protection');
  });

  it('should render Urban Rehabilitation pillar', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles[1].nativeElement.textContent.trim()).toBe('Urban Rehabilitation');
  });

  it('should render Civic Participation pillar', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles[2].nativeElement.textContent.trim()).toBe('Civic Participation');
  });

  it('should render Knowledge & Innovation pillar', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles[3].nativeElement.textContent.trim()).toBe('Knowledge & Innovation');
  });

  it('should have proper grid layout for content and image', () => {
    const mainGrid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-2'));
    expect(mainGrid).toBeTruthy();
  });

  it('should have proper grid layout for pillars', () => {
    const pillarsGrid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4'));
    expect(pillarsGrid).toBeTruthy();
  });

  it('should have proper section structure with padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
  });

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have centered text in header', () => {
    const textCenter = fixture.debugElement.query(By.css('.text-center'));
    expect(textCenter).toBeTruthy();
  });

  it('should have font-serif on headings', () => {
    const h2 = fixture.debugElement.query(By.css('h2'));
    const h3 = fixture.debugElement.query(By.css('h3'));

    expect(h2.nativeElement.className).toContain('font-serif');
    expect(h3.nativeElement.className).toContain('font-serif');
  });
});
