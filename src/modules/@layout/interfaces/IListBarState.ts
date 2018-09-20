import { IBaseMetadata } from '@generic/interfaces';
import { SortDirection } from '@generic/types';

export interface IListBarCallback {
  readonly onNextCallback: () => void;
  readonly onPrevCallback: () => void;
  readonly onSyncCallback: () => void;
  readonly onAddCallback: () => void;
  readonly onOrderCallback: (item: IListBarMenuItem) => void;
  readonly onSizeCallback: (size: number) => void;
  readonly onDirectionCallback: (direction: SortDirection) => void;
}

export interface IListBarMenuItem {
  readonly id: string;
  readonly name: string;
}

export interface IListBarState {
  readonly metadata: IBaseMetadata | undefined;
  readonly isReload: boolean;
  readonly orderBy: string | undefined;
  readonly direction: SortDirection | undefined;
  readonly page: number | undefined;
  readonly size: number | undefined;

  readonly callbacks: IListBarCallback;
  readonly menuAnchorEl: string | undefined;
  readonly menuIsOpen: boolean;
  readonly menuItems: IListBarMenuItem[] | undefined;
}