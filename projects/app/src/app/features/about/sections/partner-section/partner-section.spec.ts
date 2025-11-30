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

  it('should render the section badge with correct text', () => {
    const badge = fixture.debugElement.query(By.css('.bg-primary\\/10'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('Partner');
  });

  it('should render building icon in badge', () => {
    const icon = fixture.debugElement.query(By.css('.bi-building'));
    expect(icon).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Institutional Partner');
  });

  it('should render APRUPP title', () => {
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.textContent.trim()).toBe('APRUPP');
  });

  it('should render APRUPP full name', () => {
    const fullName = fixture.debugElement.query(By.css('h3 + .text-primary.font-semibold'));
    expect(fullName.nativeElement.textContent.trim()).toBe('Portuguese Association for Urban Rehabilitation and Heritage Protection');
  });

  it('should render APRUPP description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('.text-text-muted.leading-relaxed'));
    expect(paragraph.nativeElement.textContent).toContain('Founded in 2012');
    expect(paragraph.nativeElement.textContent).toContain('non-profit association');
  });

  it('should render statistic labels', () => {
    const labels = fixture.debugElement.queryAll(By.css('.text-sm.text-text-muted'));
    const statLabels = Array.from(labels).slice(0, 3);

    expect(statLabels[0].nativeElement.textContent.trim()).toBe('Founded');
    expect(statLabels[1].nativeElement.textContent.trim()).toBe('Headquarters');
    expect(statLabels[2].nativeElement.textContent.trim()).toBe('Reach');
  });

  it('should render "Learn More About APRUPP" link', () => {
    const link = fixture.debugElement.query(By.css('a.bg-primary'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Learn More About APRUPP');
  });

  it('should render arrow icon in CTA button', () => {
    const arrow = fixture.debugElement.query(By.css('.bi-arrow-right'));
    expect(arrow).toBeTruthy();
  });

  it('should render 4 pillars', () => {
    const pillars = fixture.debugElement.queryAll(By.css('.flex.gap-4'));
    expect(pillars.length).toBe(4);
  });

  it('should render Heritage Protection pillar', () => {
    const pillars = fixture.debugElement.queryAll(By.css('.flex.gap-4'));
    const heritagePillar = pillars[0];

    const icon = heritagePillar.query(By.css('.bi-shield-check'));
    const title = heritagePillar.query(By.css('h4'));
    const description = heritagePillar.query(By.css('p.text-sm'));

    expect(icon).toBeTruthy();
    expect(title.nativeElement.textContent.trim()).toBe('Heritage Protection');
    expect(description.nativeElement.textContent).toContain('Safeguarding built heritage');
  });

  it('should render Urban Rehabilitation pillar', () => {
    const pillars = fixture.debugElement.queryAll(By.css('.flex.gap-4'));
    const urbanPillar = pillars[1];

    const icon = urbanPillar.query(By.css('.bi-buildings'));
    const title = urbanPillar.query(By.css('h4'));

    expect(icon).toBeTruthy();
    expect(title.nativeElement.textContent.trim()).toBe('Urban Rehabilitation');
  });

  it('should render Civic Participation pillar', () => {
    const pillars = fixture.debugElement.queryAll(By.css('.flex.gap-4'));
    const civicPillar = pillars[2];

    const icon = civicPillar.query(By.css('.bi-people'));
    const title = civicPillar.query(By.css('h4'));

    expect(icon).toBeTruthy();
    expect(title.nativeElement.textContent.trim()).toBe('Civic Participation');
  });

  it('should render Knowledge & Innovation pillar', () => {
    const pillars = fixture.debugElement.queryAll(By.css('.flex.gap-4'));
    const knowledgePillar = pillars[3];

    const icon = knowledgePillar.query(By.css('.bi-lightbulb'));
    const title = knowledgePillar.query(By.css('h4'));

    expect(icon).toBeTruthy();
    expect(title.nativeElement.textContent.trim()).toBe('Knowledge & Innovation');
  });

  it('should have proper grid layout classes', () => {
    const grid = fixture.debugElement.query(By.css('.grid.grid-cols-1.lg\\:grid-cols-5'));
    expect(grid).toBeTruthy();
  });

  it('should have left content section with 3 columns span', () => {
    const leftSection = fixture.debugElement.query(By.css('.lg\\:col-span-3'));
    expect(leftSection).toBeTruthy();
  });

  it('should have right pillars section with 2 columns span', () => {
    const rightSection = fixture.debugElement.query(By.css('.lg\\:col-span-2'));
    expect(rightSection).toBeTruthy();
  });

  it('should have proper section structure with padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-16');
    expect(classes).toContain('sm:py-20');
    expect(classes).toContain('lg:py-28');
  });

  it('should have gradient background on main card', () => {
    const card = fixture.debugElement.query(By.css('.bg-gradient-to-br.from-surface-alt'));
    expect(card).toBeTruthy();
  });

  it('should have gradient background on pillars section', () => {
    const pillarsSection = fixture.debugElement.query(By.css('.bg-gradient-to-br.from-primary\\/5'));
    expect(pillarsSection).toBeTruthy();
  });
});
