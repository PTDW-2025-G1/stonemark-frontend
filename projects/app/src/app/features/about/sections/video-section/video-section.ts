import { Component, Input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-12">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">
          {{ 'video.label' | translate }}
        </div>
        <h2 class="text-4xl md:text-5xl font-serif mb-4">
          {{ 'video.title' | translate }}
        </h2>
        <p class="max-w-2xl mx-auto text-text-muted leading-relaxed">
          {{ 'video.desc' | translate }}
        </p>
      </div>

      <div class="relative max-w-5xl mx-auto">
        <div class="relative aspect-video bg-surface-muted border border-border overflow-hidden group">
          @if (!isPlaying()) {
            <!-- Video Thumbnail with Play Button -->
            <div class="absolute inset-0 cursor-pointer" (click)="playVideo()">
              <img
                [src]="thumbnailUrl()"
                alt="Video thumbnail"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-20 h-20 rounded-full bg-primary/90 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl">
                  <i class="bi bi-play-fill text-white text-3xl ml-1"></i>
                </div>
              </div>
            </div>
          } @else {
            <!-- YouTube Iframe -->
            <iframe
              [src]="embedUrl"
              class="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          }
        </div>

        <!-- Decorative elements -->
        <div class="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-primary opacity-30 pointer-events-none hidden md:block"></div>
        <div class="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-primary opacity-30 pointer-events-none hidden md:block"></div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class VideoSectionComponent {
  @Input() youtubeUrl: string = '';

  isPlaying = signal(false);
  embedUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Extracts the video ID from various YouTube URL formats
   */
  private getVideoId(): string {
    const url = this.youtubeUrl;
    let videoId = '';

    // Handle youtu.be short links
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    // Handle youtube.com/watch?v= links
    else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v') || '';
    }
    // Handle youtube.com/embed/ links
    else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }

    return videoId;
  }

  /**
   * Generates the YouTube thumbnail URL
   */
  thumbnailUrl(): string {
    const videoId = this.getVideoId();
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  /**
   * Plays the video by replacing thumbnail with iframe
   */
  playVideo(): void {
    const videoId = this.getVideoId();
    const url = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.isPlaying.set(true);
  }
}
