import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactInfoComponent } from './contact-info';
import { By } from '@angular/platform-browser';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "Quick Contact" title with icon', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading.nativeElement.textContent).toContain('Quick Contact');
    const icon = heading.query(By.css('.bi-info-circle'));
    expect(icon).toBeTruthy();
  });

  it('should render the email link correctly', () => {
    const emailLink = fixture.debugElement.query(By.css('a[href^="mailto:"]'));
    expect(emailLink).toBeTruthy();
    expect(emailLink.nativeElement.textContent).toContain('contact@stonemark.pt');
    const icon = emailLink.query(By.css('.bi-envelope-fill'));
    expect(icon).toBeTruthy();
    const label = emailLink.query(By.css('p.font-semibold'));
    expect(label.nativeElement.textContent).toContain('Email');
  });

  it('should render the phone link correctly', () => {
    const phoneLink = fixture.debugElement.query(By.css('a[href^="tel:"]'));
    expect(phoneLink).toBeTruthy();
    expect(phoneLink.nativeElement.textContent).toContain('+351 123 456 789');
    const icon = phoneLink.query(By.css('.bi-telephone-fill'));
    expect(icon).toBeTruthy();
    const label = phoneLink.query(By.css('p.font-semibold'));
    expect(label.nativeElement.textContent).toContain('Phone');
  });

  it('should render the address correctly', () => {
    const addressDiv = fixture.debugElement.queryAll(By.css('div.flex.items-start'))
      .find(el => el.nativeElement.textContent.includes('Águeda, Aveiro - Portugal'));
    expect(addressDiv).toBeTruthy();

    if (!addressDiv) return;

    expect(addressDiv.nativeElement.textContent).toContain('Águeda, Aveiro - Portugal');

    const icon = addressDiv.query(By.css('.bi-geo-alt-fill'));
    expect(icon).toBeTruthy();

    const label = addressDiv.query(By.css('p.font-semibold'));
    expect(label.nativeElement.textContent).toContain('Address');
  });


  it('should have main layout and style classes', () => {
    const container = fixture.debugElement.query(By.css('.bg-gradient-to-br'));
    expect(container).toBeTruthy();
    expect(container.nativeElement.className).toContain('rounded-2xl');
    expect(container.nativeElement.className).toContain('border');
    expect(container.nativeElement.className).toContain('p-6');
    expect(container.nativeElement.className).toContain('shadow-sm');
  });
});
