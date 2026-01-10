import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactInfoComponent } from './contact-info';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@test/translate-fake-loader';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactInfoComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactInfoComponent);
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

  it('should render header with info icon', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading).toBeTruthy();

    const icon = heading.query(By.css('.bi-info-circle'));
    expect(icon).toBeTruthy();
  });

  it('should render an email link with mailto', () => {
    const emailLink = fixture.debugElement.query(By.css('a[href^="mailto:"]'));
    expect(emailLink).toBeTruthy();
    expect(emailLink.nativeElement.getAttribute('href'))
      .toBe('mailto:contact@stonemark.org');
  });

  it('should render email icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-envelope-fill'));
    expect(icon).toBeTruthy();
  });

  it('should render location block with icon', () => {
    const icon = fixture.debugElement.query(By.css('.bi-geo-alt-fill'));
    expect(icon).toBeTruthy();
  });

  it('should render two info blocks', () => {
    const blocks = fixture.debugElement.queryAll(By.css('.flex.items-start'));
    expect(blocks.length).toBe(2);
  });

  it('should have proper styling classes on container', () => {
    const container = fixture.debugElement.query(By.css('.bg-gradient-to-br'));
    const classes = container.nativeElement.className;

    expect(classes).toContain('rounded-2xl');
    expect(classes).toContain('border');
    expect(classes).toContain('p-6');
    expect(classes).toContain('shadow-sm');
  });
});
