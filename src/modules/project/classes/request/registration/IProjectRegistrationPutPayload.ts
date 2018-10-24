import { IBasePayload } from '@generic/interfaces';
import { IProjectRegistrationPutDocument, IProjectRegistrationPutSales } from '@project/classes/request/registration';

export interface IProjectRegistrationPutPayload extends IBasePayload {
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
  documents?: IProjectRegistrationPutDocument[] | null;
  sales?: IProjectRegistrationPutSales[] | null;
}