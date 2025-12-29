import { provideEnvironmentInitializer, inject } from '@angular/core';
import { LayoutService } from './layout.service';
import { DOCUMENT } from '@angular/common';
import { $t } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

const presets = { Aura, Lara, Nora };

export function provideThemeInitializer() {
    return provideEnvironmentInitializer(() => {
        const layoutService = inject(LayoutService);
        const document = inject(DOCUMENT);

        const config = layoutService.getStoredConfig();
        if (config.darkTheme) {
            document.documentElement.classList.add('app-dark');
        }

        const preset = presets[config.preset as keyof typeof presets] || Aura;
        $t().preset(preset).use();
    });
}
