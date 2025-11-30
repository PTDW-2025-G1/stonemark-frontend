import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactHeroSectionComponent } from './hero-section';
import { By } from '@angular/platform-browser';

describe('ContactHeroSectionComponent', () => {
  let component: ContactHeroSectionComponent;
  let fixture: ComponentFixture<ContactHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactHeroSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the shared hero component', () => {
    const sharedHero = fixture.debugElement.query(By.css('app-shared-hero'));
    expect(sharedHero).toBeTruthy();
  });

  it('should pass the correct icon, badge, titleLines and subtitle to shared hero', () => {
    const sharedHero = fixture.debugElement.query(By.css('app-shared-hero'));
    expect(sharedHero).toBeTruthy();

    const instance = sharedHero.componentInstance;
    expect(instance.icon).toBe('bi bi-envelope');
    expect(instance.badge).toBe('Get in Touch');
    expect(instance.titleLines).toContain('We Would Love to Hear from You.');
    expect(instance.subtitle).toContain('Have questions about Stone Mark?');
  });

});
