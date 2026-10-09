import { Component, inject } from '@angular/core';
import { ContactDraftService } from '../../mainpage/contact/contact-draft.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  imports: [TranslatePipe],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy {
  private readonly contactDraft = inject(ContactDraftService);

  get returnLabelKey(): string {
    return this.contactDraft.privacyReturnLabelKey;
  }

  returnToOrigin(): void {
    this.contactDraft.returnFromPrivacy();
  }
}
