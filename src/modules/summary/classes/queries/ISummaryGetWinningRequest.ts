import { ISummaryWinningFilter } from '@summary/classes/filters';

export interface ISummaryGetWinningRequest {
  readonly filter: ISummaryWinningFilter | undefined;
  companyUid: string;
}