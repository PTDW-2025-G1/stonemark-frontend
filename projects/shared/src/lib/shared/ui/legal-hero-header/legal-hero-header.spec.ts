import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LegalHeroHeaderComponent } from './legal-hero-header';
import { By } from '@angular/platform-browser';

describe('LegalHeroHeaderComponent', () => {
  let fixture: ComponentFixture<LegalHeroHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalHeroHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalHeroHeaderComponent);
    fixture.componentInstance.title = 'Terms of Service';
    fixture.componentInstance.lastUpdated = 'November 17, 2025';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Terms of Service');
  });

  it('should render the last updated date', () => {
    const p = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement;
    expect(p.textContent).toContain('November 17, 2025');
  });
});
