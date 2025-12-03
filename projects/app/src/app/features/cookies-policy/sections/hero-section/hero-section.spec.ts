import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieHeroSection } from './hero-section';
import { By } from '@angular/platform-browser';

describe('CookieHeroSection', () => {
  let component: CookieHeroSection;
  let fixture: ComponentFixture<CookieHeroSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieHeroSection]
    }).compileComponents();

    fixture = TestBed.createComponent(CookieHeroSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the hero section component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct heading text', () => {
    const heading = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(heading.textContent.trim()).toBe('Cookie Policy');
  });

  it('should display the legal tag "Stonemark Legal"', () => {
    const tag = fixture.debugElement.query(By.css('p.text-primary')).nativeElement;
    expect(tag.textContent.trim()).toBe('Stonemark Legal');
  });

  it('should show last updated date', () => {
    const dateEl = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement;
    expect(dateEl.textContent).toContain('Last updated:');
  });
});
