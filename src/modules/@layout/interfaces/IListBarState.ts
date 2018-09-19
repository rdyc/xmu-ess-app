import { IBaseMetadata } from '@generic/interfaces';
import { SortDirection } from '@material-ui/core/TableCell';

export interface IListBarCallback {
  readonly onNextCallback: () => void;
  readonly onPrevCallback: () => void;
  readonly onSyncCallback: () => void;
  readonly onAddCallback: () => void;
  readonly onOrderCallback: (field: string) => void;
  readonly onSortCallback: () => void;
}

export interface IListBarState {
  readonly metadata: IBaseMetadata | undefined;
  readonly isReload: boolean;
  readonly orderBy: string | undefined;
  readonly direction: SortDirection | undefined;
  readonly page: number | undefined;
  readonly size: number | undefined;
  readonly callbacks: IListBarCallback;
  
}