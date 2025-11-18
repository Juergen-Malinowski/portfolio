import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-bar',
  standalone: true,              /* ← WICHTIG! */
  imports: [],
  templateUrl: './language-bar.html',
  styleUrl: './language-bar.scss',
})
export class LanguageBar {

  constructor(private translate: TranslateService) {
    /* Standardsprache setzen ... */
    this.translate.use('en');
  }

  setLanguage(lang: string) {
    /* Sprache umschalten ... */
    this.translate.use(lang);
  }

}
