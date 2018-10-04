export interface IAppBarMenu {
  readonly id: string;
  readonly name: string;
  readonly enabled: boolean;
  readonly visible: boolean;
}

export interface IAppBarState {
  readonly callback: (menu: IAppBarMenu) => void;
  readonly menus: IAppBarMenu[] | undefined;
  readonly menuIsOpen: boolean;
}