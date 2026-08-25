import { Component } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBar],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
