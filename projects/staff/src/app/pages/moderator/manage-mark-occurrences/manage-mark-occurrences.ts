import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { take } from 'rxjs';
import { environment } from '@env/environment';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-manage-mark-occurrences',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    PaginatorModule,
    RouterModule,
    AppToolbarComponent,
    TagModule
  ],
  providers: [MessageService, ConfirmationService, MarkOccurrenceService],
  template: `
    <app-toolbar title="Manage Mark Occurrences" subtitle="Create, update and delete mark occurrences"></app-toolbar>
    <p-toast></p-toast>
    <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>

    <div class="card">
      <p-toolbar styleClass="mb-4 gap-2">
        <ng-template pTemplate="left">
          <button pButton pRipple label="New" icon="pi pi-plus" class="p-button-success mr-2" (click)="openNew()"></button>
        </ng-template>
      </p-toolbar>

      <p-table
        #dt
        [value]="occurrences"
        [rows]="10"
        [paginator]="false"
        [tableStyle]="{'min-width': '75rem'}"
        [rowHover]="true"
        dataKey="id"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        [showCurrentPageReport]="true">

        <ng-template pTemplate="header">
          <tr>
            <th style="width: 4rem">ID</th>
            <th>Monument</th>
            <th>Published At</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-occurrence>
          <tr>
            <td>{{occurrence.id}}</td>
            <td>
              @if (occurrence.monument) {
                <a [routerLink]="['/moderator/monuments/edit', occurrence.monument.id]" class="text-primary hover:underline cursor-pointer font-medium">
                  {{occurrence.monument.name}}
                </a>
              } @else {
                N/A
              }
            </td>
            <td>{{occurrence.publishedAt | date:'short'}}</td>
            <td>
              <p-tag [value]="occurrence.active ? 'Active' : 'Inactive'" [severity]="occurrence.active ? 'success' : 'danger'"></p-tag>
            </td>
            <td>
              <button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" (click)="editOccurrence(occurrence)"></button>
              <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-warning" (click)="deleteOccurrence(occurrence)"></button>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <p-paginator
        (onPageChange)="onPageChange($event)"
        [first]="first"
        [rows]="rows"
        [totalRecords]="totalRecords"
        [rowsPerPageOptions]="[10, 20, 30]">
      </p-paginator>
    </div>
  `,
  styles: [`
    .card {
      margin: 2rem;
      padding: 2rem;
      background: var(--surface-card);
      border-radius: 8px;
    }

    a {
      text-decoration: none;
    }
  `]
})
export class ManageMarkOccurrences implements OnInit {
  occurrences: MarkOccurrenceDto[] = [];
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;
  markId?: number;

  constructor(
    private service: MarkOccurrenceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.markId = params['markId'] ? Number(params['markId']) : undefined;
      if (!this.markId) {
        this.loadOccurrences(0, this.rows);
      } else {
        this.loadOccurrences(0, this.rows);
      }
    });
  }

  loadOccurrences(page: number, size: number) {
    if (this.markId) {
      this.service.getByMarkId(this.markId, page, size)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.occurrences = response.content || [];
            this.totalRecords = response.totalElements || 0;
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load occurrences' });
          }
        });
    } else {
        this.service.findAllManagement(page, size)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.occurrences = response.content || [];
            this.totalRecords = response.totalElements || 0;
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load occurrences' });
          }
        });
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.loadOccurrences(event.page, event.rows);
  }

  openNew() {
    this.router.navigate(['/moderator/marks/occurrences/create'], { queryParams: { markId: this.markId } });
  }

  editOccurrence(occurrence: MarkOccurrenceDto) {
    this.router.navigate(['/moderator/marks/occurrences/edit', occurrence.id]);
  }

  deleteOccurrence(occurrence: MarkOccurrenceDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this occurrence?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (occurrence.id) {
          this.service.delete(occurrence.id)
            .pipe(take(1))
            .subscribe({
              next: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Occurrence Deleted' });
                this.loadOccurrences(this.first / this.rows, this.rows);
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete occurrence' });
              }
            });
        }
      }
    });
  }

  getImageUrl(coverId: number): string {
    return ImageUtils.getImageUrl(coverId, 'assets/placeholder.png', ImageVariant.THUMBNAIL);
  }
}
