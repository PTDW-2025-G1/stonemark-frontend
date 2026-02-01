import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MarkOccurrenceService } from '@core/services/mark-occurrence/mark-occurrence.service';
import { AdminMarkOccurrenceService } from '@core/services/mark-occurrence/admin-mark-occurrence.service';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceRequestDto } from '@api/model/mark-occurrence-request-dto';
import { FormMarkOccurrence } from '../form-mark-occurrence/form-mark-occurrence';
import { AppToolbarComponent } from '../../../../components/toolbar/toolbar.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-mark-occurrence',
  standalone: true,
  imports: [CommonModule, Toast, FormMarkOccurrence, AppToolbarComponent],
  providers: [MessageService, MarkOccurrenceService, AdminMarkOccurrenceService],
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
  markOccurrence?: MarkOccurrenceDto;
  loading = true;
  id!: number;

  constructor(
    private service: MarkOccurrenceService,
    private adminService: AdminMarkOccurrenceService,
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
        next: (data: MarkOccurrenceDto) => {
          this.markOccurrence = data;
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

  update(event: { dto: MarkOccurrenceRequestDto, file?: File }): void {
    this.adminService.updateMarkOccurrence(this.id, event.dto, event.file)
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
