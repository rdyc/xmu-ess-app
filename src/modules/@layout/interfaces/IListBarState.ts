import { IBaseMetadata } from '@generic/interfaces';

export interface IListBarState {
  readonly isReload: boolean;
  readonly metadata: IBaseMetadata | undefined;
}