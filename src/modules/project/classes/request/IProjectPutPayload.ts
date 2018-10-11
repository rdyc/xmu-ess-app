import { IBasePayload } from '@generic/interfaces';
import { IProjectPutDocument, IProjectPutSales } from '@project/classes/request';

export interface IProjectPutPayload extends IBasePayload {
  customerUid: string;
  projectType: string;
  currencyType: string;
  contractNumber?: string | null;
  name: string;
  description?: string | null;
  start: Date;
  end: Date;
  rate: number;
  valueUsd: number;
  valueIdr?: number | null;
  documents?: IProjectPutDocument[] | null;
  sales?: IProjectPutSales[] | null;
}