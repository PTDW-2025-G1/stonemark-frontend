import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section';
import { SharedHeroSectionComponent } from '@shared/ui/hero-section/hero-section';
import { By } from '@angular/platform-browser';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent, SharedHeroSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SharedHeroSectionComponent', () => {
    const heroComponent = fixture.debugElement.query(By.directive(SharedHeroSectionComponent));
    expect(heroComponent).toBeTruthy();
  });

  it('should pass correct icon to SharedHeroSectionComponent', () => {
    const heroComponent = fixture.debugElement.query(By.directive(SharedHeroSectionComponent));
    expect(heroComponent.componentInstance.icon).toBe('bi bi-info-circle');
  });

  it('should pass correct badge text to SharedHeroSectionComponent', () => {
    const heroComponent = fixture.debugElement.query(By.directive(SharedHeroSectionComponent));
    expect(heroComponent.componentInstance.badge).toBe('About the Project');
  });

  it('should pass correct title lines to SharedHeroSectionComponent', () => {
    const heroComponent = fixture.debugElement.query(By.directive(SharedHeroSectionComponent));
    expect(heroComponent.componentInstance.titleLines).toEqual([
      'Preserving History,',
      'One Mark at a Time'
    ]);
  });

  it('should have two title lines', () => {
    const heroComponent = fixture.debugElement.query(By.directive(SharedHeroSectionComponent));
    expect(heroComponent.componentInstance.titleLines.length).toBe(2);
  });

  it('should pass correct subtitle to SharedHeroSectionComponent', () => {
    const heroComponent = fixture.debugElement.query(By.directive(SharedHeroSectionComponent));
    const expectedSubtitle = 'Stone Mark is a web application dedicated to the documentation and exploration of stonemason marks - the unique symbols engraved by ancient craftsmen on monuments across history.';
    expect(heroComponent.componentInstance.subtitle).toBe(expectedSubtitle);
  });

  it('should pass all required inputs to SharedHeroSectionComponent', () => {
    const heroComponent = fixture.debugElement.query(By.directive(SharedHeroSectionComponent));
    const instance = heroComponent.componentInstance;

    expect(instance.icon).toBeDefined();
    expect(instance.badge).toBeDefined();
    expect(instance.titleLines).toBeDefined();
    expect(instance.subtitle).toBeDefined();
  });

  it('should use info-circle icon for about page', () => {
    const heroComponent = fixture.debugElement.query(By.directive(SharedHeroSectionComponent));
    expect(heroComponent.componentInstance.icon).toContain('info-circle');
  });
});
