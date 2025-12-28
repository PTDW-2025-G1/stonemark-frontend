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
    const cards = fixture.debugElement.queryAll(By.css('.border-t.border-primary'));
    expect(cards.length).toBe(3);
  });

  it('should render GDPR Compliant card', () => {
    const heading = fixture.debugElement.queryAll(By.css('h4'))[0];
    expect(heading.nativeElement.textContent.trim()).toBe('GDPR Compliant');
  });

  it('should render Community Driven card', () => {
    const heading = fixture.debugElement.queryAll(By.css('h4'))[1];
    expect(heading.nativeElement.textContent.trim()).toBe('Community Driven');
  });

  it('should render AI-Powered card', () => {
    const heading = fixture.debugElement.queryAll(By.css('h4'))[2];
    expect(heading.nativeElement.textContent.trim()).toBe('AI-Powered');
  });

  it('should have proper grid layout for cards', () => {
    const grid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-3'));
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

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have proper section padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;
    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
  });

  it('should have font-serif on all card titles', () => {
    const titles = fixture.debugElement.queryAll(By.css('h4.font-serif'));
    expect(titles.length).toBe(3);
  });

  it('should have text-sm on descriptions', () => {
    const descriptions = fixture.debugElement.queryAll(By.css('p.text-sm'));
    expect(descriptions.length).toBe(3);
  });

  it('should not render any icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('.bi'));
    expect(icons.length).toBe(0);
  });
});
