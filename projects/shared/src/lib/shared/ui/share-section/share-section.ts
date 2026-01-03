import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareFacade } from '@shared/facades/share.facade';
import { SocialShareButtonComponent } from '@shared/ui/social-share-button/social-share-button';

@Component({
  selector: 'app-share-section',
  standalone: true,
  imports: [CommonModule, SocialShareButtonComponent],
  template: `
    <div [class]="containerClass">
      <div class="flex items-center gap-2" [class.justify-between]="layout === 'horizontal'">
        <div class="flex gap-4" [class]="layout === 'horizontal' ? 'gap-5' : 'gap-4'">
          <app-social-share-button
            iconClass="bi bi-facebook"
            title="Share on Facebook"
            hoverClass="hover:text-blue-600"
            (clicked)="shareFacade.shareFacebook()">
          </app-social-share-button>
          <app-social-share-button
            iconClass="bi bi-whatsapp"
            title="Share on WhatsApp"
            hoverClass="hover:text-green-500"
            (clicked)="shareFacade.shareWhatsApp(shareText)">
          </app-social-share-button>
          <app-social-share-button
            iconClass="bi bi-twitter-x"
            title="Share on X (Twitter)"
            hoverClass="hover:text-black"
            (clicked)="shareFacade.shareTwitter(shareText)">
          </app-social-share-button>
          <app-social-share-button
            iconClass="bi bi-link-45deg"
            activeIconClass="bi bi-check-circle-fill"
            [active]="shareFacade.copiedLink"
            [title]="shareFacade.copiedLink ? 'Copied!' : 'Copy link'"
            activeClass="text-green-600"
            hoverClass="hover:text-primary"
            (clicked)="shareFacade.copyCurrentUrl()">
          </app-social-share-button>
        </div>
      </div>
    </div>
  `
})
export class ShareSectionComponent {
  @Input() shareText = 'Check this out!';
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() containerClass = '';

  constructor(public shareFacade: ShareFacade) {}
}

