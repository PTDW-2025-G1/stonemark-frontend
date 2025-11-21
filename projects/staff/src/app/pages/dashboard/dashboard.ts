import { Component } from '@angular/core';
import { StatsWidget } from './partials/statswidget';
import { BestMonumentsWidget } from './partials/bestmonumentswidget';
import { MarksSubmittedWidget } from './partials/markssubmittedwidget';
import { NotificationsWidget } from './partials/notificationswidget';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [StatsWidget, BestMonumentsWidget, MarksSubmittedWidget, NotificationsWidget],
    template: `
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <app-stats-widget />
      </div>

      <div class="col-span-12 xl:col-span-6">
        <app-marks-submitted-widget />
      </div>

      <div class="col-span-12 xl:col-span-6">
        <app-best-monuments-widget />
      </div>

      <div class="col-span-12">
        <app-notifications-widget />
      </div>
    </div>
  `
})
export class Dashboard {}
