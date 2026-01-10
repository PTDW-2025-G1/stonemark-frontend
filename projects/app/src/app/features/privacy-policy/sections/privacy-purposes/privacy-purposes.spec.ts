import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpPurposesComponent } from './privacy-purposes';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('PpPurposesComponent', () => {
  let fixture: ComponentFixture<PpPurposesComponent>;
  let component: PpPurposesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PpPurposesComponent,
        LegalSectionBlockComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PpPurposesComponent);
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

  it('should pass title input to LegalSectionBlockComponent', () => {
    const blockInstance = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(blockInstance.title).toBeDefined();
  });

  it('should pass exactly one paragraph', () => {
    const blockInstance = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(Array.isArray(blockInstance.paragraphs)).toBe(true);
    expect(blockInstance.paragraphs.length).toBe(1);
  });

  it('should project an unordered list inside the block', () => {
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();
  });

  it('should render exactly four purpose items', () => {
    const liItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(liItems.length).toBe(4);
  });
});
