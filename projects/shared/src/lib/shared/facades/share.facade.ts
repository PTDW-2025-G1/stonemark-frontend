import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShareFacade {
  copiedCoordinates = false;
  copiedLink = false;
  private copyTimeout: any;

  copyCoordinates(latitude?: number, longitude?: number): void {
    if (latitude == null || longitude == null) return;

    const coords = `${latitude}, ${longitude}`;
    navigator.clipboard.writeText(coords);
    this.copiedCoordinates = true;
    clearTimeout(this.copyTimeout);
    this.copyTimeout = setTimeout(() => {
      this.copiedCoordinates = false;
    }, 2000);
  }

  openInMaps(latitude?: number, longitude?: number): void {
    if (latitude == null || longitude == null) return;

    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      '_blank'
    );
  }

  openDirections(latitude?: number, longitude?: number): void {
    if (latitude == null || longitude == null) return;

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    );
  }

  copyCurrentUrl(): void {
    navigator.clipboard.writeText(window.location.href);
    this.copiedLink = true;
    clearTimeout(this.copyTimeout);
    this.copyTimeout = setTimeout(() => {
      this.copiedLink = false;
    }, 2000);
  }

  shareFacebook(url: string = window.location.href): void {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    );
  }

  shareTwitter(
    text: string,
    url: string = window.location.href
  ): void {
    window.open(
      `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      '_blank'
    );
  }

  shareWhatsApp(
    text: string,
    url: string = window.location.href
  ): void {
    const message = `${text} ${url}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  }

}
