import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  templateUrl: './profile-tabs.html'
})
export class ProfileTabsComponent {
  @Input() activeTab: 'marks' | 'suggestions' = 'marks';
  @Output() tabChange = new EventEmitter<'marks' | 'suggestions'>();

  setTab(tab: 'marks' | 'suggestions') {
    if (this.activeTab !== tab) {
      this.tabChange.emit(tab);
    }
  }
}
