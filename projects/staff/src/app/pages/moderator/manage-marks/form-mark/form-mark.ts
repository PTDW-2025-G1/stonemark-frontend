import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { MarkDto } from '@api/model/mark-dto';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-form-mark',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TextareaModule,
    DividerModule,
    FileUploadModule,
    SelectModule
  ],
  providers: [MarkOccurrenceService],
  template: `
    <form [formGroup]="markForm" (ngSubmit)="onSubmit()" class="mark-form">
      <section class="form-section">
        <h3 class="section-title">Mark Information</h3>

        <div class="field">
          <label for="description">Description</label>
          <textarea
            pTextarea
            id="description"
            formControlName="description"
            rows="5"
            placeholder="Describe the mark..."></textarea>
        </div>
      </section>

      <p-divider></p-divider>

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
          @if (!selectedFile && mark?.coverId) {
            <div class="current-image mt-2">
              <p>Current Image:</p>
              <img
                [src]="getImageUrl(mark!.coverId!)"
                alt="Current cover"
                class="preview-image"
                style="max-width: 200px; width: 100%; height: auto; display: block; border-radius: 4px;" />
            </div>
          }
        </div>

        @if (mark?.id) {
          <div class="field mt-4">
            <label>Or select from existing occurrences</label>
            <p-select
              [options]="occurrences"
              optionLabel="id"
              placeholder="Select an occurrence image"
              styleClass="w-full"
              (onChange)="onOccurrenceSelect($event)">
              <ng-template let-occurrence pTemplate="item">
                <div class="flex align-items-center gap-2">
                  <img [src]="getImageUrl(occurrence.coverId, 'THUMBNAIL')" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
                  <span>Occurrence #{{ occurrence.id }}</span>
                </div>
              </ng-template>
              <ng-template let-occurrence pTemplate="selectedItem">
                 <div class="flex align-items-center gap-2" *ngIf="occurrence">
                  <span>Occurrence #{{ occurrence.id }}</span>
                </div>
              </ng-template>
            </p-select>
          </div>
        }
      </section>

      <p-divider></p-divider>

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
          [disabled]="markForm.invalid || loading"
          [loading]="loading">
          <i class="pi pi-check" style="margin-right: 0.5rem"></i>
          Save
        </button>
      </div>
    </form>
  `,
  styles: `
    .mark-form {
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
      .p-inputtext {
        width: 100%;
      }

      .p-inputtextarea {
        width: 100%;
        resize: vertical;
        font-family: inherit;
      }

      .p-select {
        width: 100%;
      }
    }
  `
})
export class FormMark implements OnInit, OnChanges {
  @Input() mark?: MarkDto;
  @Output() save = new EventEmitter<{ mark: MarkDto, file?: File, coverId?: number }>();
  @Output() cancel = new EventEmitter<void>();

  markForm!: FormGroup;
  loading = false;
  selectedFile?: File;
  occurrences: MarkOccurrenceDto[] = [];
  selectedCoverId?: number;

  constructor(
    private fb: FormBuilder,
    private markOccurrenceService: MarkOccurrenceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mark']) {
      this.updateForm();
      if (this.mark?.id) {
        this.loadOccurrences(this.mark.id);
      }
    }
  }

  private initForm(): void {
    this.markForm = this.fb.group({
      description: ['']
    });
  }

  private updateForm(): void {
    if (this.mark && this.markForm) {
      this.markForm.patchValue({
        description: this.mark.description
      });
    }
  }

  private loadOccurrences(markId: number): void {
    this.markOccurrenceService.getByMarkId(markId, 0, 100).subscribe(page => {
      this.occurrences = page.content?.filter(o => o.coverId) || [];
    });
  }

  onFileSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      this.selectedCoverId = undefined; // Clear selected occurrence image if file is uploaded
    }
  }

  onOccurrenceSelect(event: any): void {
    if (event.value) {
      this.selectedCoverId = event.value.coverId;
      this.selectedFile = undefined; // Clear uploaded file if occurrence image is selected

      // Update preview if needed, or just rely on the fact that we'll send coverId
      if (this.mark) {
         this.mark = { ...this.mark, coverId: this.selectedCoverId };
      }
    }
  }

  clearFile(): void {
    this.selectedFile = undefined;
  }

  onSubmit(): void {
    if (this.markForm.valid) {
      this.loading = true;
      this.save.emit({
        mark: this.markForm.value,
        file: this.selectedFile,
        coverId: this.selectedCoverId
      });
    } else {
      this.markFormGroupTouched(this.markForm);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getImageUrl(coverId: number, variant: keyof typeof ImageVariant = 'PREVIEW'): string {
    return ImageUtils.getImageUrl(coverId, 'assets/placeholder.png', ImageVariant[variant]);
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
