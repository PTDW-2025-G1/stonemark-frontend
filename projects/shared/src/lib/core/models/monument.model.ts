export interface Monument {
  id: number;
  name: string;
  protection_title: string;
  lat?: number;
  lon?: number;
  website?: string;
  cover?: string;
  location?: string;
  description?: string;
  marksCount?: number;
  suggestionsCount?: number;
  lastModified?: string;
  lastModifiedAt?: string;
}
