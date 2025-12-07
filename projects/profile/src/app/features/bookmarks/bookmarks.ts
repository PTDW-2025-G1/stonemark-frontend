import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MonumentService } from '@core/services/monument/monument.service';
import { MarkService } from '@core/services/mark/mark.service';
import { forkJoin } from 'rxjs';
import {HeaderSectionComponent} from './sections/header-section';
import {TabsSectionComponent} from './sections/tabs-section';
import {EmptyStateSectionComponent} from './sections/empty-state';
import {GridSectionComponent} from './sections/grid-section';
import {PaginationSectionComponent} from './sections/pagination-section';

type TabType = 'all' | 'monuments' | 'marks';

interface BookmarkItem {
  id: string | number;
  type: 'monument' | 'mark';
  title: string;
  subtitle?: string;
}

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderSectionComponent, TabsSectionComponent, EmptyStateSectionComponent, GridSectionComponent, PaginationSectionComponent, HeaderSectionComponent, TabsSectionComponent, EmptyStateSectionComponent, GridSectionComponent, PaginationSectionComponent],
  templateUrl: './bookmarks.html'
})
export class BookmarksComponent implements OnInit {
  activeTab: TabType = 'all';

  monuments: BookmarkItem[] = [];
  marks: BookmarkItem[] = [];
  filteredItems: BookmarkItem[] = [];
  paginatedItems: BookmarkItem[] = [];
  totalItems = 0;

  // Pagination
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 0;

  // Expose Math to template
  Math = Math;

  constructor(
    private router: Router,
    private monumentService: MonumentService,
    private markService: MarkService
  ) {}

  ngOnInit(): void {
    forkJoin({
      monuments: this.monumentService.getMonuments(),
      marks: this.markService.getMarks()
    }).subscribe(({ monuments, marks }) => {
      this.monuments = monuments.map(m => ({
        id: m.id ?? 0,
        type: 'monument',
        title: m.name ?? 'Unknown Monument',
        location: m.city,
      }));

      this.marks = marks.map(mark => ({
        id: mark.id ?? 0,
        type: 'mark' as const,
        title: mark.title ?? 'Unknown Mark',
        subtitle: 'Stone Mason Mark',
        image: 'https://photos1.blogger.com/blogger/6821/1071/1600/marca_alco6.jpg'
      }));

      this.updateFilteredItems();
      window.scrollTo(0, 0);
    });
  }

  changeTab(tab: TabType): void {
    this.activeTab = tab;
    this.currentPage = 1; // Reset to first page when changing tabs
    this.updateFilteredItems();
  }

  updateFilteredItems(): void {
    switch (this.activeTab) {
      case 'all':
        this.filteredItems = [...this.monuments, ...this.marks];
        break;
      case 'monuments':
        this.filteredItems = this.monuments;
        break;
      case 'marks':
        this.filteredItems = this.marks;
        break;
    }
    this.totalItems = this.getTotalCount();
    this.calculatePagination();
    this.updatePaginatedItems();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  updatePaginatedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedItems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5; // Maximum number of page buttons to show

    if (this.totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (this.currentPage > 3) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Show current page and neighbors
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (this.currentPage < this.totalPages - 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Always show last page
      pages.push(this.totalPages);
    }

    return pages;
  }

  getTotalCount(): number {
    return this.monuments.length + this.marks.length;
  }

  removeBookmark(id: string | number, type: 'monument' | 'mark'): void {
    if (type === 'monument') {
      this.monuments = this.monuments.filter(m => m.id !== id);
    } else {
      this.marks = this.marks.filter(m => m.id !== id);
    }

    // Update filtered items and pagination
    this.updateFilteredItems();

    // If current page is now empty and it's not the first page, go to previous page
    if (this.paginatedItems.length === 0 && this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  viewDetails(item: BookmarkItem): void {
    const route = item.type === 'monument' ? '/monuments' : '/marks';
    this.router.navigate([route, item.id]);
  }
}
