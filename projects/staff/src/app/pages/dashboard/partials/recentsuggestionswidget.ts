import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

interface Suggestion {
    type: 'Monument' | 'Mark' | 'Guild';
    name: string;
    sentAt: Date;
}

@Component({
    standalone: true,
    selector: 'app-recent-suggestions-widget',
    imports: [CommonModule, TableModule],
    template: `
        <div class="card mb-8!">
            <div class="font-semibold text-xl mb-4">Recent Suggestions</div>
            <p-table [value]="suggestions" [paginator]="true" [rows]="5" responsiveLayout="scroll">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Tipo</th>
                        <th>Nome</th>
                        <th>Enviado em</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-suggestion>
                    <tr>
                        <td>{{ suggestion.type }}</td>
                        <td>{{ suggestion.name }}</td>
                        <td>{{ suggestion.sentAt | date:'short' }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class RecentSuggestionsWidget {
    suggestions: Suggestion[] = [
        { type: 'Monument', name: 'João Silva', sentAt: new Date('2024-06-01T10:30:00') },
        { type: 'Mark', name: 'Maria Sousa', sentAt: new Date('2024-06-02T14:15:00') },
        { type: 'Guild', name: 'Carlos Lima', sentAt: new Date('2024-06-03T09:45:00') },
        { type: 'Monument', name: 'Ana Paula', sentAt: new Date('2024-06-04T16:20:00') },
        { type: 'Mark', name: 'Pedro Santos', sentAt: new Date('2024-06-05T11:10:00') }
    ];
}
