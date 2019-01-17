import { IBaseCommand } from '@generic/interfaces';
import { IOrganizationWorkflowPostPayload } from '@organization/classes/request/workflow/request';

export interface IOrganizationWorkflowPostRequest extends IBaseCommand<IOrganizationWorkflowPostPayload> {
  companyUid: string;
  menuUid: string;
}