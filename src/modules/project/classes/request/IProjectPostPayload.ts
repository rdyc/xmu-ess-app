import {
  IProjectPostDocument,
  IProjectPostSales
} from '@project/classes/request';
import { IBasePayload } from '@generic/interfaces';

export interface IProjectPostPayload extends IBasePayload {
  customerUid: string;
  projectType: string;
  currencyType: string;
  contractNumber: string;
  name: string;
  description: string;
  start: string;
  end: string;
  rate: number;
  valueUsd: number;
  valueIdr?: number | null;
  documents?: IProjectPostDocument[] | null;
  sales?: IProjectPostSales[] | null;
}
