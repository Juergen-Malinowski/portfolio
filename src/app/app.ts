import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Landingpage } from './mainpage/landingpage/landingpage';
import { About } from './mainpage/about/about';   // <-- NEU


@Component({
  selector: 'app-root',
  imports: [
    Header,
    Landingpage,
    About   // <-- NEU
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor() {
    // Konstruktor ohne Logik ...
  }
}
