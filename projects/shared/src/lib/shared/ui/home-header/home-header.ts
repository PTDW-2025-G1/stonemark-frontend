import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-header',
  standalone: true,
  templateUrl: './home-header.html'
})
export class HomeHeaderComponent {
  @Input() badge = '';
  @Input() title = '';
  @Input() subtitle = '';
}
