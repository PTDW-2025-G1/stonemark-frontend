import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdPartyCookiesSection } from './third-party-cookies-section';
import { By } from '@angular/platform-browser';

describe('ThirdPartyCookiesSection', () => {
  let component: ThirdPartyCookiesSection;
  let fixture: ComponentFixture<ThirdPartyCookiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdPartyCookiesSection]
    }).compileComponents();

    fixture = TestBed.createComponent(ThirdPartyCookiesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the section title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe('Third-Party Cookies');
  });

  it('should render introduction text', () => {
    const intro = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(intro.textContent).toContain('third-party services');
  });

  it('should render four third-party cookie blocks', () => {
    const blocks = fixture.debugElement.queryAll(By.css('.bg-surface.rounded-xl'));
    expect(blocks.length).toBe(4);
  });

  it('should render correct service titles', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4')).map(h =>
      h.nativeElement.textContent.trim()
    );

    expect(titles).toContain('Google Analytics');
    expect(titles).toContain('Mapping Services');
    expect(titles).toContain('Social Media Platforms');
    expect(titles).toContain('Security Services');
  });

  it('should display the disclaimer text', () => {
    const italicText = fixture.debugElement.query(By.css('p.italic')).nativeElement;
    expect(italicText.textContent).toContain('We recommend reviewing the privacy policies');
  });
});
