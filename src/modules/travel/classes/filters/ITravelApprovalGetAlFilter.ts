export interface ITravelApprovalgetAllFilter {
  companyUid: string | undefined;
  positionUid: string | undefined;
  customerUid: string | undefined;
  status?: 'pending' | 'complete';
  isNotify?: boolean;

  // sementara
  readonly 'query.find'?: string | undefined;
  readonly 'query.findBy'?: string | undefined;
  readonly 'query.orderBy'?: string | undefined;
  readonly 'query.direction'?: string | undefined;

  readonly 'query.page'?: number | undefined;
  readonly 'query.size'?: number | undefined;
}