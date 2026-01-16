import { signal, computed } from '@angular/core';
import type { StatusFilterValue } from '../components/status-filter/status-filter.component';

/**
 * Classe base para componentes que mostram listas filtráveis por estado (ALL, PENDING, APPROVED, REJECTED)
 */
export abstract class BaseFilterTableComponent<T extends { id?: string | number; status?: string }> {
  items = signal<T[]>([]);
  statusFilter = signal<StatusFilterValue>('ALL');

  // Use computed em vez de signal separado
  filteredItems = computed(() => {
    const filter = this.statusFilter();
    const allItems = this.items();

    if (filter === 'ALL') {
      return allItems;
    }

    return allItems.filter(item => item.status === filter);
  });

  /**
   * Método abstrato para carregar os dados da fonte (API ou serviço mock)
   */
  abstract loadData(): Promise<T[]>;

  /**
   * Carrega e inicializa os dados com o filtro atual
   */
  async initData(): Promise<void> {
    const data = await this.loadData();
    this.items.set(Array.isArray(data) ? data : []);
  }

  /**
   * Altera o filtro ativo e reaplica-o
   */
  filterByStatus(status: StatusFilterValue): void {
    this.statusFilter.set(status);
  }

  /**
   * Atualiza a lista após alteração de estado (aprovar/rejeitar)
   */
  updateLocalItem(updated: T): void {
    const list = this.items().map(i => (i['id'] === updated['id'] ? updated : i));
    this.items.set(list);
  }
}
