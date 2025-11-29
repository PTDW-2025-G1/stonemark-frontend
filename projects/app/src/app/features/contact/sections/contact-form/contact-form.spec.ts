import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactFormComponent } from './contact-form';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';


beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

vi.mock('@shared/ui/shared-select/shared-select', () => ({
  SharedSelectComponent: class MockSelectComponent {}
}));

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let contactService: any;
  let profileService: any;
  let authService: any;

  beforeEach(() => {
    contactService = { create: vi.fn() };
    profileService = { getCurrentUser: vi.fn() };
    authService = { getAccessToken: vi.fn() };

    component = new ContactFormComponent(
      new FormBuilder(),
      contactService,
      profileService,
      authService
    );
  });

  it('should have invalid form initially', () => {
    expect(component.contactForm.invalid).toBe(true);
  });

  it('should validate required fields', () => {
    const form = component.contactForm;

    form.setValue({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    expect(form.invalid).toBe(true);
    expect(form.get('name')?.hasError('required')).toBe(true);
    expect(form.get('email')?.hasError('required')).toBe(true);
    expect(form.get('subject')?.hasError('required')).toBe(true);
    expect(form.get('message')?.hasError('required')).toBe(true);
  });

  it('should validate minlength for message', () => {
    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General',
      message: '123'
    });

    expect(component.contactForm.invalid).toBe(true);
    expect(component.contactForm.get('message')?.hasError('minlength')).toBe(true);
  });

  it('should prefill form if user is authenticated', () => {
    authService.getAccessToken.mockReturnValue('token');
    profileService.getCurrentUser.mockReturnValue(
      of({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      })
    );

    component.ngOnInit();

    expect(component.contactForm.get('name')?.value).toBe('John Doe');
    expect(component.contactForm.get('email')?.value).toBe('john@example.com');
  });

  it('should submit form successfully', () => {
    contactService.create.mockReturnValue(of({}));

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General',
      message: 'This is a valid message'
    });

    component.onSubmit();

    expect(component.isSubmitting).toBe(false);
    expect(component.submitSuccess).toBe(true);
    expect(component.submitError).toBe(false);
    expect(contactService.create).toHaveBeenCalledOnce();
  });

  it('should handle submit error', () => {
    contactService.create.mockReturnValue(throwError(() => new Error('fail')));

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General',
      message: 'This is a valid message'
    });

    component.onSubmit();

    expect(component.isSubmitting).toBe(false);
    expect(component.submitSuccess).toBe(false);
    expect(component.submitError).toBe(true);
  });

  it('should not submit when form is invalid', () => {
    component.contactForm.setValue({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    component.onSubmit();

    expect(contactService.create).not.toHaveBeenCalled();
  });
});
