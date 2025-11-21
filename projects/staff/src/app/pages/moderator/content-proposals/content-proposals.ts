import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ContentProposal, ContentProposalService } from '../../../../../../shared/src/lib/core/services/content-proposal.service';
import { AppToolbarComponent } from '@/components/toolbar/toolbar.component';
import { AppDialogComponent } from '@/components/dialog/dialog.component';
import { AppTableComponent } from '@/components/table/table.component';
import { StatusFilterComponent, StatusFilterValue } from '@/components/status-filter/status-filter.component';
import { BaseFilterTableComponent } from '@/shared/base-filter-table.component';

@Component({
    selector: 'app-content-proposals',
    standalone: true,
    imports: [CommonModule, ButtonModule, Toast, ConfirmDialog, AppToolbarComponent, AppDialogComponent, AppTableComponent, StatusFilterComponent],
    template: `
        <app-toolbar title="Propostas de Conteúdo" subtitle="Aprove ou recuse propostas de alteração feitas pelos utilizadores." (export)="exportCSV()"></app-toolbar>
        <p-toast />
        <p-confirmDialog />
        <app-status-filter [selected]="statusFilter()" (statusChange)="filterByStatus($event)" />
        <app-table #table [data]="filteredItems()" [columns]="cols" [globalFilterFields]="['type', 'status', 'createdBy']"
        >
            <ng-template #actions let-item>
                <p-button icon="pi pi-eye" class="mr-2" (click)="view(item)"></p-button>
                <p-button *ngIf="item.status === 'PENDING'" icon="pi pi-check" severity="success" class="mr-2" (click)="confirmAction(item, 'APPROVED')"></p-button>
                <p-button *ngIf="item.status === 'PENDING'" icon="pi pi-times" severity="danger" (click)="confirmAction(item, 'REJECTED')"></p-button>
            </ng-template>
        </app-table>
        <app-dialog title="Detalhes da Proposta" [visible]="dialogVisible" [data]="current" [fields]="[
                { key: 'type', label: 'Tipo' },
                { key: 'status', label: 'Status', type: 'status' },
                { key: 'createdAt', label: 'Criado em' },
                { key: 'createdBy', label: 'Criado por' },
                { key: 'details', label: 'Detalhes da alteração' }
            ]"
            (close)="dialogVisible = false"
        ></app-dialog>
    `,
    providers: [MessageService, ConfirmationService, ContentProposalService]
})
export class ContentProposals
    extends BaseFilterTableComponent<ContentProposal>
    implements OnInit
{
    current: ContentProposal | null = null;
    dialogVisible = false;

    @ViewChild('table') tableComp!: AppTableComponent;

    cols = [
        { field: 'type', header: 'Tipo' },
        { field: 'status', header: 'Status', type: 'status' },
        { field: 'createdAt', header: 'Criado em' },
        { field: 'createdBy', header: 'Criado por' }
    ];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private contentProposalService: ContentProposalService
    ) {
        super();
    }

    async ngOnInit() {
        try {
            await this.initData();
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar as propostas.' });
        }
    }

    async loadData() {
        return await this.contentProposalService.getProposals();
    }

    view(item: ContentProposal) {
        this.current = { ...item };
        this.dialogVisible = true;
    }

    confirmAction(item: ContentProposal, status: 'APPROVED' | 'REJECTED') {
        const action = status === 'APPROVED' ? 'aprovar' : 'rejeitar';
        this.confirmationService.confirm({ message: `Deseja ${action} a proposta de ${item.type}?`, accept: () => this.updateStatus(item, status) });
    }

    async updateStatus(item: ContentProposal, status: 'APPROVED' | 'REJECTED') {
        try {
            const updated = await this.contentProposalService.updateStatus(item.id, status);
            this.updateLocalItem(updated);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `A proposta de ${item.type} foi ${status === 'APPROVED' ? 'aprovada' : 'rejeitada'}.`
            });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível atualizar o estado da proposta.' });
        }
    }

    exportCSV() {
        this.tableComp?.exportCSV();
    }
}
