import { IProjectAssignmentGetAllFilter } from '@project/classes/filters/assignment';

export interface IProjectAssignmentGetListRequest {
  filter?: IProjectAssignmentGetAllFilter | undefined;
}