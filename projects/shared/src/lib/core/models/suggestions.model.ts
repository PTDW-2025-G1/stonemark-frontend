export interface Suggestion {
  id: number;
  monumentName: string;
  monumentImage: string;
  type: 'description' | 'location' | 'date' | 'images' | 'other';
  description: string;
  status: 'validated' | 'pending' | 'rejected';
  submittedDate: string;
  appliedDate?: string;
  rejectionReason?: string;
}
