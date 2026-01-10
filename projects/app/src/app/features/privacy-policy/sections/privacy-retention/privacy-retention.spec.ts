import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpRetentionComponent } from './privacy-retention';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('PpRetentionComponent', () => {
  let fixture: ComponentFixture<PpRetentionComponent>;
  let component: PpRetentionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PpRetentionComponent,
        LegalSectionBlockComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PpRetentionComponent);
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

  it('should pass exactly one paragraph', () => {
    const blockInstance = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(Array.isArray(blockInstance.paragraphs)).toBe(true);
    expect(blockInstance.paragraphs.length).toBe(1);
  });

  it('should project a list with three items', () => {
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();

    const liItems = ul.queryAll(By.css('li'));
    expect(liItems.length).toBe(3);
  });
});
