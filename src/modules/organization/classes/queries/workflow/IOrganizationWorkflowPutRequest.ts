import { IBaseCommand } from '@generic/interfaces';
import { IOrganizationWorkflowPutPayload } from '@organization/classes/request/workflow/request';

export interface IOrganizationWorkflowPutRequest extends IBaseCommand<IOrganizationWorkflowPutPayload> {
  companyUid: string;
  menuUid: string;
}