import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">

      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-20">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
          {{ 'contribute-how-it-works.header_label' | translate }}
        </div>
        <h2 class="text-4xl md:text-6xl font-serif mb-6">
          {{ 'contribute-how-it-works.header_title' | translate }}
        </h2>
        <p class="text-text-muted leading-relaxed text-lg md:text-xl font-light">
          {{ 'contribute-how-it-works.header_desc' | translate }}
        </p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        <div class="p-8 rounded-2xl bg-surface-alt border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
          <div class="w-10 h-10 rounded-full bg-surface border border-border text-primary flex items-center justify-center font-bold text-sm mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            1
          </div>
          <h3 class="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
            {{ 'contribute-how-it-works.step1_title' | translate }}
          </h3>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'contribute-how-it-works.step1_desc' | translate }}
          </p>
        </div>
        <div class="p-8 rounded-2xl bg-surface-alt border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
          <div class="w-10 h-10 rounded-full bg-surface border border-border text-primary flex items-center justify-center font-bold text-sm mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            2
          </div>
          <h3 class="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
            {{ 'contribute-how-it-works.step2_title' | translate }}
          </h3>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'contribute-how-it-works.step2_desc' | translate }}
          </p>
        </div>
        <div class="p-8 rounded-2xl bg-surface-alt border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
          <div class="w-10 h-10 rounded-full bg-surface border border-border text-primary flex items-center justify-center font-bold text-sm mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            3
          </div>
          <h3 class="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
            {{ 'contribute-how-it-works.step3_title' | translate }}
          </h3>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'contribute-how-it-works.step3_desc' | translate }}
          </p>
        </div>
        <div class="p-8 rounded-2xl bg-surface-alt border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
          <div class="w-10 h-10 rounded-full bg-surface border border-border text-primary flex items-center justify-center font-bold text-sm mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            4
          </div>
          <h3 class="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
            {{ 'contribute-how-it-works.step4_title' | translate }}
          </h3>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ 'contribute-how-it-works.step4_desc' | translate }}
          </p>
        </div>
      </div>

      <!-- Desktop Image Showcase -->
      <div class="hidden md:block relative group mb-32">
        <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-surface-alt">
          <img src="assets/images/captureMark.webp" [alt]="'contribute-how-it-works.desktop_img_alt' | translate" class="w-full h-auto" />
        </div>
        <div class="text-center mt-6">
          <p class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted">
            <i class="bi bi-phone"></i> {{ 'contribute-how-it-works.actual_interface' | translate }}
          </p>
        </div>
      </div>

      <!-- Mobile Image Showcase -->
      <div class="md:hidden -mx-6 space-y-0 overflow-hidden mb-24">
        <div class="w-[115%] -ml-[7.5%]">
          <img src="assets/images/captureMarkMobile1.webp" [alt]="'contribute-how-it-works.mobile_img1_alt' | translate" class="w-full h-auto block" />
        </div>
        <div class="w-[115%] -ml-[7.5%]">
          <img src="assets/images/captureMarkMobile2.webp" [alt]="'contribute-how-it-works.mobile_img2_alt' | translate" class="w-full h-auto block" />
        </div>
        <div class="w-[115%] -ml-[7.5%]">
          <img src="assets/images/captureMarkMobile3.webp" [alt]="'contribute-how-it-works.mobile_img3_alt' | translate" class="w-full h-auto block" />
        </div>

        <div class="text-center mt-8 px-6">
          <p class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted">
            <i class="bi bi-phone"></i> {{ 'contribute-how-it-works.actual_interface' | translate }}
          </p>
        </div>
      </div>

      <!-- Detailed Guide -->
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="w-12 h-1 bg-primary block mx-auto mb-6 rounded-full opacity-50"></span>
          <h3 class="text-3xl font-serif mb-4">
            {{ 'contribute-how-it-works.guide_title' | translate }}
          </h3>
          <p class="text-text-muted">
            {{ 'contribute-how-it-works.guide_desc' | translate }}
          </p>
        </div>

        <div class="relative border-l border-border ml-4 md:ml-0 md:border-l-0 space-y-12">
          @for (i of [1,2,3,4,5,6,7,8,9]; track i; let idx = $index) {
            <div class="md:flex gap-8 items-start group">
              <div class="absolute left-[-5px] md:static md:w-24 md:flex-none md:text-right">
                <span class="hidden md:block text-2xl font-serif font-bold text-border group-hover:text-primary transition-colors">0{{idx + 1}}</span>
                <div class="md:hidden w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface"></div>
              </div>
              <div class="pl-8 md:pl-0 pt-1 md:pt-2">
                <h4 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {{ ('contribute-how-it-works.detailed' + (idx+1) + '_title') | translate }}
                </h4>
                <p class="text-text-muted leading-relaxed">
                  {{ ('contribute-how-it-works.detailed' + (idx+1) + '_desc') | translate }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>

    </section>
  `
})
export class HowItWorksComponent {}
