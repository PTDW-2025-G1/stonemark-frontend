import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionSectionComponent } from './mission-section';
import { MissionCardComponent } from '@shared/ui/mission-card/mission-card';
import { By } from '@angular/platform-browser';

describe('MissionSectionComponent', () => {
  let component: MissionSectionComponent;
  let fixture: ComponentFixture<MissionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionSectionComponent, MissionCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MissionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Our Mission');
  });

  it('should render the first mission paragraph with highlighted keywords', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const firstParagraph = paragraphs[0].nativeElement;

    expect(firstParagraph.textContent).toContain('cultural heritage');
    expect(firstParagraph.textContent).toContain('field data collection');
    expect(firstParagraph.textContent).toContain('digital technology');
  });

  it('should render the second mission paragraph', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const secondParagraph = paragraphs[1].nativeElement;

    expect(secondParagraph.textContent).toContain('Every stonemason mark tells a story');
    expect(secondParagraph.textContent).toContain('Stone Mark brings these stories to light');
  });

  it('should render 4 mission cards', () => {
    const cards = fixture.debugElement.queryAll(By.directive(MissionCardComponent));
    expect(cards.length).toBe(4);
  });

  it('should render Capture mission card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(MissionCardComponent));
    const captureCard = cards[0].componentInstance;

    expect(captureCard.icon).toBe('bi bi-camera');
    expect(captureCard.title).toBe('Capture');
    expect(captureCard.description).toBe('Document marks in the field');
    expect(captureCard.offset).toBeFalsy();
  });

  it('should render Discover mission card with offset', () => {
    const cards = fixture.debugElement.queryAll(By.directive(MissionCardComponent));
    const discoverCard = cards[1].componentInstance;

    expect(discoverCard.icon).toBe('bi bi-search');
    expect(discoverCard.title).toBe('Discover');
    expect(discoverCard.description).toBe('Explore historical context');
    expect(discoverCard.offset).toBe(true);
  });

  it('should render Map mission card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(MissionCardComponent));
    const mapCard = cards[2].componentInstance;

    expect(mapCard.icon).toBe('bi bi-geo-alt');
    expect(mapCard.title).toBe('Map');
    expect(mapCard.description).toBe('Geolocate monuments');
    expect(mapCard.offset).toBeFalsy();
  });

  it('should render Preserve mission card with offset', () => {
    const cards = fixture.debugElement.queryAll(By.directive(MissionCardComponent));
    const preserveCard = cards[3].componentInstance;

    expect(preserveCard.icon).toBe('bi bi-shield-check');
    expect(preserveCard.title).toBe('Preserve');
    expect(preserveCard.description).toBe('Safeguard heritage');
    expect(preserveCard.offset).toBe(true);
  });

  it('should apply offset to alternate cards (Discover and Preserve)', () => {
    const cards = fixture.debugElement.queryAll(By.directive(MissionCardComponent));

    expect(cards[0].componentInstance.offset).toBeFalsy();
    expect(cards[1].componentInstance.offset).toBe(true);
    expect(cards[2].componentInstance.offset).toBeFalsy();
    expect(cards[3].componentInstance.offset).toBe(true);
  });

  it('should have proper grid layout classes', () => {
    const mainGrid = fixture.debugElement.query(By.css('.grid.grid-cols-1.lg\\:grid-cols-2'));
    expect(mainGrid).toBeTruthy();

    const cardsGrid = fixture.debugElement.query(By.css('.grid.grid-cols-2'));
    expect(cardsGrid).toBeTruthy();
  });

  it('should have proper section structure with padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('py-16');
    expect(classes).toContain('sm:py-20');
    expect(classes).toContain('lg:py-28');
  });

  it('should have strong tags for highlighted text', () => {
    const strongTags = fixture.debugElement.queryAll(By.css('strong'));
    expect(strongTags.length).toBe(3);

    expect(strongTags[0].nativeElement.textContent).toBe('cultural heritage');
    expect(strongTags[1].nativeElement.textContent).toBe('field data collection');
    expect(strongTags[2].nativeElement.textContent).toBe('digital technology');
  });
});
