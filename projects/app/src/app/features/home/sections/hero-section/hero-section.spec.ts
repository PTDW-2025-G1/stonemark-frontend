import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading.nativeElement.textContent).toContain('Uncover the history');
    expect(heading.nativeElement.textContent).toContain('etched in stone.');
  });

  it('should render the description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph.nativeElement.textContent).toContain('Join a global community documenting stonemason marks');
  });

  it('should have the "Start Exploring" button with correct routerLink', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/search/monuments"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Start Exploring');
  });

  it('should render the three main cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.group.relative.h-64'));
    expect(cards.length).toBe(3);
    expect(cards[0].nativeElement.textContent).toContain('Monuments');
    expect(cards[1].nativeElement.textContent).toContain('Stone Marks');
    expect(cards[2].nativeElement.textContent).toContain('Contribute');
  });

  it('should call scrollToContent when scroll button is clicked', () => {
    const spy = vi.spyOn(component, 'scrollToContent');
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should render the "Digital Archive" badge', () => {
    const badge = fixture.debugElement.query(By.css('.inline-block.border'));
    expect(badge.nativeElement.textContent).toContain('Digital Archive');
  });
});
