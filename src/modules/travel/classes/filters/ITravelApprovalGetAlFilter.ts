export interface ITravelApprovalgetAllFilter {
  // sementara
  readonly 'query.find'?: string | undefined;
  readonly 'query.findBy'?: string | undefined;
  readonly 'query.orderBy'?: string | undefined;
  readonly 'query.direction'?: string | undefined;

  companyUid: string | undefined;
  positionUid: string | undefined;
  status: 'pending' | 'complete' | undefined;
  isNotify: boolean | undefined;

  readonly 'query.page': number | undefined;
  readonly 'query.size': number | undefined;
}