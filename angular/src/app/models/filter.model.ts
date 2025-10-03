import {CriteriaDTO} from './criteria.model';

export interface FilterDTO {
  id: number;
  name: string;
  option: number;
  criteria: CriteriaDTO[];
}

export interface FilterNameDTO {
  id: number;
  name: string;
}
