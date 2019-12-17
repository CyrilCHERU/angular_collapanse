import { Job } from './job';

export interface User {
  id: number;
  gender: string;
  firstName: string;
  lastName: string;
  fullName: string;
  adeli: string;
  email: string;
  password: string;
  job: string;
  phone: string;
  address1: string;
  address2?: string;
  zipCode: string;
  city: string;
  slug: string;
}
