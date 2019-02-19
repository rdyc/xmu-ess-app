import { ICollectionValue } from '@layout/classes/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface IAppBarControl {
  icon: React.ComponentType<SvgIconProps>;
  disabled?: boolean;
  onClick?: () => void;
}

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
  controls?: IAppBarControl[];
  menus?: IAppBarMenu[];
  fields?: ICollectionValue[];
  selections?: string[];
  searchComponent?: React.ReactNode;
  customComponent?: React.ReactNode;
}