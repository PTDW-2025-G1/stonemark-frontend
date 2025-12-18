import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="report.emit()"
      [class]="customClass"
      [disabled]="disabled"
      class="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold border border-border rounded-lg hover:border-red-500 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
      [class.text-text-muted]="!disabled"
    >
      <i class="bi bi-flag group-hover:text-red-500"></i>
      <span>{{ label }}</span>
    </button>
  `,
  styles: []
})
export class ReportButtonComponent {
  @Input() label = 'Report Issue';
  @Input() disabled = false;
  @Input() customClass = '';
  @Output() report = new EventEmitter<void>();
}

