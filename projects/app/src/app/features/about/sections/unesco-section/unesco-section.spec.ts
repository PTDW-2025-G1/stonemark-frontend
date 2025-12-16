import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnescoSectionComponent } from './unesco-section';
import { By } from '@angular/platform-browser';

describe('UnescoSectionComponent', () => {
  let component: UnescoSectionComponent;
  let fixture: ComponentFixture<UnescoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnescoSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UnescoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section label', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('Global Initiative');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Partnering with UNESCO');
  });

  it('should render UNESCO partnership description', () => {
    const paragraph = fixture.debugElement.query(By.css('.text-center p'));
    expect(paragraph.nativeElement.textContent).toContain('Stone Mark is being developed in collaboration with UNESCO');
    expect(paragraph.nativeElement.textContent).toContain('world heritage sites');
  });

  it('should render 4 cards with border-top', () => {
    const cards = fixture.debugElement.queryAll(By.css('.border-t.border-primary.pt-6'));
    expect(cards.length).toBe(4);
  });

  it('should render UNESCO Partnership card', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles[0].nativeElement.textContent.trim()).toBe('UNESCO Partnership');
  });

  it('should render Global Expansion card', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles[1].nativeElement.textContent.trim()).toBe('Global Expansion');
  });

  it('should render Cultural Impact card', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles[2].nativeElement.textContent.trim()).toBe('Cultural Impact');
  });

  it('should render Sustainable Growth card', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles[3].nativeElement.textContent.trim()).toBe('Sustainable Growth');
  });

  it('should have proper grid layout for cards', () => {
    const cardsGrid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4'));
    expect(cardsGrid).toBeTruthy();
  });

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have centered text in header', () => {
    const textCenter = fixture.debugElement.query(By.css('.text-center'));
    expect(textCenter).toBeTruthy();
  });

  it('should have font-serif on heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should have font-serif on all card titles', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4.font-serif'));
    expect(titles.length).toBe(4);
  });

  it('should render icons for all cards', () => {
    const icons = fixture.debugElement.queryAll(By.css('.bi'));
    expect(icons.length).toBe(4);
  });

  it('should render award icon for UNESCO Partnership card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-award'));
    expect(icon).toBeTruthy();
  });

  it('should render globe icon for Global Expansion card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-globe2'));
    expect(icon).toBeTruthy();
  });

  it('should render people icon for Cultural Impact card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-people'));
    expect(icon).toBeTruthy();
  });

  it('should render graph icon for Sustainable Growth card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-graph-up'));
    expect(icon).toBeTruthy();
  });

  it('should have proper section padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;
    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
  });

  it('should have max-width constraint', () => {
    const section = fixture.debugElement.query(By.css('section.max-w-7xl'));
    expect(section).toBeTruthy();
  });

  it('should have text-primary on icons', () => {
    const iconContainers = fixture.debugElement.queryAll(By.css('.text-primary'));
    expect(iconContainers.length).toBeGreaterThanOrEqual(4);
  });
});
