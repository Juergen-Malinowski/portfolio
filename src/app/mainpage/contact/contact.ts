import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
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
    if (this.contactForm.invalid) {
      return;
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
