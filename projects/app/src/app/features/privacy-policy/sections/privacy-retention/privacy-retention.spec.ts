import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpRetentionComponent } from './privacy-retention';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';

describe('PpRetentionComponent', () => {
  let fixture: ComponentFixture<PpRetentionComponent>;
  let component: PpRetentionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpRetentionComponent, LegalSectionBlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PpRetentionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the PpRetentionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section title correctly', () => {
    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleEl.textContent.trim()).toBe('3. Data retention period');
  });

  it('should pass exactly one paragraph to the LegalSectionBlockComponent', () => {
    const block = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(block.paragraphs.length).toBe(1);
    expect(block.paragraphs[0]).toContain('Personal data is retained only for the period necessary');
  });

  it('should project the <ul> with three list items', () => {
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();

    const listItems = ul.queryAll(By.css('li'));
    expect(listItems.length).toBe(3);
  });

  it('should include specific retention rules', () => {
    const listItems = fixture.debugElement.queryAll(By.css('ul li'));
    const texts = listItems.map(li => li.nativeElement.textContent.trim());

    expect(texts.some(t => t.includes('Account data'))).toBeTruthy();
    expect(texts.some(t => t.includes('Submitted content'))).toBeTruthy();
    expect(texts.some(t => t.includes('Technical and security logs'))).toBeTruthy();
  });
});
