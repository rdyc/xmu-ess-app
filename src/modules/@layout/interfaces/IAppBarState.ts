import { IListBarField } from './IListBarState';

export interface IAppBarMenu {
  id: string;
  name: string;
  enabled: boolean;
  visible: boolean;
  onClick?: () => void;
}

export interface IAppBarState {
  onClickMenu: (menu: IAppBarMenu) => void;
  onSearching: (find?: string | undefined, field?: IListBarField | undefined) => void;
  onSelectionClear: () => void;
  onSelectionProcess: (values: string[]) => void;
  menus: IAppBarMenu[] | undefined;
  fields: IListBarField[] | undefined;
  selection: string[];
}