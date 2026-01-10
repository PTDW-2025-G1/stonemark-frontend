import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqSectionComponent } from './faq-section';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('FaqSectionComponent', () => {
  let component: FaqSectionComponent;
  let fixture: ComponentFixture<FaqSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FaqSectionComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render FAQ badge with icon', () => {
    const badge = fixture.debugElement.query(By.css('.bg-primary\\/10.rounded-full'));
    expect(badge).toBeTruthy();

    const icon = badge.query(By.css('.bi-question-circle'));
    expect(icon).toBeTruthy();
  });

  it('should render the main heading element', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeTruthy();
  });

  it('should render FAQ list with correct number of items', () => {
    const items = fixture.debugElement.queryAll(By.css('button'));
    expect(items.length).toBe(component.faqs.length);
  });

  it('should not show any answer by default', () => {
    const answers = fixture.debugElement.queryAll(By.css('.border-t.border-border'));
    expect(answers.length).toBe(0);
  });

  it('should open an answer when a question is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[0].nativeElement.click();
    fixture.detectChanges();

    const answers = fixture.debugElement.queryAll(By.css('.border-t.border-border'));
    expect(answers.length).toBe(1);
  });

  it('should close previous answer when another question is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[0].nativeElement.click();
    fixture.detectChanges();

    buttons[1].nativeElement.click();
    fixture.detectChanges();

    const answers = fixture.debugElement.queryAll(By.css('.border-t.border-border'));
    expect(answers.length).toBe(1);
  });

  it('should rotate chevron icon when FAQ is open', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    fixture.detectChanges();

    const rotatedIcon = fixture.debugElement.query(By.css('.rotate-180'));
    expect(rotatedIcon).toBeTruthy();
  });

  it('should have proper layout container', () => {
    const container = fixture.debugElement.query(By.css('.max-w-4xl.mx-auto.space-y-4'));
    expect(container).toBeTruthy();
  });
});
