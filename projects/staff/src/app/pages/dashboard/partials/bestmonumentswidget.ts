import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

interface Monument {
    name: string;
    city: string;
    marks: number;
}

@Component({
    standalone: true,
    selector: 'app-best-monuments-widget',
    imports: [CommonModule, BadgeModule],
    template: `
        <div class="card">
            <div class="flex justify-between items-center mb-4.5">
                <div class="font-semibold text-xl">Best Monuments by Marks</div>
            </div>
            <ul class="list-none p-0 m-0">
                <li *ngFor="let monument of monuments" class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">{{ monument.name }}</span>
                        <div class="mt-1 text-muted-color">{{ monument.city }}</div>
                    </div>
                    <div class="mt-2 md:mt-0 flex items-center">
                        <span pBadge [value]="monument.marks" severity="info" class="text-lg"></span>
                    </div>
                </li>
            </ul>
        </div>
    `
})
export class BestMonumentsWidget {
    monuments: Monument[] = [
        { name: 'Torre de Belém', city: 'Lisboa', marks: 120 },
        { name: 'Mosteiro dos Jerónimos', city: 'Lisboa', marks: 98 },
        { name: 'Palácio da Pena', city: 'Sintra', marks: 87 },
        { name: 'Castelo de São Jorge', city: 'Lisboa', marks: 75 },
        { name: 'Sé do Porto', city: 'Porto', marks: 60 },
        { name: 'Convento de Cristo', city: 'Tomar', marks: 55 }
    ];
}
