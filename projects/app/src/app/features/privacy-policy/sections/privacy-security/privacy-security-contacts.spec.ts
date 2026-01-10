import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpSecurityContactsComponent } from './privacy-security-contacts';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('PpSecurityContactsComponent', () => {
  let fixture: ComponentFixture<PpSecurityContactsComponent>;
  let component: PpSecurityContactsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PpSecurityContactsComponent,
        LegalSectionBlockComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PpSecurityContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render LegalSectionBlockComponent', () => {
    const block = fixture.debugElement.query(
      By.directive(LegalSectionBlockComponent)
    );
    expect(block).toBeTruthy();
  });

  it('should pass a title to LegalSectionBlockComponent', () => {
    const blockInstance = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(blockInstance.title).toBeDefined();
  });

  it('should pass exactly two paragraphs', () => {
    const blockInstance = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(Array.isArray(blockInstance.paragraphs)).toBe(true);
    expect(blockInstance.paragraphs.length).toBe(2);
  });
});
