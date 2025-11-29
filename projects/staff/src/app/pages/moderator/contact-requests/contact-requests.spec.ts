import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { ContactRequests } from './contact-requests';
import {ContactRequest} from '@api/model/contact-request';

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});


describe('ContactRequests Component', () => {

  let component: ContactRequests;
  let contactService: any;
  let messageService: any;

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

  beforeEach(() => {
    contactService = {
      getAll: vi.fn(),
      updateStatus: vi.fn(),
    };

    messageService = {
      add: vi.fn(),
    };

    component = new ContactRequests(contactService, messageService);
  });


  it('should load requests on init', () => {
    contactService.getAll.mockReturnValue(of(mockRequests));

    component.ngOnInit();

    expect(component.requests.length).toBe(2);
    expect(component.filtered().length).toBe(2);

    // Date formatting applied
    expect(component.requests[0].createdAt).toContain('2024');
  });

  it('should show error toast if loading fails', () => {
    contactService.getAll.mockReturnValue(throwError(() => new Error()));

    component.ngOnInit();

    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error' })
    );
  });


  it('should filter by status', () => {
    component.requests = mockRequests;

    component.filterByStatus('RESOLVED');

    expect(component.filtered().length).toBe(1);
    expect(component.filtered()[0].status).toBe('RESOLVED');
  });


  it('should open dialog with current item', () => {
    const item = mockRequests[0];

    component.view(item);

    expect(component.dialogVisible).toBe(true);
    expect(component.current).toEqual(item);
  });

  it('should update status successfully', () => {
    const updated = { ...mockRequests[0], status: 'RESOLVED' };

    component.requests = [...mockRequests];
    contactService.updateStatus.mockReturnValue(of(updated));

    component.updateStatus(mockRequests[0], 'RESOLVED');

    expect(component.requests[0].status).toBe('RESOLVED');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' })
    );
  });

  it('should show error toast on update failure', () => {
    component.requests = [...mockRequests];
    contactService.updateStatus.mockReturnValue(throwError(() => new Error()));

    component.updateStatus(mockRequests[0], 'RESOLVED');

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
