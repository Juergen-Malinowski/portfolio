import { Component } from '@angular/core';
import { Landingpage } from './landingpage/landingpage';
import { About } from './about/about';
import { Skills } from './skills/skills';

@Component({
  selector: 'app-mainpage',
  imports: [Landingpage, About, Skills ],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class Mainpage {
    constructor() {
        // Konstruktor ohne Logik ...
    }
}
