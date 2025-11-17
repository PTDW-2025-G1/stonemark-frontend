export interface MarkOccurrence {
  id: number;
  markId: number;
  cover: string;
  title: string;
  location: string;
  monumentId: number;
  monumentName: string;
  discoveredBy: string;
  discoveredDate: string;
  description: string;
  latitude?: number;
  longitude?: number;
}
