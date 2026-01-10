import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactFormComponent } from './contact-form';
import { FormBuilder } from '@angular/forms';
import { of, throwError, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;

  let contactService: any;
  let profileService: any;
  let authService: any;
  let translateService: any;

  beforeEach(() => {
    contactService = {
      create: vi.fn()
    };

    profileService = {
      getCurrentUser: vi.fn()
    };

    authService = {
      getAccessToken: vi.fn()
    };

    translateService = {
      instant: vi.fn((key: string) => key),
      onLangChange: new Subject()
    };

    component = new ContactFormComponent(
      new FormBuilder(),
      contactService,
      profileService,
      authService,
      translateService as TranslateService
    );
  });

  it('should create component and form', () => {
    expect(component).toBeTruthy();
    expect(component.contactForm).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.contactForm.invalid).toBe(true);
  });

  it('should validate required fields', () => {
    component.contactForm.setValue({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    expect(component.contactForm.invalid).toBe(true);
    expect(component.contactForm.get('name')?.hasError('required')).toBe(true);
    expect(component.contactForm.get('email')?.hasError('required')).toBe(true);
    expect(component.contactForm.get('subject')?.hasError('required')).toBe(true);
    expect(component.contactForm.get('message')?.hasError('required')).toBe(true);
  });

  it('should validate email format', () => {
    component.contactForm.setValue({
      name: 'John',
      email: 'invalid',
      subject: 'General',
      message: 'Valid message content'
    });

    expect(component.contactForm.get('email')?.hasError('email')).toBe(true);
  });

  it('should validate minlength for message', () => {
    component.contactForm.setValue({
      name: 'John',
      email: 'john@test.com',
      subject: 'General',
      message: 'short'
    });

    expect(component.contactForm.get('message')?.hasError('minlength')).toBe(true);
  });

  it('should populate subject options on init', () => {
    component.ngOnInit();

    expect(component.subjectOptions.length).toBe(6);
    expect(translateService.instant).toHaveBeenCalled();
  });

  it('should refresh subject options on language change', () => {
    component.ngOnInit();

    const initialCallCount = translateService.instant.mock.calls.length;

    translateService.onLangChange.next({ lang: 'pt' });

    expect(translateService.instant.mock.calls.length).toBeGreaterThan(initialCallCount);
  });

  it('should prefill name when user is authenticated', () => {
    authService.getAccessToken.mockReturnValue('token');
    profileService.getCurrentUser.mockReturnValue(
      of({ firstName: 'John', lastName: 'Doe' })
    );

    component.ngOnInit();

    expect(component.contactForm.get('name')?.value).toBe('John Doe');
  });

  it('should not prefill user data when not authenticated', () => {
    authService.getAccessToken.mockReturnValue(null);

    component.ngOnInit();

    expect(profileService.getCurrentUser).not.toHaveBeenCalled();
  });

  it('should not submit when form is invalid', () => {
    component.onSubmit();

    expect(contactService.create).not.toHaveBeenCalled();
  });

  it('should submit form successfully', () => {
    contactService.create.mockReturnValue(of({}));

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@test.com',
      subject: 'General',
      message: 'This is a valid message'
    });

    component.onSubmit();

    expect(contactService.create).toHaveBeenCalledOnce();
    expect(component.isSubmitting).toBe(false);
    expect(component.submitSuccess).toBe(true);
    expect(component.submitError).toBe(false);
  });

  it('should handle generic submit error', () => {
    contactService.create.mockReturnValue(
      throwError(() => ({ status: 500 }))
    );

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@test.com',
      subject: 'General',
      message: 'This is a valid message'
    });

    component.onSubmit();

    expect(component.submitError).toBe(true);
    expect(component.submitSuccess).toBe(false);
  });

  it('should handle validation errors from API (400)', () => {
    contactService.create.mockReturnValue(
      throwError(() => ({
        status: 400,
        error: {
          name: 'Invalid name',
          email: 'Invalid email'
        }
      }))
    );

    component.contactForm.setValue({
      name: 'Bad',
      email: 'bad@email',
      subject: 'General',
      message: 'This is a valid message'
    });

    component.onSubmit();

    expect(component.fieldErrors['name']).toBe('Invalid name');
    expect(component.fieldErrors['email']).toBe('Invalid email');
    expect(component.submitError).toBe(false);
  });
});
