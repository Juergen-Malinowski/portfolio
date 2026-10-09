import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageBar } from '../language-bar/language-bar';
import { animateSectionEntry, cancelSectionEntry, isSectionAligned, waitForSectionScroll } from './section-entry';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, TranslatePipe, LanguageBar],
  standalone: true,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  menuOpen = false;
  private navigationId = 0;

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
    document.dispatchEvent(new Event('skills-navigation'));
    void this.navigateToSection('skills');
  }

  scrollToProjects(): void {
    document.dispatchEvent(new Event('projects-navigation'));
    void this.navigateToSection('projects');
  }

  scrollToContact(): void {
    void this.navigateToSection('contact', true);
  }

  private async navigateToSection(sectionId: string, focusContact = false): Promise<void> {
    this.menuOpen = false;
    const navigationId = ++this.navigationId;
    cancelSectionEntry();

    if (this.router.url !== '/') {
      const navigated = await this.router.navigate(['/']);
      if (!navigated || navigationId !== this.navigationId) return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void this.scrollToSectionAndAnimate(sectionId, focusContact, navigationId);
      });
    });
  }

  private async scrollToSectionAndAnimate(
    sectionId: string,
    focusContact: boolean,
    navigationId: number
  ): Promise<void> {
    if (navigationId !== this.navigationId) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (focusContact) {
      document.getElementById('contact-name')?.focus({ preventScroll: true });
    }

    const scrollFinished = waitForSectionScroll(section);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await scrollFinished;

    if (navigationId !== this.navigationId || !isSectionAligned(section)) return;
    animateSectionEntry(sectionId);
  }
}
