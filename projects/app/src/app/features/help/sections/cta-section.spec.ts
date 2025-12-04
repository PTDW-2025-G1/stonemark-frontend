import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallToActionComponent } from './cta-section';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('CallToActionComponent', () => {
  let component: CallToActionComponent;
  let fixture: ComponentFixture<CallToActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToActionComponent],
      providers: [provideRouter([])]
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
    const paragraph = fixture.debugElement.query(By.css('.text-xl.text-text-muted'));
    expect(paragraph.nativeElement.textContent).toContain('Join our growing community');
  });

  it('should render link to submit page', () => {
    const link = fixture.debugElement.query(By.css('a[href="/submit"]'));
    expect(link).toBeTruthy();
  });

  it('should render Submit Your First Mark button text', () => {
    const link = fixture.debugElement.query(By.css('a[href="/submit"]'));
    expect(link.nativeElement.textContent).toContain('Submit Your First Mark');
  });

  it('should render camera-fill icon in button', () => {
    const icon = fixture.debugElement.query(By.css('.bi-camera-fill'));
    expect(icon).toBeTruthy();
  });

  it('should render arrow-right icon in button', () => {
    const icon = fixture.debugElement.query(By.css('.bi-arrow-right'));
    expect(icon).toBeTruthy();
  });

  it('should render footer trust indicators', () => {
    const footer = fixture.debugElement.query(By.css('.text-sm.text-text-muted'));
    expect(footer.nativeElement.textContent).toContain('Secure');
    expect(footer.nativeElement.textContent).toContain('Private');
    expect(footer.nativeElement.textContent).toContain('Free Forever');
  });

  it('should render shield-check icon in footer', () => {
    const icon = fixture.debugElement.query(By.css('.bi-shield-check'));
    expect(icon).toBeTruthy();
  });

  it('should have primary button styling', () => {
    const button = fixture.debugElement.query(By.css('a[href="/submit"]'));
    const classes = button.nativeElement.className;
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('text-primary-foreground');
  });

  it('should have rounded-full styling on button', () => {
    const button = fixture.debugElement.query(By.css('a[href="/submit"]'));
    expect(button.nativeElement.className).toContain('rounded-full');
  });

  it('should have hover scale effect on button', () => {
    const button = fixture.debugElement.query(By.css('a[href="/submit"]'));
    expect(button.nativeElement.className).toContain('hover:scale-105');
  });

  it('should mention heritage enthusiasts in description', () => {
    const paragraph = fixture.debugElement.query(By.css('.text-xl.text-text-muted'));
    expect(paragraph.nativeElement.textContent).toContain('heritage enthusiasts');
  });

  it('should mention preserving stories for future generations', () => {
    const paragraph = fixture.debugElement.query(By.css('.text-xl.text-text-muted'));
    expect(paragraph.nativeElement.textContent).toContain('future generations');
  });

  it('should have proper section padding', () => {
    const section = fixture.debugElement.query(By.css('.py-24'));
    expect(section).toBeTruthy();
  });

  it('should have relative positioning for overlay', () => {
    const container = fixture.debugElement.query(By.css('.relative.overflow-hidden'));
    expect(container).toBeTruthy();
  });
});
