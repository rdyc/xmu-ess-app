import { ISummaryWinningProject } from '@summary/classes/response/winning';

export interface ISummaryWinningCategory {
  name: string;
  total: number;
  projects?: ISummaryWinningProject[] | null;
}