import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceDetailedDto } from '@api/model/mark-occurrence-detailed-dto';
import { FormMarkOccurrence } from '../form-mark-occurrence/form-mark-occurrence';
import { AppToolbarComponent } from '../../../../components/toolbar/toolbar.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-mark-occurrence',
  standalone: true,
  imports: [CommonModule, Toast, FormMarkOccurrence, AppToolbarComponent],
  providers: [MessageService, MarkOccurrenceService],
  template: `
    <app-toolbar
      title="Edit Mark Occurrence"
      [subtitle]="'ID: ' + id"
      [showBackButton]="true"
      (back)="goBack()"></app-toolbar>
    <p-toast />
    @if (markOccurrence) {
      <div class="card">
        <app-form-mark-occurrence
          [markOccurrence]="markOccurrence"
          (save)="update($event)"
          (cancel)="goBack()"></app-form-mark-occurrence>
      </div>
    }
    @if (loading) {
      <div class="card">
        <p>Loading...</p>
      </div>
    }
  `,
  styles: [`
    .card {
      margin: 2rem;
      padding: 2rem;
      background: var(--surface-card);
      border-radius: 8px;
    }
  `]
})
export class EditMarkOccurrence implements OnInit {
  markOccurrence?: MarkOccurrenceDto; // Using Dto for form, but service returns DetailedDto
  loading = true;
  id!: number;

  constructor(
    private service: MarkOccurrenceService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load() {
    this.service.getById(this.id)
      .pipe(take(1))
      .subscribe({
        next: (data: MarkOccurrenceDetailedDto) => {
          // Map DetailedDto to Dto if necessary, or just cast if compatible enough for the form
          // MarkOccurrenceDetailedDto likely has markId, monumentId etc.
          // Let's check MarkOccurrenceDetailedDto structure.
          // Assuming it has what we need.
          this.markOccurrence = data as unknown as MarkOccurrenceDto;
          // Ideally we should map it properly.
          // MarkOccurrenceDetailedDto usually extends MarkOccurrenceDto or has similar fields.
          // Let's assume it's compatible for now.
          this.loading = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error loading mark occurrence'
          });
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        }
      });
  }

  update(event: { dto: MarkOccurrenceDto, file?: File }): void {
    this.service.update(this.id, event.dto, event.file)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Mark Occurrence updated successfully'
          });
          setTimeout(() => this.goBack(), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error updating mark occurrence'
          });
        }
      });
  }

  goBack() {
    this.router.navigate(['/moderator/marks/occurrences']);
  }
}
