import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactDraftService } from './contact-draft.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

type ContactTextField = 'name' | 'email' | 'message';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly contactApiUrl = 'https://juergen-malinowski.de/api/contact.php';
  private readonly contactDraft = inject(ContactDraftService);

  private editingField: ContactTextField | null = null;

  isSending = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  readonly contactForm = this.contactDraft.contactForm;

  isControlInvalid(controlName: ContactTextField | 'privacy'): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && control.touched && this.editingField !== controlName;
  }

  onFieldFocus(field: ContactTextField): void {
    this.editingField = field;
  }

  onFieldBlur(field: ContactTextField): void {
    if (this.editingField === field) this.editingField = null;
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.isSending) {
      return;
    }

    this.isSending = true;
    this.submitStatus = 'idle';

    const payload = {
      ...this.contactForm.getRawValue(),
      website: '',
    };

    this.http.post<{ success: boolean }>(this.contactApiUrl, payload).subscribe({
      next: (response) => {
        this.isSending = false;

        if (!response.success) {
          this.submitStatus = 'error';
          return;
        }

        this.submitStatus = 'success';
        this.contactDraft.clearDraft();
      },
      error: () => {
        this.isSending = false;
        this.submitStatus = 'error';
      },
    });
  }

  rememberPrivacyPosition(): void {
    this.contactDraft.rememberReturnPosition();
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  clearSubmitStatus(): void {
    if (this.submitStatus !== 'idle') {
      this.submitStatus = 'idle';
    }
  }
}
