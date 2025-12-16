import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="flex flex-col md:flex-row justify-between md:items-end mb-16">
        <div>
          <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">How it works</div>
          <h2 class="text-4xl md:text-5xl font-serif">From Stone to Cloud</h2>
        </div>
        <div class="mt-6 md:mt-0 md:text-right">
          <p class="text-text-muted italic">A seamless 5-step preservation journey.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">01</div>
          <h3 class="text-2xl font-serif mb-3">Upload Your Photo</h3>
          <p class="text-text-muted leading-relaxed">
            Take a clear picture of the stone mark and upload it through our submission interface.
            The system automatically extracts location data from your photo's GPS metadata.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">02</div>
          <h3 class="text-2xl font-serif mb-3">Smart Recognition</h3>
          <p class="text-text-muted leading-relaxed">
            Our AI analyzes your photo and searches our database for matching marks.
            You'll receive intelligent suggestions for both the mark type and the monument location.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">03</div>
          <h3 class="text-2xl font-serif mb-3">Review & Confirm</h3>
          <p class="text-text-muted leading-relaxed">
            Check the AI suggestions and adjust if needed. You're in control — confirm the mark type,
            verify the location, and add any additional context before submitting.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">04</div>
          <h3 class="text-2xl font-serif mb-3">Instant Evaluation</h3>
          <p class="text-text-muted leading-relaxed">
            Our decision engine analyzes your submission's quality and confidence score.
            High-quality submissions are approved instantly, while others go to expert review for accuracy.
          </p>
        </div>
        <div class="relative pl-8 md:col-span-2">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">05</div>
          <h3 class="text-2xl font-serif mb-3">Published & Preserved</h3>
          <p class="text-text-muted leading-relaxed">
            Once approved, your mark becomes part of our permanent heritage database.
            You'll receive a confirmation notification, and your contribution will be visible on the map for everyone to explore!
          </p>
        </div>
      </div>
    </section>
  `,
})
export class HowItWorksComponent {}
