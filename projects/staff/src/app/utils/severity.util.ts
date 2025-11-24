export function getSeverity(status: string): 'success' | 'danger' | 'info' {
    switch (status) {
        case 'APPROVED': return 'success';
        case 'READ': return 'success';
        case 'REJECTED': return 'danger';
        case 'PENDING': return 'info';
        default: return 'info';
    }
}
