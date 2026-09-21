import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageBar } from '../language-bar/language-bar';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, TranslatePipe, LanguageBar],
  standalone: true,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  menuOpen = false;

  constructor(private readonly router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  scrollToAbout(): void {
    void this.navigateToSection('about');
  }

  scrollToSkills(): void {
    void this.navigateToSection('skills');
  }

  scrollToProjects(): void {
    void this.navigateToSection('projects');
  }

  scrollToContact(): void {
    void this.navigateToSection('contact', true);
  }

  private async navigateToSection(sectionId: string, focusContact = false): Promise<void> {
    this.menuOpen = false;

    if (this.router.url !== '/') {
      await this.router.navigate(['/']);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (focusContact) {
          document.getElementById('contact-name')?.focus({
            preventScroll: true,
          });
        }

        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }
}
