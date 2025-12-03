import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpSharingComponent } from './privacy-sharing';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';

describe('PpSharingComponent', () => {
  let fixture: ComponentFixture<PpSharingComponent>;
  let component: PpSharingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpSharingComponent, LegalSectionBlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PpSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the correct title to LegalSectionBlockComponent', () => {
    const block = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(block.title).toBe('4. Sharing of personal data');
  });

  it('should contain exactly one paragraph before the projected UL', () => {
    const block = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(block.paragraphs.length).toBe(1);
    expect(block.paragraphs[0]).toContain('We do not sell or commercialize your personal data');
  });

  it('should include projected list content', () => {
    const ul = fixture.debugElement.query(By.css('ul'));

    expect(ul).toBeTruthy();

    const items = ul.queryAll(By.css('li'));

    expect(items.length).toBe(3);

    expect(items[0].nativeElement.textContent)
      .toContain('Service providers strictly necessary');

    expect(items[1].nativeElement.textContent)
      .toContain('required by law');

    expect(items[2].nativeElement.textContent)
      .toContain('explicit consent');
  });

});
