import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { User, UserService } from '../../../../../../shared/src/lib/core/services/user.service';
import { AppToolbarComponent } from '@/components/toolbar/toolbar.component';
import { AppTableComponent } from '@/components/table/table.component';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-manage-moderators',
    standalone: true,
  imports: [CommonModule, Toast, ButtonModule, AppToolbarComponent, AppTableComponent],
    template: `
        <app-toolbar title="Gestão de Moderadores" subtitle="Aqui pode gerir os moderadores do sistema." (export)="exportCSV()"></app-toolbar>
        <p-toast />
        <app-table #table [data]="users()" [columns]="cols" [globalFilterFields]="['id', 'firstName', 'lastName', 'email', 'type']">
            <ng-template #actions let-user>
                <p-button
                    *ngIf="user.type === 'User'"
                    label="Tornar Moderador"
                    icon="pi pi-user-plus"
                    severity="info"
                    class="mr-2"
                    (onClick)="changeType(user, 'Moderator')"
                ></p-button>

                <p-button
                    *ngIf="user.type === 'Moderator'"
                    label="Remover Moderador"
                    icon="pi pi-user-minus"
                    severity="danger"
                    (onClick)="changeType(user, 'User')"
                ></p-button>
            </ng-template>
        </app-table>
    `,
    providers: [MessageService, UserService]
})
export class ManageModerators implements OnInit {
    users = signal<User[]>([]);
    @ViewChild('table') tableComp!: AppTableComponent;

    cols = [
        { field: 'id', header: 'ID' },
        { field: 'firstName', header: 'Primeiro Nome' },
        { field: 'lastName', header: 'Último Nome' },
        { field: 'email', header: 'Email' },
        { field: 'type', header: 'Tipo de User', type: 'status' }
    ];

    constructor(
        private userService: UserService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadUsers();
    }

    async loadUsers() {
        const data = await this.userService.getUsers();
        this.users.set(data);
    }

    async changeType(user: User, type: 'User' | 'Moderator') {
        const updated = await this.userService.updateType(user.id, type);
        const list = this.users().map(u => u.id === updated.id ? updated : u);
        this.users.set(list);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `User is now a ${type}` });
    }

    exportCSV() {
        this.tableComp?.exportCSV();
    }
}
