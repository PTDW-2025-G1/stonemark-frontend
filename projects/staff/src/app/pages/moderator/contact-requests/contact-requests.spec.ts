import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { ContactRequests } from './contact-requests';
import {ContactRequest} from '@api/model/contact-request';
import { PageContactRequest } from '@api/model/page-contact-request';

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});


describe('ContactRequests Component', () => {

  let component: ContactRequests;
  let contactService: any;
  let messageService: any;
  let router: any;
  let route: any;
  let queryParams$: BehaviorSubject<any>;

  const mockRequests = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@mail.com',
      subject: 'General',
      status: ContactRequest.StatusEnum.Pending,
      createdAt: '2024-01-01T10:00:00Z',
      message: 'Hello!'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@mail.com',
      subject: 'Support',
      status: ContactRequest.StatusEnum.Resolved,
      createdAt: '2024-01-02T12:00:00Z',
      message: 'Help'
    }
  ];

  const mockPageResponse: PageContactRequest = {
    content: mockRequests,
    totalElements: 2,
    totalPages: 1,
    size: 10,
    number: 0
  };

  beforeEach(() => {
    queryParams$ = new BehaviorSubject({ page: '0', size: '10', status: 'ALL' });

    contactService = {
      getAll: vi.fn().mockReturnValue(of(mockPageResponse)),
      updateStatus: vi.fn(),
    };

    messageService = {
      add: vi.fn(),
    };

    router = {
      navigate: vi.fn().mockReturnValue(Promise.resolve(true)),
    };

    route = {
      queryParams: queryParams$.asObservable(),
    };

    component = new ContactRequests(router, route, contactService, messageService);
  });


  it('should load requests on init', async () => {
    component.ngOnInit();

    // Aguardar carregamento assíncrono
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(contactService.getAll).toHaveBeenCalledWith(0, 10, undefined);
    expect(component.requests().length).toBe(2);
    expect(component.totalRecords()).toBe(2);

    // Date formatting applied (short date)
    expect(component.requests()[0].createdAt).toContain('2024');
  });

  it('should show error toast if loading fails', async () => {
    contactService.getAll.mockReturnValue(throwError(() => new Error('Load failed')));

    component.ngOnInit();

    // Aguardar carregamento assíncrono
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error' })
    );
  });


  it('should filter by status', () => {
    component.filterByStatus('RESOLVED');

    expect(router.navigate).toHaveBeenCalledWith(
      [],
      expect.objectContaining({
        queryParams: expect.objectContaining({
          status: 'RESOLVED',
          page: 0
        })
      })
    );
  });


  it('should open dialog with current item', () => {
    const item = mockRequests[0];

    component.view(item);

    expect(component.dialogVisible).toBe(true);
    expect(component.current).toEqual(item);
  });

  it('should update status successfully', async () => {
    const updated = { ...mockRequests[0], status: ContactRequest.StatusEnum.Resolved };

    contactService.updateStatus.mockReturnValue(of(updated));

    component.updateStatus(mockRequests[0], ContactRequest.StatusEnum.Resolved);

    // Aguardar processamento assíncrono
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(contactService.updateStatus).toHaveBeenCalledWith(1, ContactRequest.StatusEnum.Resolved);
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' })
    );
    // Verifica se loadRequests foi chamado para recarregar os dados
    expect(contactService.getAll).toHaveBeenCalled();
  });

  it('should show error toast on update failure', async () => {
    contactService.updateStatus.mockReturnValue(throwError(() => new Error()));

    component.updateStatus(mockRequests[0], ContactRequest.StatusEnum.Resolved);

    // Aguardar processamento assíncrono
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error' })
    );
  });

  it('should export CSV from table', () => {
    component.tableComp = { exportCSV: vi.fn() } as any;

    component.exportCsv();

    expect(component.tableComp.exportCSV).toHaveBeenCalled();
  });
});
