import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PpHeaderComponent } from './privacy-header';
import { LegalHeroHeaderComponent } from '@shared/ui/legal-hero-header/legal-hero-header';
import { LegalInfoGridComponent } from '@shared/ui/legal-info-grid/legal-info-grid';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('PpHeaderComponent', () => {
  let component: PpHeaderComponent;
  let fixture: ComponentFixture<PpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PpHeaderComponent,
        LegalHeroHeaderComponent,
        LegalInfoGridComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render LegalHeroHeaderComponent', () => {
    const heroHeader = fixture.debugElement.query(
      By.directive(LegalHeroHeaderComponent)
    );
    expect(heroHeader).toBeTruthy();
  });

  it('should pass title and lastUpdated inputs to LegalHeroHeaderComponent', () => {
    const heroHeaderInstance = fixture.debugElement
      .query(By.directive(LegalHeroHeaderComponent))
      .componentInstance as LegalHeroHeaderComponent;

    expect(heroHeaderInstance.title).toBeDefined();
    expect(heroHeaderInstance.lastUpdated).toBeDefined();
  });

  it('should render LegalInfoGridComponent', () => {
    const infoGrid = fixture.debugElement.query(
      By.directive(LegalInfoGridComponent)
    );
    expect(infoGrid).toBeTruthy();
  });

  it('should pass three items to LegalInfoGridComponent', () => {
    const infoGridInstance = fixture.debugElement
      .query(By.directive(LegalInfoGridComponent))
      .componentInstance as LegalInfoGridComponent;

    expect(Array.isArray(infoGridInstance.items)).toBe(true);
    expect(infoGridInstance.items.length).toBe(3);
  });
});
