import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieIntroductionSection } from './introduction-section';
import { By } from '@angular/platform-browser';

describe('CookieIntroductionSection', () => {
  let component: CookieIntroductionSection;
  let fixture: ComponentFixture<CookieIntroductionSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieIntroductionSection]
    }).compileComponents();

    fixture = TestBed.createComponent(CookieIntroductionSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the introduction section component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct section title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe('Introduction');
  });

  it('should contain two descriptive paragraphs', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBe(2);

    expect(paragraphs[0].nativeElement.textContent).toContain('This Cookie Policy explains');
    expect(paragraphs[1].nativeElement.textContent).toContain('By using Stonemark');
  });

  it('should render the outer section with styling classes', () => {
    const section = fixture.debugElement.query(By.css('section')).nativeElement;
    expect(section.className).toContain('bg-surface-alt');
    expect(section.className).toContain('rounded-2xl');
  });
});
