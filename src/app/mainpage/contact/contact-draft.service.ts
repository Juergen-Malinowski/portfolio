import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router, Scroll } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ContactDraftService {
  private readonly router = inject(Router);
  private returnScrollY: number | null = null;
  private restoreFromHistory = false;

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

  rememberReturnPosition(): void {
    this.returnScrollY = window.scrollY;
  }

  clearDraft(): void {
    this.contactForm.reset();
    this.returnScrollY = null;
    this.restoreFromHistory = false;
  }

  private trackNavigation(event: NavigationStart): void {
    if (event.url !== '/') return;

    this.restoreFromHistory = event.navigationTrigger === 'popstate';
    if (!this.restoreFromHistory) this.returnScrollY = null;
  }

  private restorePosition(): void {
    if (!this.restoreFromHistory || this.returnScrollY === null) return;
    if (this.router.url !== '/') return;

    const savedPosition = this.returnScrollY;
    this.returnScrollY = null;
    this.restoreFromHistory = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.scrollTo(0, savedPosition));
    });
  }
}
