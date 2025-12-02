import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { TermsOfServiceComponent } from './terms-of-service';

describe('TermsOfServiceComponent Test', () => {

  it('should create the component', () => {
    TestBed.configureTestingModule({
      imports: [TermsOfServiceComponent]
    });

    const fixture = TestBed.createComponent(TermsOfServiceComponent);
    fixture.detectChanges();

    const dom = fixture.nativeElement as HTMLElement;
    expect(dom).toBeTruthy();
  });

  it('should render the main title', () => {
    TestBed.configureTestingModule({
      imports: [TermsOfServiceComponent]
    });

    const fixture = TestBed.createComponent(TermsOfServiceComponent);
    fixture.detectChanges();

    const dom = fixture.nativeElement as HTMLElement;
    const mainTitle = dom.querySelector('h1');
    expect(mainTitle).toBeTruthy();
    expect(mainTitle?.textContent).toContain('Terms of Service');
  });

  it('should contain multiple section headings', () => {
    TestBed.configureTestingModule({
      imports: [TermsOfServiceComponent]
    });

    const fixture = TestBed.createComponent(TermsOfServiceComponent);
    fixture.detectChanges();

    const dom = fixture.nativeElement as HTMLElement;
    const headings = Array.from(dom.querySelectorAll('h2')).map(h => h.textContent?.trim());

    expect(headings).toEqual([
      'Platform Objective',
      'Rules of Use',
      'User Responsibilities',
      'Platform Responsibilities',
      'Reporting and Enforcement',
      'Limitations and Disclaimers',
      'Contact'
    ]);
  });

  it('should have valid links', () => {
    TestBed.configureTestingModule({
      imports: [TermsOfServiceComponent]
    });

    const fixture = TestBed.createComponent(TermsOfServiceComponent);
    fixture.detectChanges();

    const dom = fixture.nativeElement as HTMLElement;
    const links = Array.from(dom.querySelectorAll('a'));

    links.forEach(link => {
      expect(link.getAttribute('href')).toBeTruthy();
      expect(link.getAttribute('href')?.length).toBeGreaterThan(0);
    });

    const contactLink = dom.querySelector('a[href="/contact"]');
    expect(contactLink).toBeTruthy();
  });

  it('should match snapshot', () => {
    TestBed.configureTestingModule({
      imports: [TermsOfServiceComponent]
    });

    const fixture = TestBed.createComponent(TermsOfServiceComponent);
    fixture.detectChanges();

    const dom = fixture.nativeElement as HTMLElement;

    expect(dom.innerHTML).toMatchSnapshot();
  });

});
