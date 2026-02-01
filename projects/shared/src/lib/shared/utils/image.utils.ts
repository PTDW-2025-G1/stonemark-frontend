import { environment } from '@env/environment';

export enum ImageVariant {
    ORIGINAL = '',
    THUMBNAIL = '/thumbnail',
    PREVIEW = '/preview',
    OPTIMIZED = '/optimized'
}

export class ImageUtils {
    public static getFullUrl(imageId: number, variant: ImageVariant = ImageVariant.ORIGINAL): string {
        if (!imageId) {
            return '';
        }
        return `${environment.apiUrl}/public/media/${imageId}${variant}`;
    }

    public static getImageUrl(imageId: number | undefined | null, fallbackUrl: string, variant: ImageVariant = ImageVariant.ORIGINAL): string {
        if (!imageId) {
            return fallbackUrl;
        }
        return this.getFullUrl(imageId, variant);
    }
}
