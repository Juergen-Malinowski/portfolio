import { Component } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';
import { LanguageBar } from './language-bar/language-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBar, LanguageBar],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  constructor() {
    // Konstruktor ohne Logik ...
  }

  /* ============================= */
  /*   Zur Landingpage scrollen ... */
  /* ============================= */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
