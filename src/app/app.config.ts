import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { provideHttpClient } from '@angular/common/http';

/* NGX-TRANSLATE – moderne API */
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),

    /* Moderne Übersetzungs-Integration */
    provideTranslateService({
      lang: 'en',          // Standardsprache
      fallbackLang: 'en',  // Fallbacksprache
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',  // lädt z.B. /i18n/en.json
        suffix: '.json'
      })
    })
  ]
};
