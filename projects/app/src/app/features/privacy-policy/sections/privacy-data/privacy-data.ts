import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalSectionBlockComponent} from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-pp-data',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent],
  template: `
    <app-legal-section-block
      title="1. What personal data do we collect?"
      [paragraphs]="[
        'In the context of using the application, we may collect and process the following categories of personal data:'
      ]"
      [hasInnerContent]="true"
    >
      <ul class="list-disc pl-5 space-y-2 text-text-muted mt-2">
        <li>
          <span class="font-medium text-text">Identification data:</span>
          name, email address, and, if applicable, profile photo.
        </li>

        <li>
          <span class="font-medium text-text">Usage data:</span>
          actions performed in the application (e.g., content creation, favorites, searches made).
        </li>

        <li>
          <span class="font-medium text-text">Submitted content:</span>
          photos, descriptions, and associated technical metadata (such as capture date/time and, if authorized, approximate location).
        </li>

        <li>
          <span class="font-medium text-text">Technical data:</span>
          basic device and browser information, necessary to ensure the platform's security and proper functioning.
        </li>
      </ul>
    </app-legal-section-block>
  `
})
export class PpDataComponent {}
