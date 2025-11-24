import { Injectable } from '@angular/core';

export interface ContactRequest {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'PENDING' | 'READ';
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private data: ContactRequest[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test message',
      message: 'This is a test message to verify if the contact system is working.',
      createdAt: '2025-11-22 | 14:24',
      status: 'PENDING'
    },
    {
      id: 2,
      name: 'Maria Silva',
      email: 'maria@example.com',
      subject: 'Quote Request',
      message: 'Hello, I would like to know more about your services.',
      createdAt: '2025-11-22 | 09:11',
      status: 'READ'
    },
    {
      id: 3,
      name: 'Carlos Mendes',
      email: 'carlos.mendes@example.com',
      subject: 'Technical Support',
      message: 'I am having trouble logging into the platform.',
      createdAt: '2025-11-24 | 10:42',
      status: 'PENDING'
    },
    {
      id: 4,
      name: 'Ana Rodrigues',
      email: 'ana.rodrigues@example.com',
      subject: 'Feedback',
      message: 'Loved the experience! Keep up the great work.',
      createdAt: '2025-11-20 | 18:12',
      status: 'READ'
    },
    {
      id: 5,
      name: 'Ricardo Alves',
      email: 'ricardo.alves@example.com',
      subject: 'Account Closure',
      message: 'I would like to proceed with closing my account.',
      createdAt: '2025-11-19 | 08:55',
      status: 'PENDING'
    }
  ];

  getAll(): Promise<ContactRequest[]> {
    return Promise.resolve([...this.data]);
  }

  getById(id: number): Promise<ContactRequest | undefined> {
    return Promise.resolve(this.data.find(x => x.id === id));
  }
}
