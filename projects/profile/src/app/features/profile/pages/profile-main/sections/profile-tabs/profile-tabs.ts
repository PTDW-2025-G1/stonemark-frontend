import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MARKS_ICON } from '@core/constants/content-icons';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './profile-tabs.html'
})
export class ProfileTabsComponent {
  @Input() activeTab: 'marks' | 'suggestions' = 'marks';
  @Output() tabChange = new EventEmitter<'marks' | 'suggestions'>();

  marksIcon = MARKS_ICON;

  setTab(tab: 'marks' | 'suggestions') {
    if (this.activeTab !== tab) {
      this.tabChange.emit(tab);
    }
  }
}
