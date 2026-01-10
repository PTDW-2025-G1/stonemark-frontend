import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { TermsSectionGrid } from './terms-section-grid';
import { By } from '@angular/platform-browser';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('TermsSectionGrid', () => {
  let fixture: ComponentFixture<TermsSectionGrid>;
  let component: TermsSectionGrid;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TermsSectionGrid,
        LegalSectionBlockComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsSectionGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render an article container', () => {
    const article = fixture.debugElement.query(By.css('article'));
    expect(article).toBeTruthy();
    expect(article.attributes['aria-label']).toBe('Terms of Service sections');
  });

  it('should render one LegalSectionBlock per section', () => {
    const blocks = fixture.debugElement.queryAll(
      By.directive(LegalSectionBlockComponent)
    );

    expect(blocks.length).toBe(component.sections.length);
  });

  it('should pass a title and one paragraph to each LegalSectionBlock', () => {
    const blocks = fixture.debugElement.queryAll(
      By.directive(LegalSectionBlockComponent)
    );

    blocks.forEach(block => {
      const instance = block.componentInstance as LegalSectionBlockComponent;

      expect(instance.title).toBeDefined();
      expect(Array.isArray(instance.paragraphs)).toBe(true);
      expect(instance.paragraphs.length).toBe(1);
    });
  });
});
