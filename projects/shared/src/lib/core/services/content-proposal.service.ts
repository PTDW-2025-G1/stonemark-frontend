import { Injectable } from '@angular/core';

export interface ContentProposal {
    id: string;
    type: string;
    status: string;
    createdAt: string;
    createdBy: string;
    details: string;
}

@Injectable({ providedIn: 'root' })
export class ContentProposalService {
    private proposals: ContentProposal[] = [
        { id: '1', type: 'Monumento', status: 'PENDING', createdAt: '2024-06-01', createdBy: 'João', details: 'Alteração de nome.' },
        { id: '2', type: 'Marca', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '3', type: 'Monumento', status: 'PENDING', createdAt: '2024-06-01', createdBy: 'João', details: 'Alteração de nome.' },
        { id: '4', type: 'Marca', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '5', type: 'Monumento', status: 'PENDING', createdAt: '2024-06-01', createdBy: 'João', details: 'Alteração de nome.' },
        { id: '6', type: 'Marca', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '7', type: 'Monumento', status: 'PENDING', createdAt: '2024-06-01', createdBy: 'João', details: 'Alteração de nome.' },
        { id: '8', type: 'Monumento', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '9', type: 'Marca', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '10', type: 'Monumento', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '11', type: 'Marca', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '12', type: 'Monumento', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '13', type: 'Marca', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
        { id: '14', type: 'Marca', status: 'APPROVED', createdAt: '2024-05-28', createdBy: 'Maria', details: 'Atualização de descrição.' },
    ];

    getProposals(): Promise<ContentProposal[]> {
        return Promise.resolve([...this.proposals]);
    }

    updateStatus(id: string, status: 'APPROVED' | 'REJECTED'): Promise<ContentProposal> {
        const idx = this.proposals.findIndex(p => p.id === id);
        if (idx > -1) {
            this.proposals[idx] = { ...this.proposals[idx], status };
            return Promise.resolve({ ...this.proposals[idx] });
        }
        return Promise.reject('Proposta não encontrada');
    }
}
