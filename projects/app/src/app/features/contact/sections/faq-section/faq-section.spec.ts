import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqSectionComponent } from './faq-section';
import { By } from '@angular/platform-browser';

describe('FaqSectionComponent', () => {
  let component: FaqSectionComponent;
  let fixture: ComponentFixture<FaqSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the FAQ badge with icon and text', () => {
    const badge = fixture.debugElement.query(By.css('.bg-primary\\/10.rounded-full'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('FAQ');
    const icon = badge.query(By.css('.bi-question-circle'));
    expect(icon).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent).toContain('Frequently Asked Questions');
  });

  it('should render the description', () => {
    const description = fixture.debugElement.query(By.css('.text-lg.text-text-muted'));
    expect(description.nativeElement.textContent).toContain('Find quick answers to common questions');
  });

  it('should render all FAQ questions', () => {
    const questions = fixture.debugElement.queryAll(By.css('h3.font-semibold'));
    expect(questions.length).toBe(component.faqs.length);
    expect(questions[0].nativeElement.textContent).toContain('What is Stone Mark?');
    expect(questions[1].nativeElement.textContent).toContain('Who can participate?');
  });

  it('should not show any answer by default', () => {
    const answers = fixture.debugElement.queryAll(By.css('.border-t.pt-4'));
    expect(answers.length).toBe(0);
  });

  it('should open the answer when a question is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    fixture.detectChanges();

    const answers = fixture.debugElement.queryAll(By.css('.border-t.pt-4'));
    expect(answers.length).toBe(1);
    expect(answers[0].nativeElement.textContent).toContain(component.faqs[0].answer);
  });

  it('should close previous answer when another question is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    fixture.detectChanges();

    buttons[1].nativeElement.click();
    fixture.detectChanges();

    const answers = fixture.debugElement.queryAll(By.css('.border-t.pt-4'));
    expect(answers.length).toBe(1);
    expect(answers[0].nativeElement.textContent).toContain(component.faqs[1].answer);
  });

  it('should have proper layout classes for the FAQ container', () => {
    const container = fixture.debugElement.query(By.css('.max-w-4xl.mx-auto.space-y-4'));
    expect(container).toBeTruthy();
  });
});
