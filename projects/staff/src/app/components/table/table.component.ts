import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutService } from '../../layout/service/layout.service';
import { ThemeService } from '../../layout/service/theme.service';
import { debounceTime, Subscription } from 'rxjs';
import { getSeverity } from '../../utils/severity.util';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, TagModule, InputTextModule],
    template: `
        <div class="modern-table-container">
            <div class="search-container" [style]="searchStyle">
                <i class="pi pi-search search-icon"></i>
                <input
                    pInputText
                    type="text"
                    (input)="onGlobalFilter(dt, $event)"
                    placeholder="Pesquisar..."
                    class="search-input"
                />
            </div>

            <p-table
                #dt
                [value]="data"
                dataKey="id"
                [paginator]="true"
                [rows]="rows"
                [lazy]="lazy && !hasGlobalFilter"
                [totalRecords]="totalRecords"
                [first]="first"
                (onLazyLoad)="onLazyLoad($event)"
                [columns]="columns"
                [globalFilterFields]="globalFilterFields"
                styleClass="modern-table"
            >
                <ng-template pTemplate="header">
                    <tr>
                        <th *ngFor="let col of columns" pSortableColumn="{{ col.field }}">
                            {{ col.header }}
                            <p-sortIcon [field]="col.field"></p-sortIcon>
                        </th>
                        <th *ngIf="actions" style="text-align: right;">Actions</th>
                    </tr>
                </ng-template>

                <ng-template pTemplate="body" let-item let-columns="columns">
                    <ng-container *ngIf="bodyTemplate; else defaultBody">
                        <ng-container *ngTemplateOutlet="bodyTemplate; context: { $implicit: item, columns: columns }"></ng-container>
                    </ng-container>
                    <ng-template #defaultBody>
                        <tr class="table-row" (click)="onRowClick(item)" [style.cursor]="rowClick.observed ? 'pointer' : 'default'">
                            <td *ngFor="let col of columns">
                                <ng-container [ngSwitch]="col.type">
                                    <p-tag
                                        *ngSwitchCase="'status'"
                                        [value]="item[col.field]"
                                        [severity]="getSeverity(item[col.field])"
                                        styleClass="modern-tag"
                                    ></p-tag>
                                    <span *ngSwitchDefault>{{ item[col.field] }}</span>
                                </ng-container>
                            </td>

                            <td *ngIf="actions" style="text-align: right;">
                                <ng-container *ngTemplateOutlet="actions; context: { $implicit: item }"></ng-container>
                            </td>
                        </tr>
                    </ng-template>
                </ng-template>
            </p-table>
        </div>
    `,
    styleUrl: './table.component.scss'
})
export class AppTableComponent implements OnInit, OnDestroy {
    @Input() data: any[] = [];
    @Input() columns: { field: string; header: string; type?: string }[] = [];
    @Input() globalFilterFields: string[] = [];
    @Input() lazy: boolean = false;
    @Input() totalRecords: number = 0;
    @Input() rows: number = 10;
    @Input() first: number = 0;
    @ContentChild('actions') actions?: TemplateRef<any>;
    @ContentChild('body') bodyTemplate?: TemplateRef<any>;

    @ViewChild('dt') dt: any;
    @Output() export = new EventEmitter<void>();
    @Output() rowClick = new EventEmitter<any>();
    @Output() pageChange = new EventEmitter<{ first: number; rows: number; page: number; sortField?: string; sortOrder?: number }>();
    @Output() searchChange = new EventEmitter<string>();

    searchStyle: any = {};
    subscription!: Subscription;
    hasGlobalFilter: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private themeService: ThemeService
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe(() => this.applyThemeColors());
    }

    ngOnInit() {
        this.applyThemeColors();
    }

    applyThemeColors() {
        const c = this.themeService.getThemeColors();
        this.searchStyle = {
            background: this.themeService.getLinearGradient(c.primary400, c.primary600)
        };
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: any, event: Event) {
        const value = (event.target as HTMLInputElement).value;
        const hadFilter = this.hasGlobalFilter;
        this.hasGlobalFilter = value.length > 0;

        // Emitir evento para componentes pai carregarem todos os dados
        this.searchChange.emit(value);

        if (value.length === 0 && hadFilter) {
            // Limpar o filtro e resetar a tabela
            table.clear();
            table.filterGlobal('', 'contains');
        } else {
            table.filterGlobal(value, 'contains');
        }
    }

    onRowClick(item: any) {
        this.rowClick.emit(item);
    }

    onLazyLoad(event: any) {
        if (this.lazy) {
            this.pageChange.emit({
                first: event.first,
                rows: event.rows,
                page: event.first / event.rows,
                sortField: event.sortField,
                sortOrder: event.sortOrder
            });
        }
    }

    protected readonly getSeverity = getSeverity;

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
