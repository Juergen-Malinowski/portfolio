import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-bar',
  standalone: true,
  imports: [],
  templateUrl: './language-bar.html',
  styleUrl: './language-bar.scss',
})
export class LanguageBar {
  readonly translate = inject(TranslateService);

  @Output() languageChanged = new EventEmitter<void>();

  setLanguage(lang: 'de' | 'en') {
    this.translate.use(lang);
    this.languageChanged.emit();
  }
}
