export interface EntityCardItem {
  id: number;
  title: string;
  subtitle?: string;
  location?: string;
  type: 'monument' | 'mark';
  bookmarkId?: number;
}
