import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { MonumentRequestDto } from '@api/model/monument-request-dto';
import { MonumentResponseDto } from '@api/model/monument-response-dto';

@Component({
  selector: 'app-form-monument',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    TextareaModule,
    DividerModule,
    FileUploadModule
  ],
  template: `
    <form [formGroup]="monumentForm" (ngSubmit)="onSubmit()" class="monument-form">
      <!-- Section: Basic Information -->
      <section class="form-section">
        <h3 class="section-title">Basic Information</h3>

        <div class="field">
          <label for="name" class="required">Name</label>
          <input
            pInputText
            id="name"
            formControlName="name"
            placeholder="Monument name" />
          @if (nameControl?.invalid && nameControl?.touched) {
            <small class="p-error">Name is required</small>
          }
        </div>

        <div class="field">
          <label for="description">Description</label>
          <textarea
            pTextarea
            id="description"
            formControlName="description"
            rows="5"
            placeholder="Describe the monument..."></textarea>
        </div>

        <div class="field">
          <label for="protectionTitle">Protection Title</label>
          <input
            pInputText
            id="protectionTitle"
            formControlName="protectionTitle"
            placeholder="E.g.: National Monument" />
        </div>

        <div class="field">
          <label for="website">Website</label>
          <input
            pInputText
            id="website"
            formControlName="website"
            type="url"
            placeholder="https://..." />
        </div>
      </section>

      <p-divider></p-divider>

      <!-- Section: Location -->
      <section class="form-section">
        <h3 class="section-title">Location</h3>

        <div class="field">
          <label for="address">Address</label>
          <input
            pInputText
            id="address"
            formControlName="address"
            placeholder="Street, number, etc." />
        </div>

        <div class="field">
          <label for="city">City</label>
          <input
            pInputText
            id="city"
            formControlName="city"
            placeholder="City name" />
        </div>

        <div class="coordinates-group">
          <div class="field">
            <label for="latitude">Latitude</label>
            <p-inputNumber
              id="latitude"
              formControlName="latitude"
              [minFractionDigits]="6"
              [maxFractionDigits]="6"
              [min]="-90"
              [max]="90"
              [showButtons]="true"
              [step]="0.000001"
              placeholder="E.g.: 40.416775">
            </p-inputNumber>
          </div>

          <div class="field">
            <label for="longitude">Longitude</label>
            <p-inputNumber
              id="longitude"
              formControlName="longitude"
              [minFractionDigits]="6"
              [maxFractionDigits]="6"
              [min]="-180"
              [max]="180"
              [showButtons]="true"
              [step]="0.000001"
              placeholder="E.g.: -8.650000">
            </p-inputNumber>
          </div>
        </div>
      </section>

      <p-divider></p-divider>

      <!-- Section: Media -->
      <section class="form-section">
        <h3 class="section-title">Media</h3>
        <div class="field">
          <label>Cover Image</label>
          <p-fileUpload
            mode="basic"
            chooseLabel="Choose Image"
            accept="image/*"
            [maxFileSize]="10000000"
            (onSelect)="onFileSelect($event)"
            [auto]="true">
          </p-fileUpload>
          @if (selectedFile) {
            <div class="selected-file">
              <i class="pi pi-image"></i>
              <span>{{ selectedFile.name }}</span>
              <button pButton icon="pi pi-times" class="p-button-rounded p-button-text p-button-danger p-button-sm" (click)="clearFile()"></button>
            </div>
          }
        </div>
      </section>

      <p-divider></p-divider>

      <!-- Actions -->
      <div class="form-actions">
        <button
          pButton
          type="button"
          class="p-button-secondary p-button-outlined"
          (click)="onCancel()">
          <i class="pi pi-times" style="margin-right: 0.5rem"></i>
          Cancel
        </button>
        <button
          pButton
          type="submit"
          [disabled]="monumentForm.invalid || loading"
          [loading]="loading">
          <i class="pi pi-check" style="margin-right: 0.5rem"></i>
          Save
        </button>
      </div>
    </form>
  `,
  styles: `
    .monument-form {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary-color);
      margin: 0 0 1.5rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--surface-border);
    }

    .field {
      margin-bottom: 1.5rem;
    }

    .field label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-color);
    }

    .field textarea {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }

    .field label.required::after {
      content: ' *';
      color: var(--red-500);
    }

    .coordinates-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    @media (max-width: 768px) {
      .coordinates-group {
        grid-template-columns: 1fr;
      }
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--surface-border);
    }

    .p-error {
      display: block;
      margin-top: 0.25rem;
      font-size: 0.875rem;
    }

    .selected-file {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: var(--surface-ground);
      border-radius: 4px;
    }

    ::ng-deep {
      .p-inputtext,
      .p-inputnumber-input {
        width: 100%;
      }

      .p-inputtextarea {
        width: 100%;
        resize: vertical;
        font-family: inherit;
      }
    }
  `
})
export class FormMonument implements OnInit {
  @Input() monument?: MonumentResponseDto;
  @Output() save = new EventEmitter<{ monument: MonumentRequestDto, file?: File }>();
  @Output() cancel = new EventEmitter<void>();

  monumentForm!: FormGroup;
  loading = false;
  selectedFile?: File;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();

    if (this.monument) {
      this.monumentForm.patchValue(this.monument);
    }
  }

  private initForm(): void {
    this.monumentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      protectionTitle: [''],
      website: [''],
      latitude: [null],
      longitude: [null],
      address: [''],
      city: ['']
    });
  }

  get nameControl() {
    return this.monumentForm.get('name');
  }

  onFileSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
    }
  }

  clearFile(): void {
    this.selectedFile = undefined;
  }

  onSubmit(): void {
    if (this.monumentForm.valid) {
      this.loading = true;
      this.save.emit({
        monument: this.monumentForm.value,
        file: this.selectedFile
      });
    } else {
      this.markFormGroupTouched(this.monumentForm);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
