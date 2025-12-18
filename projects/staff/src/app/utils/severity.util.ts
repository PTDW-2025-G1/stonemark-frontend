export function getSeverity(status: string): 'success' | 'danger' | 'info' | 'warn' {
    switch (status) {
        case 'APPROVED': return 'success';
        case 'READ': return 'success';
        case 'REJECTED': return 'danger';
        case 'RESOLVED': return 'success';
        case 'PENDING': return 'warn';
        case 'UNDER_REVIEW': return 'info';
        default: return 'info';
    }
}
