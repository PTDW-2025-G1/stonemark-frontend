import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtaSectionComponent } from './cta-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';
import {RouterTestingModule} from '@angular/router/testing';

describe('CtaSectionComponent', () => {
  let component: CtaSectionComponent;
  let fixture: ComponentFixture<CtaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CtaSectionComponent,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CtaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render CTA section container', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
  });

  it('should render heading element', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeTruthy();
  });

  it('should render two action buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(buttons.length).toBe(2);
  });

  it('should have a link to search monuments', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));

    const exploreBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/search/monuments'
    );

    expect(exploreBtn).toBeTruthy();
  });

  it('should have a link to contact page', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));

    const contactBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/contact'
    );

    expect(contactBtn).toBeTruthy();
  });

  it('should use primary and secondary button variants', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));

    const variants = buttons.map(b => b.componentInstance.variant);
    expect(variants).toContain('primary');
    expect(variants).toContain('secondary');
  });

  it('should use centered layout', () => {
    const container = fixture.debugElement.query(By.css('.text-center'));
    expect(container).toBeTruthy();
  });
});
