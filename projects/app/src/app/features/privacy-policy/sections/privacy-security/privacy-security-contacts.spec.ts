import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpSecurityContactsComponent } from './privacy-security-contacts';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';

describe('PpSecurityContactsComponent', () => {
  let fixture: ComponentFixture<PpSecurityContactsComponent>;
  let component: PpSecurityContactsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpSecurityContactsComponent, LegalSectionBlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PpSecurityContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send the correct title to LegalSectionBlockComponent', () => {
    const block = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(block.title).toBe('6. Data security and contacts');
  });

  it('should send exactly 3 paragraphs', () => {
    const block = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(block.paragraphs.length).toBe(3);
  });

  it('should include the correct static paragraphs', () => {
    const paragraphs = component.paragraphs;

    expect(paragraphs[0]).toContain('appropriate technical and organizational measures');
    expect(paragraphs[1]).toContain('As this is an academic project');
  });

  it('should include a "Last updated" paragraph with today’s date', () => {
    const today = new Date().toLocaleDateString('pt-PT');

    const thirdParagraph = component.paragraphs[2];

    expect(thirdParagraph).toContain('Last updated:');
    expect(thirdParagraph).toContain(today);
  });
});
