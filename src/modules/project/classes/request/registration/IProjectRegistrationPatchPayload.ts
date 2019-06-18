import { IBasePayload } from '@generic/interfaces';
import { IProjectRegistrationPutDocument, IProjectRegistrationPutSales } from '@project/classes/request/registration';

export interface IProjectRegistrationPatchPayload extends IBasePayload {
  customerUid?: string;
  projectType: string;
  contractNumber?: string;
  name: string;
  description?: string;
  start: string;
  end: string;
  currencyType?: string;
  rate?: number;
  valueUsd?: number;
  valueIdr?: number;
  documents: IProjectRegistrationPutDocument[];
  sales: IProjectRegistrationPutSales[];
}