import { IBasePagination } from '@generic/interfaces';

export interface IAchievementPatchPayload extends IBasePagination {
  file: FileList;
}