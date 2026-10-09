import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router, Scroll } from '@angular/router';

type PrivacyOrigin = 'contact' | 'footer' | 'direct';

@Injectable({ providedIn: 'root' })
export class ContactDraftService {
  private readonly router = inject(Router);
  private returnScrollY: number | null = null;
  private returnAnchorSelector: string | null = null;
  private returnAnchorViewportTop: number | null = null;
  private restoreFromHistory = false;
  private explicitReturn = false;
  private privacyOrigin: PrivacyOrigin = 'direct';
  private returnRoute = '/';

  readonly contactForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
      updateOn: 'blur',
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),

    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
      updateOn: 'blur',
    }),

    privacy: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.trackNavigation(event);
      if (event instanceof Scroll) this.restorePosition();
    });
  }

  get privacyReturnLabelKey(): string {
    if (this.privacyOrigin === 'contact') return 'privacy.backToContact';
    if (this.privacyOrigin === 'footer') return 'privacy.backToFooter';
    return 'privacy.goToPortfolio';
  }

  rememberReturnPosition(): void {
    this.rememberOrigin('contact');
  }

  rememberFooterPosition(): void {
    this.rememberOrigin('footer');
  }

  returnFromPrivacy(): void {
    this.explicitReturn = this.privacyOrigin !== 'direct';
    void this.router.navigateByUrl(this.explicitReturn ? this.returnRoute : '/');
  }

  clearDraft(): void {
    this.contactForm.reset();
    this.clearOrigin();
    this.restoreFromHistory = false;
    this.explicitReturn = false;
  }

  private rememberOrigin(origin: 'contact' | 'footer'): void {
    if (this.router.url === '/privacy') return;

    const selector = origin === 'contact'
      ? '.contact-privacy-link'
      : '.footer-legal-links .footer-legal-link:last-child';
    const anchor = document.querySelector<HTMLElement>(selector);

    this.privacyOrigin = origin;
    this.returnRoute = this.router.url;
    this.returnScrollY = window.scrollY;
    this.returnAnchorSelector = selector;
    this.returnAnchorViewportTop = anchor?.getBoundingClientRect().top ?? null;
  }

  private clearOrigin(): void {
    this.privacyOrigin = 'direct';
    this.returnRoute = '/';
    this.returnScrollY = null;
    this.returnAnchorSelector = null;
    this.returnAnchorViewportTop = null;
  }

  private trackNavigation(event: NavigationStart): void {
    if (event.url !== this.returnRoute && event.url !== '/') return;

    this.restoreFromHistory = this.returnScrollY !== null &&
      (event.navigationTrigger === 'popstate' || this.explicitReturn);
    this.explicitReturn = false;
    if (!this.restoreFromHistory) this.clearOrigin();
  }

  private restorePosition(): void {
    if (!this.restoreFromHistory || this.returnScrollY === null) return;
    if (this.router.url !== this.returnRoute) return;

    const savedPosition = this.returnScrollY;
    const selector = this.returnAnchorSelector;
    const viewportTop = this.returnAnchorViewportTop;
    this.clearOrigin();
    this.restoreFromHistory = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const anchor = selector ? document.querySelector<HTMLElement>(selector) : null;
        const position = anchor && viewportTop !== null
          ? window.scrollY + anchor.getBoundingClientRect().top - viewportTop
          : savedPosition;
        window.scrollTo(0, position);
      });
    });
  }
}
