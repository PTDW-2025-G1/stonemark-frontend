import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccess(message: string, title: string = 'Success'): void {
    console.log(`${title}: ${message}`);
    // In a real application, you would integrate a library like Toastr or Angular Material SnackBar here
    // For example: this.toastr.success(message, title);
  }

  showError(message: string, error?: any, title: string = 'Error'): void {
    console.error(`${title}: ${message}`, error);
    // In a real application, you would integrate a library like Toastr or Angular Material SnackBar here
    // For example: this.toastr.error(message, title);
  }
}
