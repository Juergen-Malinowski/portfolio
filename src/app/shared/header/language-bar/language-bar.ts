import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-bar',
  standalone: true,
  imports: [],
  templateUrl: './language-bar.html',
  styleUrl: './language-bar.scss',
})
export class LanguageBar {

  activeLang: string = 'en';   // Aktive Sprache merken

  constructor(private translate: TranslateService) {
    /* Standardsprache setzen ... */
    this.translate.use('en');
  }

  setLanguage(lang: string) {
    /* Sprache umschalten ... */
    this.activeLang = lang;          // Aktive Sprache aktualisieren
    this.translate.use(lang);        // übersetzen in Sprache "lang"
  }

}
