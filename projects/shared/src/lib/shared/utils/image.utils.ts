import { environment } from '@env/environment';

export class ImageUtils {
    public static getFullUrl(imageId: number): string {
        if (!imageId) {
            return '';
        }
        return `${environment.apiUrl}/media/${imageId}`;
    }

    public static getImageUrl(imageId: number | undefined | null, fallbackUrl: string): string {
        if (!imageId) {
            return fallbackUrl;
        }
        return this.getFullUrl(imageId);
    }
}
