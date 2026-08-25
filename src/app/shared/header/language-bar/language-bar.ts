import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-bar',
  standalone: true,
  imports: [],
  templateUrl: './language-bar.html',
  styleUrl: './language-bar.scss',
})
export class LanguageBar {
  activeLang: string = 'en';

  @Output() languageChanged = new EventEmitter<void>();

  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }

  setLanguage(lang: string) {
    this.activeLang = lang;
    this.translate.use(lang);
    this.languageChanged.emit();
  }
}
