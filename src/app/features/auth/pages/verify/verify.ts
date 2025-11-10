import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  template: `
    <section class="text-center py-16">
      <h1 class="text-3xl font-semibold text-primary mb-4">
        {{ status === 'success' ? 'Account Verified!' : 'Verification Failed' }}
      </h1>
      <p class="text-text-muted">
        {{ message || (status === 'success' ? 'Your account is now active.' : 'The verification link is invalid or expired.') }}
      </p>
    </section>
  `
})
export class VerifyComponent {
  status: string | null;
  message: string | null;

  constructor(private route: ActivatedRoute) {
    this.status = this.route.snapshot.queryParamMap.get('status');
    this.message = this.route.snapshot.queryParamMap.get('message');
  }
}
