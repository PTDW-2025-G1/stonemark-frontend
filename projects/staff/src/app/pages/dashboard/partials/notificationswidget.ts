import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [ButtonModule, MenuModule],
    template: `<div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">Notifications</div>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>

        <span class="block text-muted-color font-medium mb-4">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-map-marker text-xl! text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                >Beatriz Costa
                    <span class="text-surface-700 dark:text-surface-100">adicionou uma marca ao monumento Palácio de Mafra.</span>
                </span>
            </li>
            <li class="flex items-center py-2">
                <div class="w-12 h-12 flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-lightbulb text-xl! text-yellow-500"></i>
                </div>
                <span class="text-surface-700 dark:text-surface-100 leading-normal">Miguel Ramos sugeriu uma melhoria na descrição do monumento Torre dos Clérigos.</span>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">YESTERDAY</span>
        <ul class="p-0 m-0 list-none mb-6">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-times text-xl! text-red-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                >Moderador
                    <span class="text-surface-700 dark:text-surface-100">rejeitou a sugestão para o monumento Castelo de Guimarães.</span>
                </span>
            </li>
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-users text-xl! text-cyan-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                >Sofia Martins
                    <span class="text-surface-700 dark:text-surface-100">entrou na guilda Monumentos do Norte.</span>
                </span>
            </li>
        </ul>
        <span class="block text-muted-color font-medium mb-4">LAST WEEK</span>
        <ul class="p-0 m-0 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-map-marker text-xl! text-purple-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">Tiago Lopes adicionou 2 marcas ao monumento Mosteiro da Batalha.</span>
            </li>
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-image text-xl! text-green-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">Helena Cruz sugeriu uma nova foto para o monumento Convento de Cristo.</span>
            </li>
        </ul>
    </div>`
})
export class NotificationsWidget {
    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
    ];
}
