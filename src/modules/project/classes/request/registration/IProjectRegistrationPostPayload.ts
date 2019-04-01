import { IBasePayload } from '@generic/interfaces';
import { IProjectRegistrationPostDocument, IProjectRegistrationPostSales } from '@project/classes/request/registration';

export interface IProjectRegistrationPostPayload extends IBasePayload {
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
  valueIdr: number;
  documents: IProjectRegistrationPostDocument[];
  sales: IProjectRegistrationPostSales[];
}