import {Routes} from '@angular/router';

export const PROPOSAL_ROUTES: Routes = [
  {
    path:'mark-occurrence/:id',
    loadComponent: () =>
      import('./mark-occurrence-proposal-view/mark-occurrence-proposal-view').then(m => m.MarkOccurrenceProposalViewComponent),
    title: 'Mark Occurrence Proposal View'
  }
]
