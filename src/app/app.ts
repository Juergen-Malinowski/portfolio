import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Landingpage } from './landingpage/landingpage';
import { About } from './about/about';   // <-- NEU


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
