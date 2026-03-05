import { Component, OnInit, signal, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MonumentService } from '@core/services/monument/monument.service';
import { AdminMonumentService } from '@core/services/monument/admin-monument.service';
import { MonumentDto } from '@api/model/monument-dto';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {take, Subject, takeUntil} from 'rxjs';
import { ProgressBar } from 'primeng/progressbar';
import { BlockUI } from 'primeng/blockui';
import { DateUtils } from '@shared/utils/date.utils';
import { SortUtils } from '../../../utils/sort.utils';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { SelectModule } from 'primeng/select';
import { AdministrativeDivisionService } from '@core/services/administrative-division/administrative-division.service';
import { AdministrativeDivisionDto } from '@api/model/administrative-division-dto';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-manage-monuments',
  standalone: true,
  imports: [CommonModule, Toast, ButtonModule, AppToolbarComponent, AppTableComponent, ConfirmDialog, ProgressBar, BlockUI, RouterModule, SelectModule, FormsModule, TagModule],
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

    <div class="mb-3 flex justify-content-between align-items-center gap-3">
      <div class="flex gap-2">
        <p-select
          [options]="districts"
          [(ngModel)]="selectedDistrict"
          optionLabel="name"
          placeholder="Filter by District"
          (onChange)="onDistrictChange()"
          [showClear]="true"
          styleClass="w-15rem">
        </p-select>

        <p-select
          [options]="municipalities"
          [(ngModel)]="selectedMunicipality"
          optionLabel="name"
          placeholder="Filter by Municipality"
          (onChange)="onMunicipalityChange()"
          [showClear]="true"
          [disabled]="!selectedDistrict"
          styleClass="w-15rem">
        </p-select>

        <p-select
          [options]="parishes"
          [(ngModel)]="selectedParish"
          optionLabel="name"
          placeholder="Filter by Parish"
          (onChange)="onParishChange()"
          [showClear]="true"
          [disabled]="!selectedMunicipality"
          styleClass="w-15rem">
        </p-select>
      </div>

      <p-button
        label="Create Monument"
        icon="pi pi-plus"
        (onClick)="createMonument()"></p-button>
    </div>

    <app-table
      #table
      [data]="monuments()"
      [columns]="cols"
      [globalFilterFields]="['name', 'createdAt', 'lastModifiedAt']"
      [lazy]="true"
      [totalRecords]="totalRecords()"
      [rows]="pageSize()"
      [first]="currentPage() * pageSize()"
      (pageChange)="onPageChange($event)"
      (searchChange)="onSearchChange($event)">

      <ng-template #actions let-monument>
        <div class="flex justify-content-end">
          <p-button
            icon="pi pi-pencil"
            severity="info"
            class="mr-2"
            [rounded]="true"
            [text]="true"
            (onClick)="editMonument(monument)"></p-button>

          <p-button
            icon="pi pi-trash"
            severity="danger"
            [rounded]="true"
            [text]="true"
            (onClick)="deleteMonument(monument)"></p-button>
        </div>
      </ng-template>

      <ng-template #body let-monument let-columns="columns">
        <tr>
          <td *ngFor="let col of columns">
            <ng-container [ngSwitch]="col.field">
              <ng-container *ngSwitchCase="'active'">
                <p-tag [value]="monument.active ? 'Active' : 'Inactive'" [severity]="monument.active ? 'success' : 'danger'"></p-tag>
              </ng-container>
              <ng-container *ngSwitchDefault>
                {{ monument[col.field] }}
              </ng-container>
            </ng-container>
          </td>
          <td style="text-align: right">
            <ng-container *ngTemplateOutlet="actions; context: {$implicit: monument}"></ng-container>
          </td>
        </tr>
      </ng-template>

    </app-table>
  `,
  providers: [MessageService, MonumentService, AdminMonumentService, ConfirmationService, AdministrativeDivisionService]
})
export class ManageMonuments implements OnInit, OnDestroy {
  monuments = signal<MonumentDto[]>([]);
  totalRecords = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = signal<number>(10);
  isImporting = signal<boolean>(false);
  private destroy$ = new Subject<void>();
  @ViewChild('table') tableComp!: AppTableComponent;

  districts: AdministrativeDivisionDto[] = [];
  municipalities: AdministrativeDivisionDto[] = [];
  parishes: AdministrativeDivisionDto[] = [];
  selectedDistrict: AdministrativeDivisionDto | null = null;
  selectedMunicipality: AdministrativeDivisionDto | null = null;
  selectedParish: AdministrativeDivisionDto | null = null;

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'protectionTitle', header: 'Protection Title' },
    { field: 'lastModifiedAt', header: 'Modified At', type: 'date' },
    { field: 'active', header: 'Active' }
  ];

  constructor(
    private monumentService: MonumentService,
    private adminMonumentService: AdminMonumentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    private divisionService: AdministrativeDivisionService
  ) {}

  ngOnInit() {
    this.loadDistricts();

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const page = params['page'] ? parseInt(params['page']) : 0;
        const size = params['size'] ? parseInt(params['size']) : 10;

        this.currentPage.set(page);
        this.pageSize.set(size);

        this.loadMonuments(page, size);
      });
  }

  loadDistricts() {
    this.divisionService.getDistricts().subscribe(districts => {
      this.districts = districts;
    });
  }

  onDistrictChange() {
    this.selectedMunicipality = null;
    this.selectedParish = null;
    this.municipalities = [];
    this.parishes = [];

    if (this.selectedDistrict) {
      this.divisionService.getMunicipalitiesByDistrict(this.selectedDistrict.id!).subscribe(municipalities => {
        this.municipalities = municipalities;
      });
      this.loadMonuments(0, this.pageSize());
    } else {
      this.loadMonuments(0, this.pageSize());
    }
  }

  onMunicipalityChange() {
    this.selectedParish = null;
    this.parishes = [];

    if (this.selectedMunicipality) {
      this.divisionService.getParishesByMunicipality(this.selectedMunicipality.id!).subscribe(parishes => {
        this.parishes = parishes;
      });
      this.loadMonuments(0, this.pageSize());
    } else {
      this.loadMonuments(0, this.pageSize());
    }
  }

  onParishChange() {
    this.loadMonuments(0, this.pageSize());
  }

  loadMonuments(page: number = 0, size: number = 10, sortField?: string, sortOrder?: number): void {
    const sort = SortUtils.buildSortString(sortField, sortOrder);

    let observable;
    if (this.selectedParish) {
      observable = this.monumentService.filterByDivision(this.selectedParish.id!, page, size);
    } else if (this.selectedMunicipality) {
      observable = this.monumentService.filterByDivision(this.selectedMunicipality.id!, page, size);
    } else if (this.selectedDistrict) {
      observable = this.monumentService.filterByDivision(this.selectedDistrict.id!, page, size);
    } else {
      observable = this.adminMonumentService.getMonumentsManagement(page, size);
    }

    observable
      .pipe(take(1))
      .subscribe({
        next: (pageData) => {
          const content = pageData.content || [];
          const formatted = content.map((item: any) => ({
            ...item,
            createdAt: item.createdAt ? DateUtils.formatShortDate(item.createdAt, 'pt-PT') : '',
            lastModifiedAt: item.lastModifiedAt ? DateUtils.formatShortDate(item.lastModifiedAt, 'pt-PT') : ''
          }));
          this.monuments.set(formatted);
          this.totalRecords.set(pageData.totalElements || 0);
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
    this.router.navigate(['/moderator/monuments/create']);
  }

  onPageChange(event: { first: number; rows: number; page: number; sortField?: string; sortOrder?: number }): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page,
        size: event.rows
      },
      queryParamsHandling: 'merge'
    });

    // Reload with sort if provided
    if (event.sortField || event.sortOrder) {
      this.loadMonuments(event.page, event.rows, event.sortField, event.sortOrder);
    }
  }

  onSearchChange(searchValue: string): void {
    if (searchValue.length > 0) {
      // Carregar TODOS os dados para pesquisa
      this.loadMonuments(0, 10000);
    } else {
      // Voltar para paginação normal
      this.loadMonuments(this.currentPage(), this.pageSize());
    }
  }

  editMonument(monument: MonumentDto) {
    this.router.navigate(['/moderator/monuments/edit', monument.id]);
  }

  deleteMonument(monument: MonumentDto): void {
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
        this.adminMonumentService.deleteMonument(monument.id!)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Monument deleted successfully'
              });
              this.loadMonuments(this.currentPage(), this.pageSize());
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
          this.isImporting.set(true);
          this.adminMonumentService.importMonumentsFromGeoJson(file).subscribe({
              next: (response) => {
                this.isImporting.set(false);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: response.message || 'Monuments imported successfully'
                });
                this.loadMonuments(this.currentPage(), this.pageSize());
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

  getImageUrl(coverId: number): string {
    return ImageUtils.getImageUrl(coverId, 'assets/placeholder.png', ImageVariant.THUMBNAIL);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
