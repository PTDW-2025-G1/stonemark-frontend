import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  duration?: number;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none" style="max-width: 420px; min-width: 320px;">
      @for (toast of toasts(); track toast.id) {
        <div
          class="pointer-events-auto transform transition-all duration-300 ease-out animate-slide-in-right shadow-2xl rounded-xl border-2 overflow-hidden"
          [ngClass]="{
            'bg-green-50 border-green-200': toast.type === 'success',
            'bg-red-50 border-red-200': toast.type === 'error',
            'bg-blue-50 border-blue-200': toast.type === 'info',
            'bg-yellow-50 border-yellow-200': toast.type === 'warning'
          }"
        >
          <div class="flex items-start gap-3 p-4">
            <!-- Icon -->
            <div
              class="rounded-full p-2 shrink-0"
              [ngClass]="{
                'bg-green-100 text-green-600': toast.type === 'success',
                'bg-red-100 text-red-600': toast.type === 'error',
                'bg-blue-100 text-blue-600': toast.type === 'info',
                'bg-yellow-100 text-yellow-600': toast.type === 'warning'
              }"
            >
              <i
                class="text-lg"
                [ngClass]="{
                  'bi bi-check-circle-fill': toast.type === 'success',
                  'bi bi-x-circle-fill': toast.type === 'error',
                  'bi bi-info-circle-fill': toast.type === 'info',
                  'bi bi-exclamation-triangle-fill': toast.type === 'warning'
                }"
              ></i>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              @if (toast.title) {
                <h4
                  class="font-bold text-sm mb-1"
                  [ngClass]="{
                    'text-green-800': toast.type === 'success',
                    'text-red-800': toast.type === 'error',
                    'text-blue-800': toast.type === 'info',
                    'text-yellow-800': toast.type === 'warning'
                  }"
                >
                  {{ toast.title }}
                </h4>
              }
              <p
                class="text-sm"
                [ngClass]="{
                  'text-green-700': toast.type === 'success',
                  'text-red-700': toast.type === 'error',
                  'text-blue-700': toast.type === 'info',
                  'text-yellow-700': toast.type === 'warning'
                }"
              >
                {{ toast.message }}
              </p>
            </div>

            <!-- Close button -->
            <button
              (click)="removeToast(toast.id)"
              class="shrink-0 p-1 rounded-lg transition-colors"
              [ngClass]="{
                'text-green-600 hover:bg-green-100': toast.type === 'success',
                'text-red-600 hover:bg-red-100': toast.type === 'error',
                'text-blue-600 hover:bg-blue-100': toast.type === 'info',
                'text-yellow-600 hover:bg-yellow-100': toast.type === 'warning'
              }"
              aria-label="Close"
            >
              <i class="bi bi-x-lg text-sm"></i>
            </button>
          </div>

          <!-- Progress bar -->
          @if (toast.duration) {
            <div class="h-1 bg-black/10 overflow-hidden">
              <div
                class="h-full animate-progress"
                [ngClass]="{
                  'bg-green-500': toast.type === 'success',
                  'bg-red-500': toast.type === 'error',
                  'bg-blue-500': toast.type === 'info',
                  'bg-yellow-500': toast.type === 'warning'
                }"
                [style.animation-duration.ms]="toast.duration"
              ></div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in-right {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes progress {
      from {
        width: 100%;
      }
      to {
        width: 0;
      }
    }
  `]
})
export class ToastComponent {
  toasts = signal<Toast[]>([]);

  addToast(toast: Omit<Toast, 'id'>): void {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { ...toast, id };

    this.toasts.update(toasts => [...toasts, newToast]);

    if (toast.duration) {
      setTimeout(() => this.removeToast(id), toast.duration);
    }
  }

  removeToast(id: string): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
}
