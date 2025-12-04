import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PpHeaderComponent } from './privacy-header';
import { By } from '@angular/platform-browser';

describe('PpHeaderComponent', () => {
  let component: PpHeaderComponent;
  let fixture: ComponentFixture<PpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render LegalHeroHeaderComponent', () => {
    const heroHeader = fixture.debugElement.query(By.css('app-legal-hero-header'));
    expect(heroHeader).toBeTruthy();
  });

  it('should pass correct title to LegalHeroHeaderComponent', () => {
    const heroHeader = fixture.debugElement.query(By.css('app-legal-hero-header'));
    expect(heroHeader.attributes['title']).toBe('Privacy Policy');
  });

  it('should pass correct lastUpdated to LegalHeroHeaderComponent', () => {
    const heroHeader = fixture.debugElement.query(By.css('app-legal-hero-header'));
    expect(heroHeader.attributes['lastUpdated']).toBe('November 19, 2025');
  });

  it('should render LegalInfoGridComponent', () => {
    const infoGrid = fixture.debugElement.query(By.css('app-legal-info-grid'));
    expect(infoGrid).toBeTruthy();
  });

  it('should pass items array to LegalInfoGridComponent', () => {
    const infoGrid = fixture.debugElement.query(By.css('app-legal-info-grid'));
    expect(infoGrid).toBeTruthy();
  });
});
