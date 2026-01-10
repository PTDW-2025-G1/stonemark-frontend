import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LegalHeroHeaderComponent } from './legal-hero-header';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('LegalHeroHeaderComponent', () => {
  let fixture: ComponentFixture<LegalHeroHeaderComponent>;
  let component: LegalHeroHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LegalHeroHeaderComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalHeroHeaderComponent);
    component = fixture.componentInstance;

    component.title = 'legal.title.key';
    component.lastUpdated = 'legal.updated.key';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header container', () => {
    const header = fixture.debugElement.query(By.css('header'));
    expect(header).toBeTruthy();
  });

  it('should render a title element (h1)', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy();
  });

  it('should render the last updated paragraph', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBeGreaterThan(1);
  });

  it('should apply margin class by default', () => {
    const header = fixture.debugElement.query(By.css('header'));
    expect(header.classes['mb-10']).toBe(true);
  });

  it('should remove margin class when margin is false', () => {
    component.margin = false;
    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css('header'));
    expect(header.classes['mb-10']).toBeFalsy();
  });
});
