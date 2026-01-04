import { Component } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-section',
  standalone: true,
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">
          {{ 'contribute-privacy-section.label' | translate }}
        </div>
        <h2 class="text-4xl md:text-5xl font-serif">
          {{ 'contribute-privacy-section.title' | translate }}
        </h2>
        <p class="max-w-3xl mx-auto mt-4 text-text-muted">
          {{ 'contribute-privacy-section.desc' | translate }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- What We Store -->
        <div class="mb-24">
          <h3 class="text-3xl font-serif mb-8 text-center">
            {{ 'contribute-privacy-section.what_we_store_title' | translate }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">
                {{ 'contribute-privacy-section.photo_meta_title' | translate }}
              </h4>
              <p class="text-text-muted text-sm">
                {{ 'contribute-privacy-section.photo_meta_desc' | translate }}
              </p>
            </div>
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">
                {{ 'contribute-privacy-section.user_attr_title' | translate }}
              </h4>
              <p class="text-text-muted text-sm">
                {{ 'contribute-privacy-section.user_attr_desc' | translate }}
              </p>
            </div>
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">
                {{ 'contribute-privacy-section.submission_title' | translate }}
              </h4>
              <p class="text-text-muted text-sm">
                {{ 'contribute-privacy-section.submission_desc' | translate }}
              </p>
            </div>
          </div>
        </div>

        <!-- Your Rights -->
        <div class="mb-24">
          <h3 class="text-3xl font-serif mb-8 text-center">
            {{ 'contribute-privacy-section.your_rights_title' | translate }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">
                {{ 'contribute-privacy-section.full_control_title' | translate }}
              </h4>
              <p class="text-text-muted text-sm">
                {{ 'contribute-privacy-section.full_control_desc' | translate }}
              </p>
            </div>
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">
                {{ 'contribute-privacy-section.data_removal_title' | translate }}
              </h4>
              <p class="text-text-muted text-sm">
                {{ 'contribute-privacy-section.data_removal_desc' | translate }}
              </p>
            </div>
            <div class="pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300">
              <h4 class="font-bold font-serif text-lg mb-2">
                {{ 'contribute-privacy-section.no_sharing_title' | translate }}
              </h4>
              <p class="text-text-muted text-sm">
                {{ 'contribute-privacy-section.no_sharing_desc' | translate }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-3xl font-serif mb-4">
            {{ 'contribute-privacy-section.promise_title' | translate }}
          </h3>
          <div class="bg-surface-alt border border-border p-8 text-center max-w-3xl mx-auto rounded-lg">
            <p class="text-text-muted leading-relaxed mb-4">
              {{ 'contribute-privacy-section.promise_p1' | translate }}
            </p>
            <p class="text-text-muted leading-relaxed">
              {{ 'contribute-privacy-section.promise_p2' | translate }}
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [TranslateModule]
})
export class PrivacySectionComponent {}
