import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AdministrativeDivisionService } from '@core/services/administrative-division/administrative-division.service';
import { AdministrativeDivisionDto } from '@api/model/administrative-division-dto';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { BlockUI } from 'primeng/blockui';
import { take, Observable } from 'rxjs';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-manage-divisions',
  standalone: true,
  imports: [CommonModule, Toast, ButtonModule, AppToolbarComponent, AppTableComponent, ProgressBar, BlockUI, DialogModule],
  template: `
    <app-toolbar
      title="Manage Administrative Divisions"
      subtitle="View administrative divisions."
      [showImport]="true"
      [showExport]="true"
      (import)="importDivisions()"
      (export)="exportCSV()">
    </app-toolbar>
    <p-toast />

    <p-blockUI [blocked]="isImporting()" [style]="{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 'z-index': 9999}">
      <div *ngIf="isImporting()" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10000;">
        <i class="pi pi-spin pi-spinner" style="font-size: 3rem; color: var(--primary-color);"></i>
        <p style="margin-top: 1.5rem; font-size: 1.2rem; font-weight: 500; color: #333;">Importing divisions...</p>
        <p-progressBar mode="indeterminate" [style]="{'height': '6px', 'width': '300px', 'margin-top': '1rem'}"></p-progressBar>
      </div>
    </p-blockUI>

    <div class="mb-3" style="display: flex; gap: 1rem;">
        <p-button label="Districts" (onClick)="loadDistricts()"></p-button>
        <p-button label="Municipalities" (onClick)="loadMunicipalities()"></p-button>
        <p-button label="Parishes" (onClick)="loadParishes()"></p-button>
    </div>

    <app-table #table [data]="divisions()" [columns]="cols" [globalFilterFields]="['id', 'name', 'osmAdminLevel', 'monumentsCount']">
        <ng-template #actions let-division>
            <p-button
              *ngIf="division.osmAdminLevel < 8"
              label="View Children"
              icon="pi pi-sitemap"
              (onClick)="viewChildren(division)"></p-button>
        </ng-template>
    </app-table>

    <p-dialog
      *ngIf="selectedDivision()"
      header="Children of {{ selectedDivision()?.name }}"
      [visible]="isDialogVisible()"
      (visibleChange)="isDialogVisible.set($event)"
      [modal]="true"
      [style]="{ width: '75vw' }"
      (onHide)="children.set([]); selectedDivision.set(null)">
      <app-table [data]="children()" [columns]="cols" [globalFilterFields]="['id', 'name', 'osmAdminLevel', 'monumentsCount']">
      </app-table>
    </p-dialog>
  `,
  providers: [MessageService, AdministrativeDivisionService]
})
export class ManageDivisions implements OnInit {
  divisions = signal<AdministrativeDivisionDto[]>([]);
  isImporting = signal<boolean>(false);
  isDialogVisible = signal(false);
  selectedDivision = signal<AdministrativeDivisionDto | null>(null);
  children = signal<AdministrativeDivisionDto[]>([]);

  @ViewChild('table') tableComp!: AppTableComponent;

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'osmAdminLevel', header: 'Admin Level' },
    { field: 'monumentsCount', header: 'Monuments' }
  ];

  constructor(
    private divisionService: AdministrativeDivisionService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadDistricts();
  }

  loadDistricts(): void {
    this.divisionService.getDistricts()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.divisions.set(data);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error loading districts'
          });
        }
      });
  }

  loadMunicipalities(): void {
    this.divisionService.getMunicipalities()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.divisions.set(data);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error loading municipalities'
          });
        }
      });
  }

  loadParishes(): void {
    this.divisionService.getParishes()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.divisions.set(data);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error loading parishes'
          });
        }
      });
  }

  importDivisions() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pbf';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.isImporting.set(true);
        this.divisionService.importDivisionsFromPbf(file).subscribe({
          next: (response) => {
            this.isImporting.set(false);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });
            this.loadDistricts();
          },
          error: (error) => {
            this.isImporting.set(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error?.message || error.message || 'Error importing divisions'
            });
          }
        });
      }
    };

    input.click();
  }

  exportCSV() {
    this.tableComp?.exportCSV();
  }

  viewChildren(division: AdministrativeDivisionDto) {
    if (!division.id) return;

    this.selectedDivision.set(division);
    let children$: Observable<AdministrativeDivisionDto[]>;

    if (division.osmAdminLevel === 6) { // District
      children$ = this.divisionService.getMunicipalitiesByDistrict(division.id);
    } else if (division.osmAdminLevel === 7) { // Municipality
      children$ = this.divisionService.getParishesByMunicipality(division.id);
    } else {
      return; // Parishes have no children to view in this context
    }

    children$.pipe(take(1)).subscribe({
      next: (data) => {
        this.children.set(data);
        this.isDialogVisible.set(true);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error loading children divisions'
        });
      }
    });
  }
}
