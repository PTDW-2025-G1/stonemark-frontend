import { Injectable } from '@angular/core';
import { ToastComponent } from '@shared/ui/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastComponent?: ToastComponent;

  registerToastComponent(component: ToastComponent): void {
    this.toastComponent = component;
  }

  showSuccess(message: string, title: string = 'Success'): void {
    this.toastComponent?.addToast({
      type: 'success',
      title,
      message,
      duration: 4000
    });
  }

  showError(message: string, error?: any, title: string = 'Error'): void {
    if (error) {
      console.error(`${title}: ${message}`, error);
    }
    this.toastComponent?.addToast({
      type: 'error',
      title,
      message,
      duration: 5000
    });
  }

  showInfo(message: string, title: string = 'Info'): void {
    this.toastComponent?.addToast({
      type: 'info',
      title,
      message,
      duration: 4000
    });
  }

  showWarning(message: string, title: string = 'Warning'): void {
    this.toastComponent?.addToast({
      type: 'warning',
      title,
      message,
      duration: 4000
    });
  }
}
