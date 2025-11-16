import {MarkCategory} from '@core/enums/mark.category';
import {MarkShape} from '@core/enums/mark.shape';

export interface Mark {
  id: number;
  title: string;
  location: string;
  cover: string;
  description: string;
  category: MarkCategory;
  shape: MarkShape;
  monument: {
    name: string;
    location: string;
    period: string;
  };
  discoveredBy: string;
  discoveredDate: string;
  occurences: number;
  bookmarks: number;
  monumentId?: number;
}
