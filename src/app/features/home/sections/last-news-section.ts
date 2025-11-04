import { Component, OnInit } from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from '@angular/common';
import { HomeService, NewsItem } from '@features/home/home.service';

@Component({
  selector: 'app-last-news-section',
  standalone: true,
  imports: [CommonModule, DatePipe, NgOptimizedImage],
  template: `
    <section class="py-12 sm:py-16 lg:py-24 bg-surface text-text">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Cabeçalho -->
        <div class="text-center mb-10 sm:mb-12 lg:mb-16">
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
            News
          </p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-text">
            Last News
          </h2>
        </div>

        <!-- Estado de carregamento -->
        @if (loading) {
          <div class="text-center py-10 text-text-muted">
            Loading latest news...
          </div>
        }

        <!-- Estado de erro -->
        @if (error) {
          <div class="text-center py-10 text-red-600 font-medium">
            Failed to load news. Please try again later.
          </div>
        }

        <!-- Lista de notícias -->
        @if (!loading && !error) {
          <div class="flex flex-col gap-8 sm:gap-10 lg:gap-12">
            @for (item of news; track item.id) {
              <article
                class="flex flex-col sm:flex-row gap-6 bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
              >
                <!-- Imagem -->
                <div class="w-full sm:w-80 h-56 sm:h-auto flex-shrink-0">
                  <img
                    [ngSrc]="item.image || 'assets/images/placeholder-news.jpg'"
                    [alt]="item.title"
                    width="320"
                    height="224"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Conteúdo -->
                <div class="flex flex-col justify-center p-6 sm:py-6 sm:pr-8">
                  <h3 class="text-xl sm:text-xl font-serif font-semibold text-text mb-3 leading-tight">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm sm:text-base text-text-muted mb-4 leading-relaxed line-clamp-3">
                    {{ item.content_text }}
                  </p>
                  <div class="flex justify-between items-center text-xs sm:text-sm text-text-muted mt-auto">
                    <time class="font-medium">
                      {{ item.date_published | date: 'd/MM/yyyy, HH:mm' }}
                    </time>
                    <a
                      [href]="item.url"
                      target="_blank"
                      class="text-info hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Ler mais
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </article>
            } @empty {
              <p class="text-center text-text-muted py-10">No news available at the moment.</p>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class LastNewsComponent implements OnInit {
  news: NewsItem[] = [];
  loading = true;
  error = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getLatestNews().subscribe({
      next: data => {
        this.news = data.slice(0, 5);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
