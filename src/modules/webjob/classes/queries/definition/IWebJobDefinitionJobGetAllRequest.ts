import { IWebJobDefinitionJobGetAllFilter } from '@webjob/classes/filters';

export interface IWebJobDefinitionJobGetAllRequest {
  definitionUid: string;
  filter?: IWebJobDefinitionJobGetAllFilter;
}