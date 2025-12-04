import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  template: '<div class="hero-section-mock"></div>'
})
class MockHeroSectionComponent {}

@Component({
  selector: 'app-trust-indicators',
  standalone: true,
  template: '<div class="trust-indicators-mock"></div>'
})
class MockTrustIndicatorsComponent {}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  template: '<div class="how-it-works-mock"></div>'
})
class MockHowItWorksComponent {}

@Component({
  selector: 'app-features-section',
  standalone: true,
  template: '<div class="features-section-mock"></div>'
})
class MockFeaturesSectionComponent {}

@Component({
  selector: 'app-privacy-section',
  standalone: true,
  template: '<div class="privacy-section-mock"></div>'
})
class MockPrivacySectionComponent {}

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  template: '<div class="cta-section-mock"></div>'
})
class MockCallToActionComponent {}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    MockHeroSectionComponent,
    MockTrustIndicatorsComponent,
    MockHowItWorksComponent,
    MockFeaturesSectionComponent,
    MockPrivacySectionComponent,
    MockCallToActionComponent
  ],
  template: `
    <app-hero-section></app-hero-section>
    <app-trust-indicators></app-trust-indicators>
    <app-how-it-works></app-how-it-works>
    <app-features-section></app-features-section>
    <app-privacy-section></app-privacy-section>
    <app-call-to-action></app-call-to-action>
  `
})
class TestHelpComponent {}

describe('HelpComponent', () => {
  let component: TestHelpComponent;
  let fixture: ComponentFixture<TestHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHelpComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render HeroSectionComponent', () => {
    const heroSection = fixture.debugElement.query(By.directive(MockHeroSectionComponent));
    expect(heroSection).toBeTruthy();
  });

  it('should render TrustIndicatorsComponent', () => {
    const trustIndicators = fixture.debugElement.query(By.directive(MockTrustIndicatorsComponent));
    expect(trustIndicators).toBeTruthy();
  });

  it('should render HowItWorksComponent', () => {
    const howItWorks = fixture.debugElement.query(By.directive(MockHowItWorksComponent));
    expect(howItWorks).toBeTruthy();
  });

  it('should render FeaturesSectionComponent', () => {
    const featuresSection = fixture.debugElement.query(By.directive(MockFeaturesSectionComponent));
    expect(featuresSection).toBeTruthy();
  });

  it('should render PrivacySectionComponent', () => {
    const privacySection = fixture.debugElement.query(By.directive(MockPrivacySectionComponent));
    expect(privacySection).toBeTruthy();
  });

  it('should render CallToActionComponent', () => {
    const ctaSection = fixture.debugElement.query(By.directive(MockCallToActionComponent));
    expect(ctaSection).toBeTruthy();
  });

  it('should render all sections in correct order', () => {
    const sections = fixture.debugElement.children;
    expect(sections.length).toBe(6);
  });
});
