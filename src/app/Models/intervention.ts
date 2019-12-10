import { Image } from './image';
import { Care } from './care';

export interface Intervention {

  id: number;
  date: string;
  comment: string;
  care: Care;
}

