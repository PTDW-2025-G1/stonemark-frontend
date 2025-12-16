import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallToActionComponent } from './cta-section';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('CallToActionComponent', () => {
  let component: CallToActionComponent;
  let fixture: ComponentFixture<CallToActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToActionComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Ready to Make History?');
  });

  it('should render the description paragraph', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const description = paragraphs[0];
    expect(description.nativeElement.textContent).toContain('Join our growing community');
  });

  it('should have a link to submit page', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/submit"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Submit Your First Mark');
  });

  it('should have a link to search monuments', () => {
    const link = fixture.debugElement.query(By.css('a[href="/search/monuments"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Explore Database');
  });

  it('should apply primary button styles to Submit link', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/submit"]'));
    const classes = link.nativeElement.className;
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('text-primary-foreground');
    expect(classes).toContain('border-primary');
  });

  it('should apply secondary button styles to Explore link', () => {
    const link = fixture.debugElement.query(By.css('a[href="/search/monuments"]'));
    const classes = link.nativeElement.className;
    expect(classes).toContain('bg-surface');
    expect(classes).toContain('border-border');
  });

  it('should render both action buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('a'));
    expect(buttons.length).toBe(2);
  });

  it('should have proper section structure', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.className).toContain('py-24');
  });

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have centered text layout', () => {
    const container = fixture.debugElement.query(By.css('.text-center'));
    expect(container).toBeTruthy();
  });

  it('should have font-serif on heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should render italic closing statement', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const lastParagraph = paragraphs[paragraphs.length - 1];
    expect(lastParagraph.nativeElement.className).toContain('italic');
    expect(lastParagraph.nativeElement.textContent).toContain('Secure');
  });

  it('should mention secure, private, and free', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const lastParagraph = paragraphs[paragraphs.length - 1];
    expect(lastParagraph.nativeElement.textContent).toContain('Secure');
    expect(lastParagraph.nativeElement.textContent).toContain('Private');
    expect(lastParagraph.nativeElement.textContent).toContain('Free Forever');
  });
});

