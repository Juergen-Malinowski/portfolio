import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Landingpage } from './landingpage/landingpage';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Landingpage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor() {
    // Konstruktor ohne Logik ...
  }

}
