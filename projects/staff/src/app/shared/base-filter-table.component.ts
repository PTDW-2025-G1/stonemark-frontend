import { signal } from '@angular/core';
import type { StatusFilterValue } from '../components/status-filter/status-filter.component';

/**
 * Classe base para componentes que mostram listas filtráveis por estado (ALL, PENDING, APPROVED, REJECTED)
 */
export abstract class BaseFilterTableComponent<T extends { id?: string | number; status?: string }> {
    items = signal<T[]>([]);
    filteredItems = signal<T[]>([]);
    statusFilter = signal<StatusFilterValue>('ALL');

    /**
     * Método abstrato para carregar os dados da fonte (API ou serviço mock)
     */
    abstract loadData(): Promise<T[]>;

    /**
     * Carrega e inicializa os dados com o filtro atual
     */
    async initData(): Promise<void> {
        const data = await this.loadData();
        this.items.set(data);
        this.applyFilter(this.statusFilter());
    }

    /**
     * Altera o filtro ativo e reaplica-o
     */
    filterByStatus(status: StatusFilterValue): void {
        this.statusFilter.set(status);
        this.applyFilter(status);
    }

    /**
     * Aplica o filtro de estado aos dados
     */
    applyFilter(status: StatusFilterValue): void {
        if (status === 'ALL') {
            this.filteredItems.set(this.items());
        } else {
            this.filteredItems.set(this.items().filter(i => i.status === status));
        }
    }

    /**
     * Atualiza a lista após alteração de estado (aprovar/rejeitar)
     */
    updateLocalItem(updated: T): void {
        const list = this.items().map(i => (i['id'] === updated['id'] ? updated : i));
        this.items.set(list);
        this.applyFilter(this.statusFilter());
    }
}
