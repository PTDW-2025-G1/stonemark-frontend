import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { MarkService } from '@core/services/mark/mark.service';
import { MarkDetailedDto } from '@api/model/mark-detailed-dto';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { take } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-manage-marks',
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
    AppToolbarComponent
  ],
  providers: [MessageService, ConfirmationService, MarkService],
  template: `
    <app-toolbar title="Manage Marks" subtitle="Create, update and delete marks"></app-toolbar>
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
        [value]="marks"
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
            <th style="width: 10rem">Image</th>
            <th pSortableColumn="description">Description <p-sortIcon field="description"></p-sortIcon></th>
            <th>Actions</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-mark>
          <tr>
            <td>{{mark.id}}</td>
            <td>
              @if (mark.coverId) {
                <img [src]="getImageUrl(mark.coverId)" [alt]="mark.description" width="100" class="shadow-4" />
              }
            </td>
            <td>{{mark.description}}</td>
            <td>
              <button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" (click)="editMark(mark)"></button>
              <button pButton pRipple icon="pi pi-tags" class="p-button-rounded p-button-info mr-2" (click)="manageOccurrences(mark)"></button>
              <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-warning" (click)="deleteMark(mark)"></button>
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
  `]
})
export class ManageMarks implements OnInit {
  marks: MarkDetailedDto[] = [];
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;

  constructor(
    private markService: MarkService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMarks(0, this.rows);
  }

  loadMarks(page: number, size: number) {
    this.markService.getDetailedMarks(page, size)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.marks = response.content || [];
          this.totalRecords = response.totalElements || 0;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load marks' });
        }
      });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.loadMarks(event.page, event.rows);
  }

  openNew() {
    this.router.navigate(['/admin/marks/create']);
  }

  editMark(mark: MarkDetailedDto) {
    this.router.navigate(['/admin/marks/edit', mark.id]);
  }

  manageOccurrences(mark: MarkDetailedDto) {
    this.router.navigate(['/admin/marks/occurrences'], { queryParams: { markId: mark.id } });
  }

  deleteMark(mark: MarkDetailedDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this mark?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (mark.id) {
          this.markService.deleteMark(mark.id)
            .pipe(take(1))
            .subscribe({
              next: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mark Deleted' });
                this.loadMarks(this.first / this.rows, this.rows);
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete mark' });
              }
            });
        }
      }
    });
  }

  getImageUrl(coverId: number): string {
    return `${environment.apiUrl}/media/${coverId}`;
  }
}
