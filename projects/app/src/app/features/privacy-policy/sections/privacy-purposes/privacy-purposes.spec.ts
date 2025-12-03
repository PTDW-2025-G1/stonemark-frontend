import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpPurposesComponent } from './privacy-purposes';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';

describe('PpPurposesComponent', () => {
  let fixture: ComponentFixture<PpPurposesComponent>;
  let component: PpPurposesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpPurposesComponent, LegalSectionBlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PpPurposesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the PpPurposesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the LegalSectionBlock with the correct title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent.trim()).toBe(
      '2. Purposes of processing and legal basis (GDPR)'
    );
  });

  it('should pass exactly one paragraph to LegalSectionBlockComponent', () => {
    const block = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(block.paragraphs.length).toBe(1);
    expect(block.paragraphs[0]).toContain('Personal data is processed for specific');
  });

  it('should project the inner <ul> list correctly', () => {
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();

    const liItems = ul.queryAll(By.css('li'));
    expect(liItems.length).toBe(4); // 4 purposes
  });

  it('should include the expected list item texts', () => {
    const listItems = fixture.debugElement.queryAll(By.css('ul li'));
    const texts = listItems.map(li => li.nativeElement.textContent.trim());

    expect(texts.some(t => t.includes('Account management and authentication'))).toBeTruthy();
    expect(texts.some(t => t.includes('Management of submitted content'))).toBeTruthy();
    expect(texts.some(t => t.includes('Platform improvement and security'))).toBeTruthy();
    expect(texts.some(t => t.includes('Compliance with legal obligations'))).toBeTruthy();
  });
});
