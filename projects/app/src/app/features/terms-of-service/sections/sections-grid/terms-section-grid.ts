import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-terms-section-grid',
  standalone: true,
  imports: [CommonModule, TranslateModule, LegalSectionBlockComponent],
  template: `
    <article class="flex flex-col gap-6" aria-label="Terms of Service sections">
      @for (section of sections; track section) {
        <app-legal-section-block
          [title]="'terms-of-service.sections.' + section + '.title' | translate"
          [paragraphs]="[('terms-of-service.sections.' + section + '.content' | translate)]"
        />
      }
    </article>
  `
})
export class TermsSectionGrid {
  sections = [
    'acceptance',
    'description',
    'user_accounts',
    'user_content',
    'prohibited',
    'intellectual_property',
    'disclaimer',
    'limitation',
    'modifications',
    'termination',
    'governing_law',
    'contact'
  ];
}
