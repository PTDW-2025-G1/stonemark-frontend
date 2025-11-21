import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../components/dashboard/stat-card.component';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule, StatCardComponent],
    template: `
        <div class="flex flex-wrap gap-4">
            <div class="flex-1 min-w-[250px] max-w-sm"> <app-stat-card title="Total Users" value="152" icon="pi-users" iconColor="text-blue-500" bgColor="bg-blue-100 dark:bg-blue-400/10" highlight="24 new " subtitle="since last visit" /></div>
            <div class="flex-1 min-w-[250px] max-w-sm"> <app-stat-card title="Total Monuments" value="2.100" icon="pi-map-marker" iconColor="text-orange-500" bgColor="bg-orange-100 dark:bg-orange-400/10" highlight="%52+ " subtitle="since last week" /></div>
            <div class="flex-1 min-w-[250px] max-w-sm"><app-stat-card title="Total Marks" value="28.441" icon="pi-star" iconColor="text-yellow-500" bgColor="bg-yellow-100 dark:bg-yellow-400/10" highlight="520 " subtitle="newly registered" /></div>
            <div class="flex-1 min-w-[250px] max-w-sm"><app-stat-card title="Total Submissions" value="152 Unread" icon="pi-send" iconColor="text-indigo-500" bgColor="bg-indigo-100 dark:bg-indigo-400/10" highlight="85 " subtitle="responded" /></div>
        </div>
    `
})
export class StatsWidget {}
