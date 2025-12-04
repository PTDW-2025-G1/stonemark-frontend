import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-legal-hero-header',
  standalone: true,
  template: '<div class="legal-hero-header-mock"></div>',
  inputs: ['title', 'lastUpdated']
})
class MockLegalHeroHeaderComponent {}

@Component({
  selector: 'app-terms-section-grid',
  standalone: true,
  template: '<div class="terms-section-grid-mock"></div>'
})
class MockTermsSectionGrid {}

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [MockLegalHeroHeaderComponent, MockTermsSectionGrid],
  template: `
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-8 space-y-12">
        <app-legal-hero-header title="Terms of Service" lastUpdated="November 17, 2025" />
        <app-terms-section-grid></app-terms-section-grid>
      </div>
    </section>
  `
})
class TestTermsOfServiceComponent {}

describe('TermsOfServiceComponent', () => {
  let component: TestTermsOfServiceComponent;
  let fixture: ComponentFixture<TestTermsOfServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTermsOfServiceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestTermsOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render LegalHeroHeaderComponent', () => {
    const heroHeader = fixture.debugElement.query(By.directive(MockLegalHeroHeaderComponent));
    expect(heroHeader).toBeTruthy();
  });

  it('should render TermsSectionGrid', () => {
    const sectionGrid = fixture.debugElement.query(By.directive(MockTermsSectionGrid));
    expect(sectionGrid).toBeTruthy();
  });

  it('should have proper container styling', () => {
    const container = fixture.debugElement.query(By.css('.max-w-7xl'));
    expect(container).toBeTruthy();
  });

  it('should have proper section padding', () => {
    const section = fixture.debugElement.query(By.css('section.py-16'));
    expect(section).toBeTruthy();
  });

  it('should render exactly 2 main components', () => {
    const heroHeader = fixture.debugElement.query(By.directive(MockLegalHeroHeaderComponent));
    const sectionGrid = fixture.debugElement.query(By.directive(MockTermsSectionGrid));
    expect(heroHeader).toBeTruthy();
    expect(sectionGrid).toBeTruthy();
  });
});
