import { IProjectAcceptanceGetAllFilter } from '@project/classes/filters/acceptance';

export interface IProjectAcceptanceGetAllRequest {
  filter?: IProjectAcceptanceGetAllFilter | undefined;
}