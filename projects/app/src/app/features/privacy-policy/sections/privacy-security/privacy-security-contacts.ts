import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalSectionBlockComponent} from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-pp-security-contacts',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, LegalSectionBlockComponent],
  template: `
    <app-legal-section-block
      title="6. Data security and contacts"
      [paragraphs]="paragraphs"
    />
  `
})
export class PpSecurityContactsComponent {
  paragraphs = [
    'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, destruction, or improper alteration.',
    'As this is an academic project, any additional questions about privacy or requests regarding your data can be addressed to the team responsible for the application.',
    `Last updated: ${new Date().toLocaleDateString('pt-PT')}`
  ];
}
