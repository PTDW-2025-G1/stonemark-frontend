import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb-profile.html'
})
export class BreadcrumbProfileComponent {
  @Input() currentPage!: string;
}

