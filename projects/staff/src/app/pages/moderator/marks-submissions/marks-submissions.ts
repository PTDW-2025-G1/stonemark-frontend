import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MarksSubmission, MarksSubmissionService } from '@core/services/marks-submission.service';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppDialogComponent } from '../../../components/dialog/dialog.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { StatusFilterComponent } from '../../../components/status-filter/status-filter.component';
import { BaseFilterTableComponent } from '../../../shared/base-filter-table.component';

@Component({
    selector: 'app-moderator-marks-submissions',
    standalone: true,
    imports: [CommonModule, ButtonModule, Toast, ConfirmDialog, AppToolbarComponent, AppDialogComponent, AppTableComponent, StatusFilterComponent],
    template: `
        <app-toolbar title="Submissões de Marks" subtitle="Aqui pode gerir as submissões de marks feitas pelos utilizadores. Aprove ou rejeite conforme necessário." (export)="exportCSV()"></app-toolbar>
        <p-toast />
        <p-confirmDialog />
        <app-status-filter [selected]="statusFilter()" (statusChange)="filterByStatus($event)" />
        <app-table #table [data]="filteredItems()" [columns]="cols" [globalFilterFields]="['markName', 'submitter', 'status']">
            <ng-template #actions let-item>
                <p-button icon="pi pi-eye" class="mr-2" (click)="view(item)"></p-button>
                <p-button *ngIf="item.status === 'PENDING'" icon="pi pi-check" severity="success" class="mr-2" (click)="confirmAction(item, 'APPROVED')"
                ></p-button>
                <p-button *ngIf="item.status === 'PENDING'" icon="pi pi-times" severity="danger" (click)="confirmAction(item, 'REJECTED')"
                ></p-button>
            </ng-template>
        </app-table>
        <app-dialog title="Detalhes da Submissão" [visible]="dialogVisible" [data]="current" [fields]="[
                { key: 'markName', label: 'Mark' },
                { key: 'submitter', label: 'Submetido por' },
                { key: 'status', label: 'Status', type: 'status' },
                { key: 'description', label: 'Descrição' },
                { key: 'logo', label: 'Logo', type: 'image' }
            ]"
            (close)="dialogVisible = false"
        ></app-dialog>
    `,
    providers: [MessageService, ConfirmationService, MarksSubmissionService]
})
export class ModeratorMarksSubmissionsComponent
    extends BaseFilterTableComponent<MarksSubmission>
    implements OnInit
{
    current: MarksSubmission | null = null;
    dialogVisible = false;

    @ViewChild('table') tableComp!: AppTableComponent;

    cols = [
        { field: 'markName', header: 'Mark' },
        { field: 'submitter', header: 'Submetido por' },
        { field: 'status', header: 'Status', type: 'status' }
    ];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private marksSubmissionService: MarksSubmissionService
    ) {
        super();
    }

    async ngOnInit() {
        try {
            await this.initData();
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar as submissões.' });
        }
    }

    async loadData() {
        return await this.marksSubmissionService.getSubmissions();
    }

    view(item: MarksSubmission) {
        this.current = { ...item };
        this.dialogVisible = true;
    }

    confirmAction(item: MarksSubmission, status: 'APPROVED' | 'REJECTED') {
        const action = status === 'APPROVED' ? 'aprovar' : 'rejeitar';
        this.confirmationService.confirm({ message: `Deseja ${action} a submissão de ${item.markName}?`, accept: () => this.updateStatus(item, status) });
    }

    async updateStatus(item: MarksSubmission, status: 'APPROVED' | 'REJECTED') {
        try {
            const updated = await this.marksSubmissionService.updateStatus(item.id, status);
            this.updateLocalItem(updated);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `A submissão de ${item.markName} foi ${status === 'APPROVED' ? 'aprovada' : 'rejeitada'}.`
            });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível atualizar o estado da submissão.' });
        }
    }

    exportCSV() {
        this.tableComp?.exportCSV();
    }
}
