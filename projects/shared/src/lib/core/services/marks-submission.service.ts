import { Injectable } from '@angular/core';

export interface MarksSubmission {
    id: string;
    markName: string;
    submitter: string;
    description?: string;
    logo?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

@Injectable()
export class MarksSubmissionService {
    private data: MarksSubmission[] = [
        { id: '1', markName: 'Mark Alpha', submitter: 'Gustavo Giãozinho', description: 'Descrição A', status: 'PENDING' },
        { id: '2', markName: 'Mark Beta', submitter: 'Ratmiroso', description: 'Descrição B', status: 'PENDING' },
        { id: '3', markName: 'Mark Gamma', submitter: 'Pedro Sempai', description: 'Descrição C', status: 'APPROVED' },
        { id: '4', markName: 'Mark Alpha', submitter: 'Gustavo Giãozinho', description: 'Descrição A', status: 'PENDING' },
        { id: '5', markName: 'Mark Beta', submitter: 'Ratmiroso', description: 'Descrição B', status: 'PENDING' },
        { id: '6', markName: 'Mark Gamma', submitter: 'Pedro Sampaio', description: 'Descrição C', status: 'APPROVED' },
        { id: '7', markName: 'Mark Alpha', submitter: 'Gustavo Geizinho', description: 'Descrição A', status: 'PENDING' },
        { id: '8', markName: 'Mark Beta', submitter: 'Ratmiroso', description: 'Descrição B', status: 'PENDING' },
        { id: '9', markName: 'Mark Gamma', submitter: 'Pedro Sampaio', description: 'Descrição C', status: 'APPROVED' },
        { id: '10', markName: 'Mark Alpha', submitter: 'Gustavo Giãozinho', description: 'Descrição A', status: 'PENDING' },
        { id: '11', markName: 'Mark Beta', submitter: 'Ratmiroso', description: 'Descrição B', status: 'PENDING' },
        { id: '12', markName: 'Mark Gamma', submitter: 'Pedro Sampaio', description: 'Descrição C', status: 'APPROVED' }
    ];

    getSubmissions(): Promise<MarksSubmission[]> {
        return Promise.resolve([...this.data]);
    }

    updateStatus(id: string, status: MarksSubmission['status']): Promise<MarksSubmission> {
        const idx = this.data.findIndex(d => d.id === id);
        if (idx >= 0) {
            this.data[idx] = { ...this.data[idx], status };
            return Promise.resolve({ ...this.data[idx] });
        }
        return Promise.reject('Not found');
    }
}
