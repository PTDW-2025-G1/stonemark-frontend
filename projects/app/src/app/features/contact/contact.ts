import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {ContactHeroSectionComponent} from '@features/contact/sections/hero-section';
import {ContactFormComponent} from '@features/contact/sections/contact-form';
import {ContactInfoComponent} from '@features/contact/sections/contact-info';
import {ResponseTimeComponent} from '@features/contact/sections/response-time';
import {FaqSectionComponent} from '@features/contact/sections/faq-section';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContactHeroSectionComponent, ContactFormComponent, ContactInfoComponent, ResponseTimeComponent, FaqSectionComponent],
  templateUrl: './contact.html'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    window.scrollTo(0, 0);
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
}
