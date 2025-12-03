import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatAreCookiesSection } from './what-are-cookies-section';
import { By } from '@angular/platform-browser';

describe('WhatAreCookiesSection', () => {
  let component: WhatAreCookiesSection;
  let fixture: ComponentFixture<WhatAreCookiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatAreCookiesSection]
    }).compileComponents();

    fixture = TestBed.createComponent(WhatAreCookiesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct section title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe('What Are Cookies?');
  });

  it('should contain two descriptive paragraphs', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBe(2);

    expect(paragraphs[0].nativeElement.textContent)
      .toContain('Cookies are small text files');

    expect(paragraphs[1].nativeElement.textContent)
      .toContain('session cookies');
  });

  it('should have correct outer section styling', () => {
    const section = fixture.debugElement.query(By.css('section')).nativeElement;
    expect(section.className).toContain('bg-surface-alt');
    expect(section.className).toContain('rounded-2xl');
  });
});
