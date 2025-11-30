import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseTimeComponent } from './response-time';
import { By } from '@angular/platform-browser';

describe('ResponseTimeComponent', () => {
  let component: ResponseTimeComponent;
  let fixture: ComponentFixture<ResponseTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseTimeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the clock icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-clock'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.className).toContain('text-primary');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h4.font-semibold'));
    expect(heading.nativeElement.textContent).toContain('Response Time');
  });

  it('should render the description', () => {
    const description = fixture.debugElement.query(By.css('p.text-sm.text-text-muted'));
    expect(description.nativeElement.textContent).toContain('We typically respond within 24-48 hours on business days.');
  });

  it('should have proper layout classes for the container', () => {
    const container = fixture.debugElement.query(By.css('.bg-gradient-to-br.from-primary\\/5.to-primary\\/10.rounded-2xl.border.border-primary\\/20.p-6'));
    expect(container).toBeTruthy();
  });
});
