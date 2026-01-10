import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpDataComponent } from './privacy-data';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('PpDataComponent', () => {
  let fixture: ComponentFixture<PpDataComponent>;
  let component: PpDataComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PpDataComponent,
        LegalSectionBlockComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the LegalSectionBlock component', () => {
    const block = fixture.debugElement.query(
      By.directive(LegalSectionBlockComponent)
    );
    expect(block).toBeTruthy();
  });

  it('should pass hasInnerContent as true', () => {
    const blockInstance = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(blockInstance.hasInnerContent).toBe(true);
  });

  it('should pass exactly one paragraph to the block', () => {
    const blockInstance = fixture.debugElement
      .query(By.directive(LegalSectionBlockComponent))
      .componentInstance as LegalSectionBlockComponent;

    expect(blockInstance.paragraphs.length).toBe(1);
  });

  it('should project inner content (unordered list)', () => {
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();
  });

  it('should render three list items inside the projected content', () => {
    const items = fixture.debugElement.queryAll(By.css('ul li'));
    expect(items.length).toBe(3);
  });

  it('should render list items with emphasized labels', () => {
    const labels = fixture.debugElement.queryAll(By.css('ul li span.font-medium'));
    expect(labels.length).toBe(3);
  });
});
