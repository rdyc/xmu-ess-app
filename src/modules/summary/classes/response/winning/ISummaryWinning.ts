import { IAccountEmployee } from '@account/classes';
import { ISummaryWinningCategory } from '@summary/classes/response/winning';

export interface ISummaryWinning {
  employeeUid: string;
  employee?: IAccountEmployee | null;
  ratio: number;
  categories: ISummaryWinningCategory[];
}