import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PpHeaderComponent} from '@features/privacy-policy/sections/privacy-header/privacy-header';
import {PpDataComponent} from '@features/privacy-policy/sections/privacy-data/privacy-data';
import {PpPurposesComponent} from '@features/privacy-policy/sections/privacy-purposes/privacy-purposes';
import {PpRetentionComponent} from '@features/privacy-policy/sections/privacy-retention/privacy-retention';
import {PpSharingComponent} from '@features/privacy-policy/sections/privacy-sharing/privacy-sharing';
import {PpRightsComponent} from '@features/privacy-policy/sections/privacy-rights/privacy-rights';
import {PpSecurityContactsComponent} from '@features/privacy-policy/sections/privacy-security/privacy-security-contacts';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, PpHeaderComponent, PpDataComponent, PpPurposesComponent, PpRetentionComponent, PpSharingComponent, PpRightsComponent, PpSecurityContactsComponent],
  templateUrl: './privacy-policy.html'
})
export class PrivacyPolicyComponent {}
