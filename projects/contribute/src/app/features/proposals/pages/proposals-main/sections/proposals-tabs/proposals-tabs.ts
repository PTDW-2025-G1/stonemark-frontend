import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MARKS_ICON } from '@core/constants/content-icons';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-proposals-tabs',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './proposals-tabs.html'
})
export class ProposalsTabsComponent {
  @Input() activeTab: 'marks' | 'suggestions' = 'marks';
  @Output() tabChange = new EventEmitter<'marks' | 'suggestions'>();
  @Output() goBack = new EventEmitter<void>();

  marksIcon = MARKS_ICON;

  setTab(tab: 'marks' | 'suggestions') {
    if (this.activeTab !== tab) {
      this.tabChange.emit(tab);
    }
  }
}
