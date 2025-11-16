import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PpHeaderComponent} from '@features/privacy-policy/sections/pp-header';
import {PpDataComponent} from '@features/privacy-policy/sections/pp-data';
import {PpPurposesComponent} from '@features/privacy-policy/sections/pp-purposes';
import {PpRetentionComponent} from '@features/privacy-policy/sections/pp-retention';
import {PpSharingComponent} from '@features/privacy-policy/sections/pp-sharing';
import {PpRightsComponent} from '@features/privacy-policy/sections/pp-rights';
import {PpSecurityContactsComponent} from '@features/privacy-policy/sections/pp-security-contacts';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, PpHeaderComponent, PpDataComponent, PpPurposesComponent, PpRetentionComponent, PpSharingComponent, PpRightsComponent, PpSecurityContactsComponent],
  templateUrl: './privacy-policy.html'
})
export class PrivacyPolicyComponent {}
