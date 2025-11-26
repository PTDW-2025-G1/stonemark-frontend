import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../../layout/service/layout.service';
import { ThemeService } from '../../layout/service/theme.service';
import { debounceTime, Subscription } from 'rxjs';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [CommonModule, ToolbarModule, ButtonModule],
    template: `
        <p-toolbar class="modern-toolbar" [style]="toolbarStyle">
            <ng-template #start>
                <div class="toolbar-content">
                    <h3 class="toolbar-title">{{ title }}</h3>
                    <p *ngIf="subtitle" class="toolbar-subtitle">{{ subtitle }}</p>
                </div>
            </ng-template>
            <ng-template #end>
              <p-button
                *ngIf="showImport"
                [label]="importLabel"
                [icon]="importIcon"
                styleClass="import-button"
                class="mr-2"
                (onClick)="import.emit()"
              />
              <p-button
                *ngIf="showExport"
                [label]="exportLabel"
                [icon]="exportIcon"
                styleClass="export-button"
                (onClick)="export.emit()"
              />
            </ng-template>
        </p-toolbar>
    `,
    styles: [`
        :host ::ng-deep .modern-toolbar {
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            margin-bottom: 1.5rem;
            padding: 1.25rem 1.5rem;
        }

        .toolbar-content {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .toolbar-title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.02em;
        }

        .toolbar-subtitle {
            margin: 0;
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.85);
            font-weight: 400;
        }

        :host ::ng-deep .export-button {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #ffffff;
            font-weight: 600;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        :host ::ng-deep .export-button:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        :host ::ng-deep .export-button:active {
            transform: translateY(0);
        }

        :host ::ng-deep .import-button {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        :host ::ng-deep .import-button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        :host ::ng-deep .import-button:active {
          transform: translateY(0);
        }
    `]
})
export class AppToolbarComponent implements OnInit, OnDestroy {
    @Input() title: string = '';
    @Input() subtitle?: string;
    @Input() showExport: boolean = true;
    @Input() exportLabel: string = 'Exportar';
    @Input() exportIcon: string = 'pi pi-upload';
    @Output() import = new EventEmitter<void>();
    @Input() showImport: boolean = false;
    @Input() importLabel: string = 'Importar';
    @Input() importIcon: string = 'pi pi-download';
    @Output() export = new EventEmitter<void>();

    toolbarStyle: any = {};
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
        this.toolbarStyle = {
            background: this.themeService.getLinearGradient(c.primary400, c.primary600)
        };
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
