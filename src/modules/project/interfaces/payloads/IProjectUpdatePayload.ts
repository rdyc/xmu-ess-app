import { IProjectUpdateDocument, IProjectUpdateSales } from '@project/interfaces/payloads';
import { IBasePayload } from '@generic/interfaces';

export interface IProjectUpdatePayload extends IBasePayload {
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
  documents:      IProjectUpdateDocument[];
  sales:          IProjectUpdateSales[];
}