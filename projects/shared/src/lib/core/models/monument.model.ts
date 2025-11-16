export interface Monument {
  id: number;
  name: string;
  lat?: number;
  lon?: number;
  wikidata?: string;
  cover?: string;
  location?: string;
  description?: string;
  artist_name?: string;
  material?: 'stone' | 'bronze' | 'iron' | 'wood';
  start_date?: number;
  architect?: string;
}
