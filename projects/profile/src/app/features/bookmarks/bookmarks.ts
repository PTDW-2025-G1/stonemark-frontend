import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderSectionComponent } from './sections/header-section';
import { TabsSectionComponent } from './sections/tabs-section';
import { EmptyStateSectionComponent } from './sections/empty-state';
import { GridSectionComponent } from './sections/grid-section';
import { PaginationComponent } from '@shared/ui/pagination/pagination';
import { BookmarksFacade, TabType } from '@shared/facades/bookmarks.facade';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderSectionComponent, TabsSectionComponent, EmptyStateSectionComponent, GridSectionComponent, PaginationComponent],
  templateUrl: './bookmarks.html'
})
export class BookmarksComponent implements OnInit {

  Math = Math;

  constructor(
    public facade: BookmarksFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facade.loadBookmarks();
  }

  changeTab(tab: TabType): void {
    this.facade.changeTab(tab);
    // Reset to page 1 when changing tabs
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number): void {
    this.facade.pagination.goToPage(page);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  removeBookmark(event: { bookmarkId: number; type: 'monument' | 'mark' }): void {
    this.facade.removeBookmark(event.bookmarkId, event.type);
  }

  viewDetails(item: any): void {
    this.facade.viewDetails?.(item);
  }
}
