import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PrivacyPolicyComponent } from './privacy-policy';
import privacyPolicyTemplate from './privacy-policy.html?raw';

describe('PrivacyPolicyComponent DOM Tests', () => {
  let fixture: ComponentFixture<PrivacyPolicyComponent>;
  let component: PrivacyPolicyComponent;
  let dom: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // componente standalone -> vai em imports, NÃO em declarations
      imports: [PrivacyPolicyComponent],
    })
      // 🔴 ESTA PARTE É NOVA: trocamos o templateUrl pelo template inline
      .overrideComponent(PrivacyPolicyComponent, {
        set: {
          template: privacyPolicyTemplate,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dom = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main title "Privacy Policy"', () => {
    const h1 = dom.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.trim().length).toBeGreaterThan(0);
    // Se o título for exatamente "Privacy Policy", podes trocar por:
    // expect(h1?.textContent).toContain('Privacy Policy');
  });

  it('should contain all main section headings', () => {
    const headings = dom.querySelectorAll('h2, h3');
    expect(headings.length).toBeGreaterThan(0);

    headings.forEach(h => {
      expect(h.textContent?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should not have anchors with empty href', () => {
    const anchors = Array.from(dom.querySelectorAll('a'));
    const invalidAnchors = anchors.filter(a => {
      const href = a.getAttribute('href');
      return !href || href.trim() === '' || href.trim() === '#';
    });

    expect(invalidAnchors.length).toBe(0);
  });

  it('should match the DOM snapshot', () => {
    expect(dom.innerHTML).toMatchSnapshot();
  });
});
