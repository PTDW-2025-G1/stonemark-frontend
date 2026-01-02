import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderSectionComponent } from './sections/header-section';
import { TabsSectionComponent } from './sections/tabs-section';
import { EmptyStateSectionComponent } from './sections/empty-state';
import { GridSectionComponent } from './sections/grid-section';
import { PaginationSectionComponent } from './sections/pagination-section';
import { BookmarksFacade, TabType } from '@shared/facades/bookmarks.facade';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderSectionComponent, TabsSectionComponent, EmptyStateSectionComponent, GridSectionComponent, PaginationSectionComponent],
  templateUrl: './bookmarks.html'
})
export class BookmarksComponent implements OnInit {

  Math = Math;

  constructor(
    public facade: BookmarksFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadBookmarks();
  }

  changeTab(tab: TabType): void {
    this.facade.changeTab(tab);
  }

  removeBookmark(event: { bookmarkId: number; type: 'monument' | 'mark' }): void {
    this.facade.removeBookmark(event.bookmarkId, event.type);
  }

  viewDetails(item: any): void {
    this.facade.viewDetails?.(item);
  }
}
