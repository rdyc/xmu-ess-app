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
  onSearch: (find?: string | undefined, field?: IListBarField | undefined) => void;
  menus: IAppBarMenu[] | undefined;
  fields: IListBarField[] | undefined;
}