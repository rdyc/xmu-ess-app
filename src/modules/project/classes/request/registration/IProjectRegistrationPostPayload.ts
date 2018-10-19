import { IBasePayload } from '@generic/interfaces';
import { IProjectRegistrationPostDocument, IProjectRegistrationPostSales } from '@project/classes/request/registration';

export interface IProjectRegistrationPostPayload extends IBasePayload {
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
  documents?: IProjectRegistrationPostDocument[] | null;
  sales?: IProjectRegistrationPostSales[] | null;
}