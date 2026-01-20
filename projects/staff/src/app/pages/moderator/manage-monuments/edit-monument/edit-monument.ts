import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MonumentService } from '@core/services/monument/monument.service';
import { MonumentRequestDto } from '@api/model/monument-request-dto';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { FormMonument } from '../form-monument/form-monument';
import { AppToolbarComponent } from '../../../../components/toolbar/toolbar.component';

import { take } from 'rxjs';

@Component({
  selector: 'app-edit-monument',
  standalone: true,
  imports: [CommonModule, Toast, FormMonument, AppToolbarComponent],
  providers: [MessageService, MonumentService],
  template: `
    <app-toolbar
      title="Edit Monument"
      [subtitle]="monument ? monument.name : 'Loading...'"
      [showBackButton]="true"
      (back)="goBack()"></app-toolbar>
    <p-toast />
    @if (monument) {
      <div class="card">
        <app-form-monument
          [monument]="monument"
          (save)="updateMonument($event)"
          (cancel)="goBack()"></app-form-monument>
      </div>
    }
    @if (loading) {
      <div class="card">
        <p>Loading monument...</p>
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
export class EditMonument implements OnInit {
  monument?: MonumentResponseDto;
  loading = true;
  monumentId!: number;

  constructor(
    private monumentService: MonumentService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.monumentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMonument();
  }

  loadMonument() {
    this.monumentService.getMonumentById(this.monumentId)
      .pipe(take(1))
      .subscribe({
        next: (monument) => {
          this.monument = monument;
          this.loading = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error loading monument'
          });
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        }
      });
  }

  updateMonument(event: { monument: MonumentRequestDto, file?: File }): void {
    this.monumentService.updateMonument(this.monumentId, event.monument, event.file)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Monument updated successfully'
          });
          setTimeout(() => this.goBack(), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error updating monument'
          });
        }
      });
  }

  goBack() {
    this.router.navigate(['/moderator/monuments']);
  }
}
