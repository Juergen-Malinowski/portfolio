import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly contactApiUrl = 'https://juergen-malinowski.de/api/contact.php';

  isSending = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

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

  isControlInvalid(controlName: 'name' | 'email' | 'message' | 'privacy'): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && control.touched;
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
        this.contactForm.reset();
      },
      error: () => {
        this.isSending = false;
        this.submitStatus = 'error';
      },
    });
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
