import { Care } from './care';
import { User } from './user';

export interface Patient {

  id: number;
  gender: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  address1: string;
  address2?: string;
  zipCode: string;
  city: string;
  phone: string;
  email?: string;
  doctor: string;
  nurses: string[];
  cares: Care[];
  fullName: string;
}

