import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseTimeComponent } from './response-time';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('ResponseTimeComponent', () => {
  let component: ResponseTimeComponent;
  let fixture: ComponentFixture<ResponseTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResponseTimeComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main container', () => {
    const container = fixture.debugElement.query(By.css('.bg-gradient-to-br'));
    expect(container).toBeTruthy();
  });

  it('should render the clock icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-clock'));
    expect(icon).toBeTruthy();
  });

  it('should render a heading element', () => {
    const heading = fixture.debugElement.query(By.css('h4'));
    expect(heading).toBeTruthy();
  });

  it('should render a description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p.text-sm.text-text-muted'));
    expect(paragraph).toBeTruthy();
  });

  it('should have primary styling on icon container', () => {
    const iconContainer = fixture.debugElement.query(By.css('.bg-primary\\/20'));
    expect(iconContainer).toBeTruthy();
  });

  it('should have rounded container styling', () => {
    const container = fixture.debugElement.query(By.css('.rounded-2xl'));
    expect(container).toBeTruthy();
  });
});
