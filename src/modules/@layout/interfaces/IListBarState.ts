import { IBaseMetadata } from '@generic/interfaces';
import { SortDirection } from '@generic/types';

export interface IListBarCallback {
  readonly onNextCallback: () => void;
  readonly onPrevCallback: () => void;
  readonly onSyncCallback: () => void;
  readonly onAddCallback: () => void;
  readonly onOrderCallback: (field: IListBarField) => void;
  readonly onSizeCallback: (size: number) => void;
  readonly onDirectionCallback: (direction: SortDirection) => void;
}

export interface IListBarField {
  readonly id: string;
  readonly name: string;
}

export interface IListBarState {
  readonly metadata: IBaseMetadata | undefined;
  readonly callbacks: IListBarCallback;
  readonly fields: IListBarField[] | undefined;
  readonly menuAnchorId: string | undefined;
  readonly menuIsOpen: boolean;
  readonly isLoading: boolean;
  readonly orderBy: string | undefined;
  readonly direction: SortDirection | undefined;
  readonly page: number | undefined;
  readonly size: number | undefined;
}