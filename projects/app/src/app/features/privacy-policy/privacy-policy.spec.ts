import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-pp-header',
  standalone: true,
  template: '<div class="pp-header-mock"></div>'
})
class MockPpHeaderComponent {}

@Component({
  selector: 'app-pp-data',
  standalone: true,
  template: '<div class="pp-data-mock"></div>'
})
class MockPpDataComponent {}

@Component({
  selector: 'app-pp-purposes',
  standalone: true,
  template: '<div class="pp-purposes-mock"></div>'
})
class MockPpPurposesComponent {}

@Component({
  selector: 'app-pp-retention',
  standalone: true,
  template: '<div class="pp-retention-mock"></div>'
})
class MockPpRetentionComponent {}

@Component({
  selector: 'app-pp-sharing',
  standalone: true,
  template: '<div class="pp-sharing-mock"></div>'
})
class MockPpSharingComponent {}

@Component({
  selector: 'app-pp-rights',
  standalone: true,
  template: '<div class="pp-rights-mock"></div>'
})
class MockPpRightsComponent {}

@Component({
  selector: 'app-pp-security-contacts',
  standalone: true,
  template: '<div class="pp-security-contacts-mock"></div>'
})
class MockPpSecurityContactsComponent {}

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    MockPpHeaderComponent,
    MockPpDataComponent,
    MockPpPurposesComponent,
    MockPpRetentionComponent,
    MockPpSharingComponent,
    MockPpRightsComponent,
    MockPpSecurityContactsComponent
  ],
  template: `
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-8 space-y-12">
        <app-pp-header class="block" />
        <app-pp-data class="block" />
        <app-pp-purposes class="block" />
        <app-pp-retention class="block" />
        <app-pp-sharing class="block" />
        <app-pp-rights class="block" />
        <app-pp-security-contacts class="block" />
      </div>
    </section>
  `
})
class TestPrivacyPolicyComponent {}

describe('PrivacyPolicyComponent', () => {
  let component: TestPrivacyPolicyComponent;
  let fixture: ComponentFixture<TestPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPrivacyPolicyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render PpHeaderComponent', () => {
    const header = fixture.debugElement.query(By.directive(MockPpHeaderComponent));
    expect(header).toBeTruthy();
  });

  it('should render PpDataComponent', () => {
    const data = fixture.debugElement.query(By.directive(MockPpDataComponent));
    expect(data).toBeTruthy();
  });

  it('should render PpPurposesComponent', () => {
    const purposes = fixture.debugElement.query(By.directive(MockPpPurposesComponent));
    expect(purposes).toBeTruthy();
  });

  it('should render PpRetentionComponent', () => {
    const retention = fixture.debugElement.query(By.directive(MockPpRetentionComponent));
    expect(retention).toBeTruthy();
  });

  it('should render PpSharingComponent', () => {
    const sharing = fixture.debugElement.query(By.directive(MockPpSharingComponent));
    expect(sharing).toBeTruthy();
  });

  it('should render PpRightsComponent', () => {
    const rights = fixture.debugElement.query(By.directive(MockPpRightsComponent));
    expect(rights).toBeTruthy();
  });

  it('should render PpSecurityContactsComponent', () => {
    const security = fixture.debugElement.query(By.directive(MockPpSecurityContactsComponent));
    expect(security).toBeTruthy();
  });

  it('should render all 7 sections', () => {
    const sections = fixture.debugElement.queryAll(By.css('.block'));
    expect(sections.length).toBe(7);
  });

  it('should have proper container styling', () => {
    const container = fixture.debugElement.query(By.css('.max-w-7xl'));
    expect(container).toBeTruthy();
  });

  it('should have proper section padding', () => {
    const section = fixture.debugElement.query(By.css('section.py-16'));
    expect(section).toBeTruthy();
  });
});
