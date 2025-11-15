import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  template: `
    <div class="py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">How It Works</h2>
          <p class="text-xl text-text-muted max-w-2xl mx-auto">
            From discovery to preservation — here's your journey with Stone Mark
          </p>
        </div>
        <div class="relative">
          <div class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-info via-success to-warning hidden md:block"></div>
          <!-- Passo 1 -->
          <div class="relative flex flex-col md:flex-row gap-6 mb-16">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10">
                1
              </div>
            </div>
            <div class="flex-1 bg-surface p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <i class="bi bi-cloud-arrow-up text-5xl text-primary"></i>
                <div>
                  <h3 class="text-2xl font-semibold mb-2">Upload Your Photo</h3>
                  <p class="text-text-muted text-lg">
                    Take a clear picture of the stone mark and upload it through our submission interface.
                    The system automatically extracts location data from your photo's GPS metadata.
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-4">
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <i class="bi bi-geo-alt-fill"></i> Auto GPS Detection
                </span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <i class="bi bi-image"></i> Image Analysis
                </span>
              </div>
            </div>
          </div>
          <!-- Passo 2 -->
          <div class="relative flex flex-col md:flex-row gap-6 mb-16">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-info rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10">
                2
              </div>
            </div>
            <div class="flex-1 bg-surface p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <i class="bi bi-stars text-5xl text-info"></i>
                <div>
                  <h3 class="text-2xl font-semibold mb-2">Smart Recognition</h3>
                  <p class="text-text-muted text-lg">
                    Our AI analyzes your photo and searches our database for matching marks.
                    You'll receive intelligent suggestions for both the mark type and the monument location.
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-4">
                <span class="px-3 py-1 bg-info/10 text-info rounded-full text-sm font-medium">
                  <i class="bi bi-cpu"></i> Pattern Matching
                </span>
                <span class="px-3 py-1 bg-info/10 text-info rounded-full text-sm font-medium">
                  <i class="bi bi-lightning-charge-fill"></i> Instant Results
                </span>
              </div>
            </div>
          </div>
          <!-- Passo 3 -->
          <div class="relative flex flex-col md:flex-row gap-6 mb-16">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10">
                3
              </div>
            </div>
            <div class="flex-1 bg-surface p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <i class="bi bi-check2-circle text-5xl text-success"></i>
                <div>
                  <h3 class="text-2xl font-semibold mb-2">Review & Confirm</h3>
                  <p class="text-text-muted text-lg">
                    Check the AI suggestions and adjust if needed. You're in control — confirm the mark type,
                    verify the location, and add any additional context before submitting.
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-4">
                <span class="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                  <i class="bi bi-pencil-square"></i> Edit Suggestions
                </span>
                <span class="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                  <i class="bi bi-geo"></i> Adjust Location
                </span>
              </div>
            </div>
          </div>
          <!-- Passo 4 -->
          <div class="relative flex flex-col md:flex-row gap-6 mb-16">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-warning rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10">
                4
              </div>
            </div>
            <div class="flex-1 bg-surface p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <i class="bi bi-robot text-5xl text-warning"></i>
                <div>
                  <h3 class="text-2xl font-semibold mb-2">Instant Evaluation</h3>
                  <p class="text-text-muted text-lg">
                    Our decision engine analyzes your submission's quality and confidence score.
                    High-quality submissions are approved instantly, while others go to expert review for accuracy.
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-4">
                <span class="px-3 py-1 text-warning rounded-full text-sm font-medium">
                  <i class="bi bi-graph-up"></i> Quality Check
                </span>
                <span class="px-3 py-1 text-warning rounded-full text-sm font-medium">
                  <i class="bi bi-eye"></i> Expert Review
                </span>
              </div>
            </div>
          </div>
          <!-- Passo 5 -->
          <div class="relative flex flex-col md:flex-row gap-6">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white shadow-lg relative z-10">
                <i class="bi bi-check-lg text-2xl font-bold"></i>
              </div>
            </div>
            <div class="flex-1 bg-gradient-to-br from-primary/5 to-success/5 p-8 rounded-2xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <i class="bi bi-rocket-takeoff text-5xl text-primary"></i>
                <div>
                  <h3 class="text-2xl font-semibold mb-2">Published & Preserved</h3>
                  <p class="text-text-muted text-lg">
                    Once approved, your mark becomes part of our permanent heritage database.
                    You'll receive a confirmation notification, and your contribution will be visible on the map for everyone to explore!
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-4">
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <i class="bi bi-bell-fill"></i> Instant Notification
                </span>
                <span class="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                  <i class="bi bi-pin-map-fill"></i> Live on Map
                </span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <i class="bi bi-infinity"></i> Forever Preserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HowItWorksComponent {}
