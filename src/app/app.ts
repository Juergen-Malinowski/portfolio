import { Component, signal } from '@angular/core';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Mainpage } from './mainpage/mainpage';

@Component({
    selector: 'app-root',
    imports: [
        Header,
        Mainpage,
        Footer
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
