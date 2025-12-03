import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpRightsComponent } from './privacy-rights';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';

describe('PpRightsComponent', () => {
  let fixture: ComponentFixture<PpRightsComponent>;
  let component: PpRightsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpRightsComponent, LegalSectionBlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PpRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PpRightsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct section title', () => {
    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleEl.textContent.trim()).toBe('5. Data subject rights');
  });

  it('should send exactly one paragraph to the LegalSectionBlockComponent', () => {
    const block = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(block.paragraphs.length).toBe(1);
    expect(block.paragraphs[0]).toContain('Under Articles 12 to 22 of the GDPR');
  });

  it('should project the list of rights', () => {
    const list = fixture.debugElement.query(By.css('ul'));
    expect(list).toBeTruthy();

    const items = list.queryAll(By.css('li'));
    expect(items.length).toBe(6);
  });

  it('should contain all GDPR rights descriptions', () => {
    const items = fixture.debugElement.queryAll(By.css('ul li'));
    const texts = items.map(i => i.nativeElement.textContent.trim());

    expect(texts.some(t => t.includes('Right of access'))).toBeTruthy();
    expect(texts.some(t => t.includes('Right to rectification'))).toBeTruthy();
    expect(texts.some(t => t.includes('Right to erasure'))).toBeTruthy();
    expect(texts.some(t => t.includes('Right to restriction'))).toBeTruthy();
    expect(texts.some(t => t.includes('Right to object'))).toBeTruthy();
    expect(texts.some(t => t.includes('Right to data portability'))).toBeTruthy();
  });

  it('should display the final explanatory paragraph', () => {
    const finalParagraph = fixture.debugElement.query(By.css('p.mt-4')).nativeElement;
    expect(finalParagraph.textContent).toContain('To exercise any of these rights');
  });
});
