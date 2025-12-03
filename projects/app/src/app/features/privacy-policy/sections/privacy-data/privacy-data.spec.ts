import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpDataComponent } from './privacy-data';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';

describe('PpDataComponent', () => {
  let fixture: ComponentFixture<PpDataComponent>;
  let component: PpDataComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpDataComponent, LegalSectionBlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PpDataComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the LegalSectionBlock with the correct title', () => {
    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleEl.textContent.trim()).toBe('1. What personal data do we collect?');
  });

  it('should pass one paragraph to LegalSectionBlockComponent', () => {
    const blockInstance = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(blockInstance.paragraphs.length).toBe(1);
    expect(blockInstance.paragraphs[0]).toContain(
      'we may collect and process the following categories'
    );
  });

  it('should project inner content (the list of data items)', () => {
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();

    const liItems = ul.queryAll(By.css('li'));
    expect(liItems.length).toBe(4);
  });

  it('should contain the correct list items text', () => {
    const listItems = fixture.debugElement.queryAll(By.css('ul li'));
    const texts = listItems.map(li => li.nativeElement.textContent.trim());

    expect(texts.some(t => t.includes('Identification data'))).toBeTruthy();
    expect(texts.some(t => t.includes('Usage data'))).toBeTruthy();
    expect(texts.some(t => t.includes('Submitted content'))).toBeTruthy();
    expect(texts.some(t => t.includes('Technical data'))).toBeTruthy();
  });
});
