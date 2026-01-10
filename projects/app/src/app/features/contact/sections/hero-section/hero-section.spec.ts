import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactHeroSectionComponent } from './hero-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('ContactHeroSectionComponent', () => {
  let component: ContactHeroSectionComponent;
  let fixture: ComponentFixture<ContactHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactHeroSectionComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the shared hero component', () => {
    const sharedHero = fixture.debugElement.query(By.css('app-shared-hero'));
    expect(sharedHero).toBeTruthy();
  });

  it('should bind inputs to shared hero component', () => {
    const sharedHero = fixture.debugElement.query(By.css('app-shared-hero'));
    const instance = sharedHero.componentInstance;

    expect(instance.icon).toBe('bi bi-envelope');
    expect(instance.badge).toBeDefined();
    expect(instance.titleLines).toBeDefined();
    expect(Array.isArray(instance.titleLines)).toBe(true);
    expect(instance.subtitle).toBeDefined();
  });
});
