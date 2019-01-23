import { IAchievementGetAllFilter } from '@home/classes/filter';

export interface IAchievementGetRequest {
  companyUid: string;
  positionUid: string;
  filter?: IAchievementGetAllFilter;
}