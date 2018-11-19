import { IBaseMetadata } from '@generic/interfaces';
import { SortDirection } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';

export interface IListBarCallback {
  readonly onNextCallback: () => void;
  readonly onPrevCallback: () => void;
  readonly onSyncCallback: () => void;
  readonly onAddCallback: () => void;
  readonly onOrderCallback: (field: ICollectionValue) => void;
  readonly onSizeCallback: (size: number) => void;
  readonly onDirectionCallback: (direction: SortDirection) => void;
}

export interface IListBarState {
  readonly metadata: IBaseMetadata | undefined;
  readonly callbacks: IListBarCallback;
  readonly fields: ICollectionValue[] | undefined;
  readonly menuAnchorId: string | undefined;
  readonly menuIsOpen: boolean;
  readonly isLoading: boolean;
  readonly addDisabled: boolean;
  readonly orderBy: string | undefined;
  readonly direction: SortDirection | undefined;
  readonly page: number | undefined;
  readonly size: number | undefined;
}