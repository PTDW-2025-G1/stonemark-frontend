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
                [rows]="10"
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

                <ng-template pTemplate="body" let-item>
                    <tr class="table-row">
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
            </p-table>
        </div>
    `,
    styleUrl: './table.component.scss'
})
export class AppTableComponent implements OnInit, OnDestroy {
    @Input() data: any[] = [];
    @Input() columns: { field: string; header: string; type?: string }[] = [];
    @Input() globalFilterFields: string[] = [];
    @ContentChild('actions') actions?: TemplateRef<any>;

    @ViewChild('dt') dt: any;
    @Output() export = new EventEmitter<void>();

    searchStyle: any = {};
    subscription!: Subscription;

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
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    protected readonly getSeverity = getSeverity;

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
