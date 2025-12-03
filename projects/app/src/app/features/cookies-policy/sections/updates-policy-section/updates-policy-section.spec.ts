import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatesPolicySection } from './updates-policy-section';
import { By } from '@angular/platform-browser';

describe('UpdatesPolicySection', () => {
  let component: UpdatesPolicySection;
  let fixture: ComponentFixture<UpdatesPolicySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatesPolicySection]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatesPolicySection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe('Updates to This Policy');
  });

  it('should display the main paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(paragraph.textContent).toContain('We may update this Cookie Policy');
    expect(paragraph.textContent).toContain('technology, legislation, or our practices');
    expect(paragraph.textContent).toContain('Last updated');
  });
});
