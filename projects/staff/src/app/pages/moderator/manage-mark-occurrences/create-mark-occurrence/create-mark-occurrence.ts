import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { FormMarkOccurrence } from '../form-mark-occurrence/form-mark-occurrence';
import { AppToolbarComponent } from '../../../../components/toolbar/toolbar.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-mark-occurrence',
  standalone: true,
  imports: [CommonModule, Toast, FormMarkOccurrence, AppToolbarComponent],
  providers: [MessageService, MarkOccurrenceService],
  template: `
    <app-toolbar
      title="Create Mark Occurrence"
      subtitle="Add a new mark occurrence"
      [showBackButton]="true"
      (back)="goBack()">
    </app-toolbar>
    <p-toast />
    <div class="card">
      <app-form-mark-occurrence
        [markOccurrence]="initialData"
        (save)="create($event)"
        (cancel)="goBack()"></app-form-mark-occurrence>
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
export class CreateMarkOccurrence implements OnInit {
  initialData?: MarkOccurrenceDto;

  constructor(
    private service: MarkOccurrenceService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['markId']) {
        this.initialData = { markId: Number(params['markId']) };
      }
    });
  }

  create(event: { dto: MarkOccurrenceDto, file?: File }): void {
    this.service.create(event.dto, event.file)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Mark Occurrence created successfully'
          });
          setTimeout(() => this.goBack(), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating mark occurrence'
          });
        }
      });
  }

  goBack() {
    this.router.navigate(['/moderator/marks/occurrences']);
  }
}
