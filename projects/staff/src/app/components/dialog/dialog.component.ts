import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { getSeverity } from '../../utils/severity.util';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule, TagModule, ButtonModule],
    template: `
        <p-dialog
            [header]="title"
            [(visible)]="visible"
            [modal]="true"
            [style]="{ width: width }"
            (onHide)="close.emit()"
        >
            <div *ngIf="data">
                <ng-container *ngFor="let field of fields">
                    <div class="mb-3" *ngIf="data[field.key] !== undefined">
                        <strong>{{ field.label }}:</strong>
                        <ng-container [ngSwitch]="field.type">
                            <p-tag
                                *ngSwitchCase="'status'"
                                [value]="data[field.key]"
                                [severity]="getSeverity(data[field.key])"
                            ></p-tag>
                            <div *ngSwitchCase="'image'">
                                <img [src]="data[field.key]" alt="Imagem" style="max-width:100%; height:auto;" />
                            </div>
                            <div *ngSwitchDefault>
                                {{ data[field.key] }}
                            </div>
                        </ng-container>
                    </div>
                </ng-container>
            </div>

            <ng-template #footer>
                <p-button label="Close" icon="pi pi-times" (click)="close.emit()"></p-button>
            </ng-template>
        </p-dialog>
    `
})
export class AppDialogComponent {
    @Input() title: string = 'Detalhes';
    @Input() visible = false;
    @Input() width: string = '500px';
    @Input() data: any;
    @Input() fields: { key: string; label: string; type?: 'text' | 'status' | 'image' }[] = [];
    @Output() close = new EventEmitter<void>();
    protected readonly getSeverity = getSeverity;
}
