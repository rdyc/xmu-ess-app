import { ISummaryWinningFilter } from '@summary/classes/filters';

export interface ISummaryWinningRequest {
  readonly filter: ISummaryWinningFilter | undefined;
  companyUid: string;
}