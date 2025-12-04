import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustIndicatorsComponent } from './trust-indicators';
import { By } from '@angular/platform-browser';

describe('TrustIndicatorsComponent', () => {
  let component: TrustIndicatorsComponent;
  let fixture: ComponentFixture<TrustIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustIndicatorsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrustIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 trust indicator cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.rounded-3xl'));
    expect(cards.length).toBe(3);
  });

  it('should render GDPR Compliant card', () => {
    const heading = fixture.debugElement.queryAll(By.css('h3'))[0];
    expect(heading.nativeElement.textContent.trim()).toBe('GDPR Compliant');
  });

  it('should render Community Driven card', () => {
    const heading = fixture.debugElement.queryAll(By.css('h3'))[1];
    expect(heading.nativeElement.textContent.trim()).toBe('Community Driven');
  });

  it('should render AI-Powered card', () => {
    const heading = fixture.debugElement.queryAll(By.css('h3'))[2];
    expect(heading.nativeElement.textContent.trim()).toBe('AI-Powered');
  });

  it('should render shield-check icon for GDPR card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-shield-check'));
    expect(icon).toBeTruthy();
  });

  it('should render people-fill icon for Community card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-people-fill'));
    expect(icon).toBeTruthy();
  });

  it('should render cpu icon for AI card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-cpu'));
    expect(icon).toBeTruthy();
  });

  it('should have proper grid layout for cards', () => {
    const grid = fixture.debugElement.query(By.css('.grid.md\\:grid-cols-3'));
    expect(grid).toBeTruthy();
  });

  it('should render GDPR description about data protection', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const gdprDescription = paragraphs[0].nativeElement.textContent;
    expect(gdprDescription).toContain('data is protected');
  });

  it('should render Community description about global network', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const communityDescription = paragraphs[1].nativeElement.textContent;
    expect(communityDescription).toContain('global network');
  });

  it('should render AI description about automatic analysis', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const aiDescription = paragraphs[2].nativeElement.textContent;
    expect(aiDescription).toContain('Automatic analysis');
  });

  it('should have hover shadow transition on cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.hover\\:shadow-lg'));
    expect(cards.length).toBe(3);
  });

  it('should apply success text color to shield icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-shield-check'));
    expect(icon.nativeElement.className).toContain('text-success');
  });

  it('should apply info text color to people icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-people-fill'));
    expect(icon.nativeElement.className).toContain('text-info');
  });

  it('should apply warning text color to cpu icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-cpu'));
    expect(icon.nativeElement.className).toContain('text-warning');
  });
});
