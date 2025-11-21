import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    getThemeColors() {
        const s = getComputedStyle(document.documentElement);
        return {
            primary300: s.getPropertyValue('--p-primary-300'),
            primary400: s.getPropertyValue('--p-primary-400'),
            primary500: s.getPropertyValue('--p-primary-500'),
            primary600: s.getPropertyValue('--p-primary-600')
        };
    }

    getLinearGradient(from: string, to: string) {
        return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
    }

    getGlow(color: string) {
        return `radial-gradient(circle at 50% 0%, ${color}, transparent 70%)`;
    }
}
