import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnescoSectionComponent } from './unesco-section';
import { HighlightCardComponent } from '@shared/ui/highlight-card/highlight-card';
import { By } from '@angular/platform-browser';

describe('UnescoSectionComponent', () => {
  let component: UnescoSectionComponent;
  let fixture: ComponentFixture<UnescoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnescoSectionComponent, HighlightCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UnescoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section badge with correct text', () => {
    const badge = fixture.debugElement.query(By.css('.bg-black\\/10'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('Global Initiative');
  });

  it('should render globe icon in badge', () => {
    const icon = fixture.debugElement.query(By.css('.bi-globe'));
    expect(icon).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Partnering with UNESCO');
  });

  it('should render UNESCO partnership description', () => {
    const description = fixture.debugElement.query(By.css('.text-lg.sm\\:text-xl'));
    expect(description.nativeElement.textContent).toContain('Stone Mark is being developed in collaboration with UNESCO');
    expect(description.nativeElement.textContent).toContain('world heritage sites');
  });

  it('should render 4 highlight cards', () => {
    const cards = fixture.debugElement.queryAll(By.directive(HighlightCardComponent));
    expect(cards.length).toBe(4);
  });

  it('should render UNESCO Partnership card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(HighlightCardComponent));
    const partnershipCard = cards[0].componentInstance;

    expect(partnershipCard.icon).toBe('bi bi-award');
    expect(partnershipCard.title).toBe('UNESCO Partnership');
    expect(partnershipCard.description).toBe('Official collaboration for heritage preservation');
  });

  it('should render Global Expansion card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(HighlightCardComponent));
    const expansionCard = cards[1].componentInstance;

    expect(expansionCard.icon).toBe('bi bi-globe2');
    expect(expansionCard.title).toBe('Global Expansion');
    expect(expansionCard.description).toBe('Deployment across multiple countries');
  });

  it('should render Cultural Impact card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(HighlightCardComponent));
    const impactCard = cards[2].componentInstance;

    expect(impactCard.icon).toBe('bi bi-people');
    expect(impactCard.title).toBe('Cultural Impact');
    expect(impactCard.description).toBe('Empowering millions to connect with heritage');
  });

  it('should render Sustainable Growth card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(HighlightCardComponent));
    const growthCard = cards[3].componentInstance;

    expect(growthCard.icon).toBe('bi bi-graph-up');
    expect(growthCard.title).toBe('Sustainable Growth');
    expect(growthCard.description).toBe('Built for scale with proven architecture');
  });

  it('should have proper grid layout classes', () => {
    const grid = fixture.debugElement.query(By.css('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4'));
    expect(grid).toBeTruthy();
  });

  it('should have proper section structure with padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-16');
    expect(classes).toContain('sm:py-20');
    expect(classes).toContain('lg:py-28');
  });

  it('should have white background', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section.nativeElement.className).toContain('bg-white');
  });

  it('should have overflow hidden', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section.nativeElement.className).toContain('overflow-hidden');
  });

  it('should center content text', () => {
    const centerDiv = fixture.debugElement.query(By.css('.text-center'));
    expect(centerDiv).toBeTruthy();
  });

  it('should have badge with backdrop blur', () => {
    const badge = fixture.debugElement.query(By.css('.backdrop-blur-sm'));
    expect(badge).toBeTruthy();
  });

  it('should have rounded badge', () => {
    const badge = fixture.debugElement.query(By.css('.rounded-full'));
    expect(badge).toBeTruthy();
  });

  it('should have uppercase tracking wider text in badge', () => {
    const badgeText = fixture.debugElement.query(By.css('.uppercase.tracking-wider'));
    expect(badgeText.nativeElement.textContent.trim()).toBe('Global Initiative');
  });

  it('should have proper heading font classes', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    const classes = heading.nativeElement.className;

    expect(classes).toContain('font-serif');
    expect(classes).toContain('font-bold');
  });

  it('should have max width constraint on description', () => {
    const description = fixture.debugElement.query(By.css('.max-w-3xl'));
    expect(description).toBeTruthy();
  });
});
