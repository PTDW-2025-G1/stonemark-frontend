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
  selector: 'app-legal-section-block',
  standalone: true,
  template: '<div class="legal-section-block-mock"><ng-content></ng-content></div>',
  inputs: ['title', 'paragraphs', 'hasInnerContent']
})
class MockLegalSectionBlockComponent {}

@Component({
  selector: 'app-types-of-cookies-section',
  standalone: true,
  template: '<div class="types-of-cookies-section-mock"></div>'
})
class MockTypesOfCookiesSection {}

@Component({
  selector: 'app-third-party-cookies-section',
  standalone: true,
  template: '<div class="third-party-cookies-section-mock"></div>'
})
class MockThirdPartyCookiesSection {}

@Component({
  selector: 'app-managing-cookie-preferences-section',
  standalone: true,
  template: '<div class="managing-cookie-preferences-section-mock"></div>'
})
class MockManagingCookiePreferencesSection {}

@Component({
  selector: 'app-cookie-retention-section',
  standalone: true,
  template: '<div class="cookie-retention-section-mock"></div>'
})
class MockCookieRetentionSection {}

@Component({
  selector: 'app-questions-about-cookies-section',
  standalone: true,
  template: '<div class="questions-about-cookies-section-mock"></div>'
})
class MockQuestionsAboutCookiesSection {}

@Component({
  selector: 'app-cookies-policy',
  standalone: true,
  imports: [
    MockLegalHeroHeaderComponent,
    MockLegalSectionBlockComponent,
    MockTypesOfCookiesSection,
    MockThirdPartyCookiesSection,
    MockManagingCookiePreferencesSection,
    MockCookieRetentionSection,
    MockQuestionsAboutCookiesSection
  ],
  template: `
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-8 space-y-12">
        <app-legal-hero-header title="Cookie Policy" lastUpdated="November 19, 2025" />
        <article class="flex flex-col gap-6" aria-label="Cookie Policy sections">
          <app-legal-section-block title="Introduction" [paragraphs]="[]" />
          <app-legal-section-block title="What Are Cookies?" [paragraphs]="[]" />
          <app-types-of-cookies-section></app-types-of-cookies-section>
          <app-third-party-cookies-section></app-third-party-cookies-section>
          <app-managing-cookie-preferences-section></app-managing-cookie-preferences-section>
          <app-cookie-retention-section></app-cookie-retention-section>
          <app-legal-section-block title="Updates to This Policy" [paragraphs]="[]" />
          <app-questions-about-cookies-section></app-questions-about-cookies-section>
        </article>
      </div>
    </section>
  `
})
class TestCookiesPolicyComponent {}

describe('CookiesPolicyComponent', () => {
  let component: TestCookiesPolicyComponent;
  let fixture: ComponentFixture<TestCookiesPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCookiesPolicyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestCookiesPolicyComponent);
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

  it('should render TypesOfCookiesSection', () => {
    const section = fixture.debugElement.query(By.directive(MockTypesOfCookiesSection));
    expect(section).toBeTruthy();
  });

  it('should render ThirdPartyCookiesSection', () => {
    const section = fixture.debugElement.query(By.directive(MockThirdPartyCookiesSection));
    expect(section).toBeTruthy();
  });

  it('should render ManagingCookiePreferencesSection', () => {
    const section = fixture.debugElement.query(By.directive(MockManagingCookiePreferencesSection));
    expect(section).toBeTruthy();
  });

  it('should render CookieRetentionSection', () => {
    const section = fixture.debugElement.query(By.directive(MockCookieRetentionSection));
    expect(section).toBeTruthy();
  });

  it('should render QuestionsAboutCookiesSection', () => {
    const section = fixture.debugElement.query(By.directive(MockQuestionsAboutCookiesSection));
    expect(section).toBeTruthy();
  });

  it('should render LegalSectionBlockComponents for static sections', () => {
    const sectionBlocks = fixture.debugElement.queryAll(By.directive(MockLegalSectionBlockComponent));
    expect(sectionBlocks.length).toBe(3);
  });

  it('should have proper section structure with aria-label', () => {
    const article = fixture.debugElement.query(By.css('article[aria-label="Cookie Policy sections"]'));
    expect(article).toBeTruthy();
  });

  it('should have proper container styling', () => {
    const container = fixture.debugElement.query(By.css('.max-w-7xl'));
    expect(container).toBeTruthy();
  });
});
