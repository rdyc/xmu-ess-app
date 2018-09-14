import { IAccountEmployee } from '@account/interfaces';
import { ICommonSystem } from '@common/interfaces';
import { ILookupPosition } from '@lookup/interfaces';
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