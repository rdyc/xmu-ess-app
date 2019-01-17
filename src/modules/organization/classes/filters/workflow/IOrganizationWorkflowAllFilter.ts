import { IBasePagingFilter } from '@generic/interfaces';

export interface IOrganizationWorkflowAllFilter extends IBasePagingFilter {
  companyUid: string | undefined;
  menuUid: string | undefined;
}