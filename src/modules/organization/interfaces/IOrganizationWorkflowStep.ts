import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { ILookupPosition } from '@lookup/classes';
import { IOrganizationWorkflowStepResponse } from '@organization/interfaces';

export interface IOrganizationWorkflowStep {
  positionUid:  string;
  position:     ILookupPosition | null;
  relationType: string | null;
  relation:     ICommonSystem | null;
  employees:    IAccountEmployee[] | null;
  level:        number;
  round:        number;
  response:     IOrganizationWorkflowStepResponse | null;
  isComplete:   boolean;
}