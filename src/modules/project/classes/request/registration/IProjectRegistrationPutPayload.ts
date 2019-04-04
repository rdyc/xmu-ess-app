import { IBasePayload } from '@generic/interfaces';
import { IProjectRegistrationPutDocument, IProjectRegistrationPutSales } from '@project/classes/request/registration';

export interface IProjectRegistrationPutPayload extends IBasePayload {
  customerUid: string;
  projectType: string;
  currencyType: string;
  contractNumber?: string;
  name: string;
  description?: string;
  start: string;
  end: string;
  rate: number;
  valueUsd: number;
  valueIdr?: number;
  hours?: number;
  documents: IProjectRegistrationPutDocument[];
  sales: IProjectRegistrationPutSales[];
}