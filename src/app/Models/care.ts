import { Patient } from './patient';
import { Intervention } from './intervention';

export interface Care {
  id: number;
  createdAt: string;
  endedAt?: string;
  woundType: string;
  interventions: Intervention[];
  patient: Patient;
}

