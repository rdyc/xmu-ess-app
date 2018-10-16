import { IBasePayload } from '@generic/interfaces';
import { IProjectPostDocument, IProjectPostSales } from '@project/classes/request';

export interface IProjectPostPayload extends IBasePayload {
  customerUid: string;
  projectType: string;
  currencyType: string;
  contractNumber?: string | null;
  name: string;
  description?: string | null;
  start: string;
  end: string;
  rate: number;
  valueUsd: number;
  valueIdr?: number | null;
  documents?: IProjectPostDocument[] | null;
  sales?: IProjectPostSales[] | null;
}