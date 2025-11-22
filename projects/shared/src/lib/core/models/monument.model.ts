export interface Monument {
  id: number;
  name: string;
  protectionTitle: string;
  lat?: number;
  lon?: number;
  wikidata?: string;
  website?: string;
  cover?: string;
  location?: string;
  description?: string;
  marksCount?: number;
  suggestionsCount?: number;
  lastModified?: string;
  lastModifiedAt?: string;
}
