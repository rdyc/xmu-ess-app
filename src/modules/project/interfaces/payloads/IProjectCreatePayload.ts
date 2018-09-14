import { IProjectCreateDocument, IProjectCreateSales } from '@project/interfaces/payloads';
import { IBasePayload } from '@generic/interfaces';

export interface IProjectCreatePayload extends IBasePayload {
  customerUid:    string;
  projectType:    string;
  currencyType:   string;
  contractNumber: string;
  name:           string;
  description:    string;
  start:          string;
  end:            string;
  rate:           number;
  valueUsd:       number;
  valueIdr:       number | null;
  documents:      IProjectCreateDocument[] | null;
  sales:          IProjectCreateSales[] | null;
}