import { Intervention } from './intervention';
export interface Image {

  id: number;
  date: string;
  caption: string;
  url: string;
  intervention: Intervention;
}
