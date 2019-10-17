import { IWebJobDefinitionJobGetListFilter } from '@webjob/classes/filters';

export interface IWebJobDefinitionJobGetListRequest {
  definitionUid: string;
  filter?: IWebJobDefinitionJobGetListFilter;
}