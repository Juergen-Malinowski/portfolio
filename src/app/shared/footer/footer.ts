import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
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

  async scrollToContact(): Promise<void> {
    if (this.router.url !== '/') {
      await this.router.navigate(['/']);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('contact-name')?.focus({
          preventScroll: true,
        });

        document.getElementById('contact')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }
}
