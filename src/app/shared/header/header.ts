import { Component } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private readonly router: Router) {}

  async scrollToTop(): Promise<void> {
    if (this.router.url !== '/') {
      await this.router.navigate(['/']);
    }

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}
