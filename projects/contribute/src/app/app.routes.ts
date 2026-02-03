import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'proposals',
    loadComponent: () => import('./features/proposals/pages/proposals-main/proposals').then(m => m.ProposalsComponent)
  },
  {
    path: 'proposals/mark-occurrence/:id',
    loadComponent: () => import('./features/proposals/pages/mark-occurrence-proposal-view/mark-occurrence-proposal-view').then(m => m.MarkOccurrenceProposalViewComponent)
  }
];
