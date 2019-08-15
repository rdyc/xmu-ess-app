import { ISummaryMappingFilter } from '../filters';

export interface ISummaryGetMappingRequest {
  readonly filter: ISummaryMappingFilter | undefined;
  companyUid: string;
  year?: number;
}