import { Type } from './criteria.enum';

export interface CriteriaDTO {
  id: number | null;
  type: Type;
  condition: string;
  criteriaValue: string;
}
