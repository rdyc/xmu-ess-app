import { IBaseCommand } from '@generic/interfaces';
import { IProjectAssignmentPatchPayload } from '@project/classes/request/assignment';

export interface IProjectAssignmentPatchRequest extends IBaseCommand<IProjectAssignmentPatchPayload> {
  companyUid: string;
  projectUid: string;
}