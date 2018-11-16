import { ICollectionValue } from '@layout/classes/core';

export interface IAppBarMenu {
  id: string;
  name: string;
  enabled: boolean;
  visible: boolean;
  onClick?: () => void;
}

export interface IAppBarState {
  onClickMenu: (menu: IAppBarMenu) => void;
  onSearching: (find?: string | undefined, field?: ICollectionValue | undefined) => void;
  onSelectionClear: () => void;
  onSelectionProcess: (values: string[]) => void;
  menus: IAppBarMenu[] | undefined;
  fields: ICollectionValue[] | undefined;
  selection: string[];
}