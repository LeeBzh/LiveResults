export interface Runner {
  bibNumber: number;
  lastName: string;
  firstName: string;
  category: string;
  sexe: string;
  club: string;
  time?: string; // Format "HH:MM:SS"
  classement?: number;
}

export enum Sexe {
  F = 'F',
  M = 'M'
}
