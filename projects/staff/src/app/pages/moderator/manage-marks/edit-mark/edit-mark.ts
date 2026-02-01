import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MarkService } from '@core/services/mark/mark.service';
import { AdminMarkService } from '@core/services/mark/admin-mark.service';
import { MarkDto } from '@api/model/mark-dto';
import { FormMark } from '../form-mark/form-mark';
import { AppToolbarComponent } from '../../../../components/toolbar/toolbar.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-mark',
  standalone: true,
  imports: [CommonModule, Toast, FormMark, AppToolbarComponent],
  providers: [MessageService, MarkService, AdminMarkService],
  template: `
    <app-toolbar
      title="Edit Mark"
      [subtitle]="mark ? mark.description : 'Loading...'"
      [showBackButton]="true"
      (back)="goBack()"></app-toolbar>
    <p-toast />
    @if (mark) {
      <div class="card">
        <app-form-mark
          [mark]="mark"
          (save)="updateMark($event)"
          (cancel)="goBack()"></app-form-mark>
      </div>
    }
    @if (loading) {
      <div class="card">
        <p>Loading mark...</p>
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
export class EditMark implements OnInit {
  mark?: MarkDto;
  loading = true;
  markId!: number;

  constructor(
    private markService: MarkService,
    private adminMarkService: AdminMarkService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.markId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMark();
  }

  loadMark() {
    this.markService.getMark(this.markId)
      .pipe(take(1))
      .subscribe({
        next: (mark) => {
          this.mark = mark;
          this.loading = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error loading mark'
          });
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        }
      });
  }

  updateMark(event: { mark: MarkDto, file?: File, coverId?: number }): void {
    const markToUpdate = { ...this.mark, ...event.mark };
    if (event.coverId) {
        markToUpdate.coverId = event.coverId;
    }

    this.adminMarkService.updateMark(this.markId, markToUpdate, event.file)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Mark updated successfully'
          });
          setTimeout(() => this.goBack(), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error updating mark'
          });
        }
      });
  }

  goBack() {
    this.router.navigate(['/moderator/marks']);
  }
}
