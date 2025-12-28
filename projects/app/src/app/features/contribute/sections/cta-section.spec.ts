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

  it('should have a button to submit page', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const submitBtn = buttons.find(btn => btn.componentInstance.routerLink === '/submit');
    expect(submitBtn).toBeTruthy();
    if (!submitBtn) return;
    expect(submitBtn.nativeElement.textContent).toContain('Submit Your First Mark');
  });

  it('should have a button to search monuments', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const exploreBtn = buttons.find(btn => btn.componentInstance.routerLink === '/search/monuments');
    expect(exploreBtn).toBeTruthy();
    if (!exploreBtn) return;
    expect(exploreBtn.nativeElement.textContent).toContain('Explore Database');
  });

  it('should apply primary button styles to Submit button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const submitBtn = buttons.find(btn => btn.componentInstance.routerLink === '/submit');
    expect(submitBtn).toBeTruthy();
    if (!submitBtn) return;
    const classes = submitBtn.nativeElement.className;
    expect(classes).toContain('min-w-[220px]');
  });

  it('should apply secondary button styles to Explore button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const exploreBtn = buttons.find(btn => btn.componentInstance.routerLink === '/search/monuments');
    expect(exploreBtn).toBeTruthy();
    if (!exploreBtn) return;
    const classes = exploreBtn.nativeElement.className;
    expect(classes).toContain('min-w-[220px]');
  });

  it('should render both action buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(buttons.length).toBe(2);
  });
});
