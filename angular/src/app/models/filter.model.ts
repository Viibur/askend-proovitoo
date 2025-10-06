import {CriteriaDTO} from './criteria.model';

export interface FilterDTO {
  id: number | null;
  name: string;
  option: number | null;
  criteria: CriteriaDTO[];
}

export interface FilterNameDTO {
  id: number;
  name: string;
}
