import { Image } from './image';

export interface Intervention {

  id: number;
  date: string;
  comment: string;
  images: Image[];
}

