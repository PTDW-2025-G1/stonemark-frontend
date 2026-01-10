import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallToActionComponent } from './cta-section';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('CallToActionComponent', () => {
  let component: CallToActionComponent;
  let fixture: ComponentFixture<CallToActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CallToActionComponent,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render two action buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(buttons.length).toBe(2);
  });

  it('should have a primary submit button with correct route', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const submitBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/submit'
    );

    expect(submitBtn).toBeTruthy();
    expect(submitBtn!.componentInstance.variant).toBe('primary');
  });

  it('should have a secondary explore button with correct route', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const exploreBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/search/monuments'
    );

    expect(exploreBtn).toBeTruthy();
    expect(exploreBtn!.componentInstance.variant).toBe('secondary');
  });

  it('should apply minimum width class to both buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));

    buttons.forEach(btn => {
      expect(btn.nativeElement.className).toContain('min-w-[220px]');
    });
  });
});
