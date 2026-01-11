export function getSeverity(status: string): 'success' | 'danger' | 'info' | 'warn' | 'secondary' | 'contrast' {
    switch (status) {
        // General statuses
        case 'APPROVED': return 'success';
        case 'READ': return 'success';
        case 'REJECTED': return 'danger';
        case 'RESOLVED': return 'success';
        case 'PENDING': return 'warn';
        case 'UNDER_REVIEW': return 'info';

        // Proposal statuses
        case 'SUBMITTED': return 'warn';
        case 'MANUALLY_ACCEPTED': return 'success';
        case 'MANUALLY_REJECTED': return 'danger';
        case 'AUTO_ACCEPTED': return 'success';
        case 'AUTO_REJECTED': return 'danger';
        case 'INCONCLUSIVE': return 'secondary';

        // Filter option
        case 'ALL': return 'contrast';

        default: return 'info';
    }
}
