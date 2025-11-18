import { Component } from '@angular/core';
import { Landingpage } from './landingpage/landingpage';
import { About } from './about/about';

@Component({
  selector: 'app-mainpage',
  imports: [Landingpage, About],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class Mainpage {

}
