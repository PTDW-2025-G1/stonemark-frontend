import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MarkService } from '@core/services/mark/mark.service';
import { MarkDto } from '@api/model/mark-dto';
import { FormMark } from '../form-mark/form-mark';
import { AppToolbarComponent } from '../../../../components/toolbar/toolbar.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-mark',
  standalone: true,
  imports: [CommonModule, Toast, FormMark, AppToolbarComponent],
  providers: [MessageService, MarkService],
  template: `
    <app-toolbar
      title="Create Mark"
      subtitle="Add a new mark"
      [showBackButton]="true"
      (back)="goBack()">
    </app-toolbar>
    <p-toast />
    <div class="card">
      <app-form-mark
        (save)="createMark($event)"
        (cancel)="goBack()"></app-form-mark>
    </div>
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
export class CreateMark {
  constructor(
    private markService: MarkService,
    private messageService: MessageService,
    private router: Router
  ) {}

  createMark(event: { mark: MarkDto, file?: File, coverId?: number }): void {
    const markToSave = { ...event.mark };
    if (event.coverId) {
        markToSave.coverId = event.coverId;
    }

    this.markService.createMark(markToSave, event.file)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Mark created successfully'
          });
          setTimeout(() => this.goBack(), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating mark'
          });
        }
      });
  }

  goBack() {
    this.router.navigate(['/moderator/marks']);
  }
}
