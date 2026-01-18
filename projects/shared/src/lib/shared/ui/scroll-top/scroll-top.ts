import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible) {
      <button
        (click)="scrollToTop()"
        class="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 z-50 flex items-center justify-center cursor-pointer"
        aria-label="Voltar ao topo"
      >
        <i class="bi bi-arrow-up text-2xl"></i>
      </button>
    }
  `
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
