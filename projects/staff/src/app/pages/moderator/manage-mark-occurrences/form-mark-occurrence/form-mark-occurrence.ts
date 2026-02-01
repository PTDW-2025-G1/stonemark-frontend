import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceRequestDto } from '@api/model/mark-occurrence-request-dto';
import { MarkService } from '@core/services/mark/mark.service';
import { AdminMarkService } from '@core/services/mark/admin-mark.service';
import { AdminMonumentService } from '@core/services/monument/admin-monument.service';
import { MarkDto } from '@api/model/mark-dto';
import { MonumentListDto } from '@api/model/monument-list-dto';
import { take } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';

@Component({
  selector: 'app-form-mark-occurrence',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    ButtonModule,
    DividerModule,
    FileUploadModule,
    TooltipModule,
    CheckboxModule
  ],
  providers: [MarkService, AdminMarkService, AdminMonumentService],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="mark-occurrence-form">
      <section class="form-section">
        <h3 class="section-title">Occurrence Information</h3>

        <div class="field">
          <label for="mark" class="required">Mark</label>
          <div class="flex gap-2">
            <p-select
              id="mark"
              [options]="marks"
              formControlName="markId"
              optionLabel="description"
              optionValue="id"
              [filter]="true"
              filterBy="description"
              [showClear]="true"
              placeholder="Select a Mark"
              styleClass="w-full">
              <ng-template let-mark pTemplate="item">
                <div class="flex align-items-center gap-2">
                  @if (mark.coverId) {
                    <img [src]="getImageUrl(mark.coverId)" alt="Mark cover" style="width: 100px; height: 100px; border-radius: 4px; object-fit: cover; image-rendering: high-quality;" />
                  }
                  <div>{{ mark.description }}</div>
                </div>
              </ng-template>
              <ng-template let-mark pTemplate="selectedItem">
                <div class="flex align-items-center gap-2" *ngIf="mark">
                  @if (mark.coverId) {
                    <img [src]="getImageUrl(mark.coverId)" alt="Mark cover" style="width: 50px; height: 50px; border-radius: 4px; object-fit: cover; image-rendering: high-quality;" />
                  }
                  <div>{{ mark.description }}</div>
                </div>
              </ng-template>
            </p-select>
            <p-fileUpload
              mode="basic"
              chooseIcon="pi pi-camera"
              accept="image/*"
              [maxFileSize]="10000000"
              [customUpload]="true"
              (uploadHandler)="onSearchImageUpload($event)"
              [auto]="true"
              pTooltip="Search by Image"
              tooltipPosition="top"
              [disabled]="searching">
            </p-fileUpload>
          </div>
          @if (searching) {
            <small class="block mt-1">Searching for similar marks...</small>
          }
          @if (markIdControl?.invalid && markIdControl?.touched) {
            <small class="p-error">Mark is required</small>
          }
        </div>

        <div class="field">
          <label for="monument" class="required">Monument</label>
          <p-select
            id="monument"
            [options]="monuments"
            formControlName="monumentId"
            optionLabel="name"
            optionValue="id"
            [filter]="true"
            filterBy="name"
            [showClear]="true"
            placeholder="Select a Monument"
            styleClass="w-full">
          </p-select>
          @if (monumentIdControl?.invalid && monumentIdControl?.touched) {
            <small class="p-error">Monument is required</small>
          }
        </div>

        <div class="field-checkbox">
          <p-checkbox formControlName="active" [binary]="true" inputId="active"></p-checkbox>
          <label for="active">Active</label>
        </div>
      </section>

      <p-divider></p-divider>

      <section class="form-section">
        <h3 class="section-title">Media</h3>
        <div class="field">
          <label class="required">Cover Image</label>
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
          @if (!selectedFile && markOccurrence?.coverId) {
            <div class="current-image mt-2">
              <p>Current Image:</p>
              <img
                [src]="getImageUrl(markOccurrence!.coverId!)"
                alt="Current cover"
                style="max-width: 200px; width: 100%; height: auto; display: block; border-radius: 4px;" />
            </div>
          }
          @if (imageError) {
            <small class="p-error block mt-2">Cover image is required</small>
          }
        </div>
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
          [disabled]="loading"
          [loading]="loading">
          <i class="pi pi-check" style="margin-right: 0.5rem"></i>
          Save
        </button>
      </div>
    </form>
  `,
  styles: `
    .mark-occurrence-form {
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

    .field label.required::after {
      content: ' *';
      color: var(--red-500);
    }

    .field-checkbox {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .field-checkbox label {
      margin-left: 0.5rem;
      margin-bottom: 0;
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
      .p-select {
        width: 100%;
      }
    }
  `
})
export class FormMarkOccurrence implements OnInit, OnChanges {
  @Input() markOccurrence?: MarkOccurrenceDto;
  @Output() save = new EventEmitter<{ dto: MarkOccurrenceRequestDto, file?: File }>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  selectedFile?: File;
  marks: MarkDto[] = [];
  monuments: MonumentListDto[] = [];
  searching = false;
  imageError = false;

  constructor(
    private fb: FormBuilder,
    private markService: MarkService,
    private adminMarkService: AdminMarkService,
    private adminMonumentService: AdminMonumentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markOccurrence']) {
      this.updateForm();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      markId: [null, Validators.required],
      monumentId: [null, Validators.required],
      active: [true]
    });
  }

  private loadData(): void {
    this.adminMarkService.getMarksManagement(0, 100).pipe(take(1)).subscribe(page => {
      this.marks = page.content || [];
    });
    this.adminMonumentService.getMonumentsManagement(0, 100).pipe(take(1)).subscribe(page => {
      this.monuments = (page.content as unknown as MonumentListDto[]) || [];
    });
  }

  private updateForm(): void {
    if (this.markOccurrence && this.form) {
      this.form.patchValue({
        markId: this.markOccurrence.markId,
        monumentId: this.markOccurrence.monumentId,
        active: this.markOccurrence.active !== undefined ? this.markOccurrence.active : true
      });
      // If markOccurrence has monumentId directly
       if ((this.markOccurrence as any).monumentId) {
          this.form.patchValue({ monumentId: (this.markOccurrence as any).monumentId });
       }
    }
  }

  get markIdControl() {
    return this.form.get('markId');
  }

  get monumentIdControl() {
    return this.form.get('monumentId');
  }

  onFileSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      this.imageError = false;
    }
  }

  onSearchImageUpload(event: any): void {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      this.searching = true;
      this.markService.searchByImage(file).pipe(take(1)).subscribe({
        next: (similarMarkIds: string[]) => {
          this.searching = false;
          if (similarMarkIds && similarMarkIds.length > 0) {
             const bestMatchId = Number(similarMarkIds[0]);
             const foundMark = this.marks.find(m => m.id === bestMatchId);

             if (foundMark) {
               this.form.patchValue({ markId: bestMatchId });
               this.messageService.add({ severity: 'success', summary: 'Found', detail: 'Similar mark found and selected' });
             } else {
               this.markService.getMark(bestMatchId).pipe(take(1)).subscribe(mark => {
                 this.marks = [mark, ...this.marks];
                 this.form.patchValue({ markId: bestMatchId });
                 this.messageService.add({ severity: 'success', summary: 'Found', detail: 'Similar mark found and selected' });
               });
             }
          } else {
            this.messageService.add({ severity: 'info', summary: 'No Match', detail: 'No similar marks found' });
          }
        },
        error: () => {
          this.searching = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error searching for marks' });
        }
      });
    }
  }

  clearFile(): void {
    this.selectedFile = undefined;
  }

  onSubmit(): void {
    const hasImage = !!this.selectedFile || !!this.markOccurrence?.coverId;

    this.imageError = !hasImage;

    if (this.form.valid && hasImage) {
      this.loading = true;

      const dto: MarkOccurrenceRequestDto = {
        markId: this.form.value.markId,
        monumentId: this.form.value.monumentId,
        active: this.form.value.active,
        coverId: this.markOccurrence?.coverId,
        publishedAt: this.markOccurrence?.publishedAt
      };

      this.save.emit({
        dto: dto,
        file: this.selectedFile
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getImageUrl(coverId: number): string {
    return ImageUtils.getImageUrl(coverId, 'assets/placeholder.png', ImageVariant.PREVIEW);
  }
}
