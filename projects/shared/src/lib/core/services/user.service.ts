import { Injectable } from '@angular/core';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    type: 'User' | 'Moderator';
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private users: User[] = [
        { id: '1', firstName: 'João', lastName: 'Silva', email: 'joao@exemplo.com', type: 'User' },
        { id: '2', firstName: 'Maria', lastName: 'Costa', email: 'maria@exemplo.com', type: 'Moderator' },
        { id: '3', firstName: 'João', lastName: 'Silva', email: 'joao@exemplo.com', type: 'User' },
        { id: '4', firstName: 'Maria', lastName: 'Costa', email: 'maria@exemplo.com', type: 'Moderator' },
        { id: '5', firstName: 'João', lastName: 'Silva', email: 'joao@exemplo.com', type: 'User' },
        { id: '6', firstName: 'Maria', lastName: 'Costa', email: 'maria@exemplo.com', type: 'Moderator' },
        { id: '7', firstName: 'João', lastName: 'Silva', email: 'joao@exemplo.com', type: 'User' },
        { id: '8', firstName: 'Maria', lastName: 'Costa', email: 'maria@exemplo.com', type: 'Moderator' },
        { id: '9', firstName: 'João', lastName: 'Silva', email: 'joao@exemplo.com', type: 'User' },
        { id: '10', firstName: 'Maria', lastName: 'Costa', email: 'maria@exemplo.com', type: 'Moderator' },
        { id: '11', firstName: 'Maria', lastName: 'Costa', email: 'maria@exemplo.com', type: 'Moderator' },
        { id: '12', firstName: 'Ratmir', lastName: 'Costa', email: 'ratmir@exemplo.com', type: 'Moderator' },
    ];

    getUsers(): Promise<User[]> {
        return Promise.resolve([...this.users]);
    }

    updateType(id: string, type: 'User' | 'Moderator'): Promise<User> {
        const idx = this.users.findIndex(u => u.id === id);
        if (idx > -1) {
            this.users[idx] = { ...this.users[idx], type };
            return Promise.resolve({ ...this.users[idx] });
        }
        return Promise.reject('Utilizador não encontrado');
    }
}
