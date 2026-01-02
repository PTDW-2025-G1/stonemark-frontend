import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginationFacade<T = any> {

  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  items: T[] = [];
  paginatedItems: T[] = [];

  setServerPage(
    currentPage: number,
    totalPages: number
  ): void {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
  }

  init(items: T[], itemsPerPage = 6, page = 1): void {
    this.items = items;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = page;

    this.calculate();
  }

  updateItems(items: T[]): void {
    this.items = items;
    this.calculate();
  }

  private calculate(): void {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage) || 1;

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.updatePaginatedItems();
  }

  private updatePaginatedItems(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedItems = this.items.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedItems();
    this.scrollTop();
  }

  next(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previous(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  getPageNumbers(maxVisible = 5): number[] {
    const pages: number[] = [];

    if (this.totalPages <= maxVisible) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (this.currentPage > 3) {
      pages.push(-1); // ellipsis
    }

    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (this.currentPage < this.totalPages - 2) {
      pages.push(-1); // ellipsis
    }

    pages.push(this.totalPages);

    return pages;
  }

  private scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
