import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { TermsSectionGrid } from './terms-section-grid';
import { By } from '@angular/platform-browser';

describe('TermsSectionGrid', () => {
  let fixture: ComponentFixture<TermsSectionGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsSectionGrid]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsSectionGrid);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all main section titles', () => {
    const titles = fixture.debugElement.queryAll(By.css('h2')).map(el => el.nativeElement.textContent.trim());

    expect(titles).toContain('Platform Objective');
    expect(titles).toContain('Rules of Use');
    expect(titles).toContain('User Responsibilities');
    expect(titles).toContain('Platform Responsibilities');
    expect(titles).toContain('Reporting and Enforcement');
    expect(titles).toContain('Limitations and Disclaimers');
    expect(titles).toContain('Contact');
  });

  it('should include at least one list (ul)', () => {
    const lists = fixture.debugElement.queryAll(By.css('ul'));
    expect(lists.length).toBeGreaterThan(0);
  });
});
