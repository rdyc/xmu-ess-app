import { IListBarField } from './IListBarState';

export interface IAppBarMenu {
  readonly id: string;
  readonly name: string;
  readonly enabled: boolean;
  readonly visible: boolean;
}

export interface IAppBarState {
  onClickMenu: (menu: IAppBarMenu) => void;
  onSearch: (find?: string | undefined, field?: IListBarField | undefined) => void;
  menus: IAppBarMenu[] | undefined;
  fields: IListBarField[] | undefined;
  menuIsOpen: boolean;
}