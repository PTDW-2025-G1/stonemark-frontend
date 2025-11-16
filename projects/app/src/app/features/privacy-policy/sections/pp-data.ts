import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pp-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-4 bg-surface-alt rounded-2xl border border-border p-8">
      <h2 class="text-2xl font-semibold text-text">
        1. What personal data do we collect?
      </h2>
      <p class="text-text-muted">
        In the context of using the application, we may collect and process the following categories of personal data:
      </p>
      <ul class="list-disc pl-5 space-y-2 text-text-muted">
        <li><span class="font-medium text-text">Identification data:</span> name, email address, and, if applicable, profile photo.</li>
        <li><span class="font-medium text-text">Usage data:</span> actions performed in the application (e.g., content creation, favorites, searches made).</li>
        <li><span class="font-medium text-text">Submitted content:</span> photos, descriptions, and associated technical metadata (such as capture date/time and, if authorized, approximate location).</li>
        <li><span class="font-medium text-text">Technical data:</span> basic device and browser information, necessary to ensure the platform's security and proper functioning.</li>
      </ul>
    </section>
  `
})
export class PpDataComponent {}
