import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MonumentService } from '@core/services/monument/monument.service';
import { MonumentRequestDto } from '@api/model/monument-request-dto';
import { FormMonument } from '../form-monument/form-monument';
import { AppToolbarComponent} from '../../../../components/toolbar/toolbar.component';
import {take} from 'rxjs';

@Component({
  selector: 'app-create-monument',
  standalone: true,
  imports: [CommonModule, Toast, FormMonument, AppToolbarComponent],
  providers: [MessageService, MonumentService],
  template: `
    <app-toolbar
      title="Create Monument"
      subtitle="Add a new monument"
      [showBackButton]="true"
      (back)="goBack()"></app-toolbar>
    <p-toast />
    <div class="card">
      <app-form-monument
        (save)="createMonument($event)"
        (cancel)="goBack()"></app-form-monument>
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
export class CreateMonument {
  constructor(
    private monumentService: MonumentService,
    private messageService: MessageService,
    private router: Router
  ) {}

  createMonument(monument: MonumentRequestDto): void {
    this.monumentService.createMonument(monument)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Monument created successfully'
          });
          setTimeout(() => this.goBack(), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating monument'
          });
        }
      });
  }

  goBack() {
    this.router.navigate(['/admin/monuments']);
  }
}
