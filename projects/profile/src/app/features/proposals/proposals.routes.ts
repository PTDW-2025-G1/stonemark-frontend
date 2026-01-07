import {Routes} from '@angular/router';

export const PROPOSAL_ROUTES: Routes = [
  {
    path:':id',
    loadComponent: () =>
      import('./pages/proposal-view/proposal-view').then(m => m.ProposalViewComponent),
    title: 'Proposal View'
  }
]
