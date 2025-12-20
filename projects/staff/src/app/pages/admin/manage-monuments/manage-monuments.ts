import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MonumentService } from '@core/services/monument/monument.service';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import {Router} from '@angular/router';
import {take} from 'rxjs';
import { ProgressBar } from 'primeng/progressbar';
import { BlockUI } from 'primeng/blockui';

@Component({
  selector: 'app-manage-monuments',
  standalone: true,
  imports: [CommonModule, Toast, ButtonModule, AppToolbarComponent, AppTableComponent, ConfirmDialog, ProgressBar, BlockUI],
  template: `
    <app-toolbar
      title="Manage Monuments"
      subtitle="Manage monuments in the system."
      [showImport]="true"
      [showExport]="true"
      (import)="importMonuments()"
      (export)="exportCSV()">
    </app-toolbar>
    <p-toast />
    <p-confirmDialog />

    <p-blockUI [blocked]="isImporting()" [style]="{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 'z-index': 9999}">
      <div *ngIf="isImporting()" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10000;">
        <i class="pi pi-spin pi-spinner" style="font-size: 3rem; color: var(--primary-color);"></i>
        <p style="margin-top: 1.5rem; font-size: 1.2rem; font-weight: 500; color: #333;">Importing monuments...</p>
        <p-progressBar mode="indeterminate" [style]="{'height': '6px', 'width': '300px', 'margin-top': '1rem'}"></p-progressBar>
      </div>
    </p-blockUI>

    <div class="mb-3" style="display: flex; justify-content: flex-end;">
      <p-button
        label="Create Monument"
        icon="pi pi-plus"
        (onClick)="createMonument()"></p-button>
    </div>

    <app-table #table [data]="monuments()" [columns]="cols" [globalFilterFields]="['id', 'name', 'protectionTitle', 'latitude', 'longitude', 'createdAt', 'lastModifiedAt']">
      <ng-template #actions let-monument>
        <p-button
          label="Edit"
          icon="pi pi-pencil"
          severity="info"
          class="mr-2"
          (onClick)="editMonument(monument)"></p-button>

        <p-button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          (onClick)="deleteMonument(monument)"></p-button>
      </ng-template>
    </app-table>
  `,
  providers: [MessageService, MonumentService, ConfirmationService]
})
export class ManageMonuments implements OnInit {
  monuments = signal<MonumentResponseDto[]>([]);
  isImporting = signal<boolean>(false);
  @ViewChild('table') tableComp!: AppTableComponent;

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'protectionTitle', header: 'Protection Title' },
    { field: 'latitude', header: 'Latitude' },
    { field: 'longitude', header: 'Longitude' },
    { field: 'createdAt', header: 'Created At', type: 'date' },
    { field: 'lastModifiedAt', header: 'Modified At', type: 'date' }
  ];

  constructor(
    private monumentService: MonumentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMonuments();
  }

  loadMonuments(): void {
    this.monumentService.getMonuments()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          const formatted = data.map(item => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString('pt-PT') : '',
            lastModifiedAt: item.lastModifiedAt ? new Date(item.lastModifiedAt).toLocaleString('pt-PT') : ''
          }));
          this.monuments.set(formatted);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error loading monuments'
          });
        }
      });
  }

  createMonument(){
    this.router.navigate(['/admin/monuments/create']);
  }

  editMonument(monument: MonumentResponseDto) {
    this.router.navigate(['/admin/monuments/edit', monument.id]);
  }

  deleteMonument(monument: MonumentResponseDto): void {
    if (!monument.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Monument ID invalid'
      });
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete the monument "${monument.name}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.monumentService.deleteMonument(monument.id!)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Monument deleted successfully'
              });
              this.loadMonuments();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error deleting monument'
              });
            }
          });
      }
    });
  }


  importMonuments() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.geojson';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const geoJsonContent = e.target.result;

            // Set loading state to true
            this.isImporting.set(true);

            this.monumentService.importMonumentsFromOverpass(geoJsonContent).subscribe({
              next: (monuments) => {
                this.isImporting.set(false);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: `${monuments.length} monuments imported successfully`
                });
                this.loadMonuments();
              },
              error: (error) => {
                this.isImporting.set(false);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: error.error?.message || error.message || 'Error importing monuments'
                });
              }
            });
          } catch (parseError) {
            this.isImporting.set(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Invalid JSON file'
            });
          }
        };

        reader.onerror = () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error reading file'
          });
        };

        reader.readAsText(file);
      }
    };

    input.click();
  }

  exportCSV() {
    this.tableComp?.exportCSV();
  }
}
