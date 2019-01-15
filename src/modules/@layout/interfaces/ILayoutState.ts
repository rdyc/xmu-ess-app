import { IAlert } from '@layout/interfaces/IAlert';
import { IView } from '@layout/interfaces/IView';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

import { Anchor } from '../types/Anchor';

export interface ILayoutState {
  readonly theme: Partial<ThemeOptions>;
  readonly view: IView | undefined;
  readonly parentUrl: string | undefined;
  readonly anchor: Anchor;
  // readonly isDrawerMenuVisible: boolean;
  // readonly isDrawerActionVisible: boolean;
  // readonly isDrawerTopVisible: boolean;
  // readonly isDrawerBottomVisible: boolean;
  // readonly isAccountExpanded: boolean;
  readonly isModeSearch: boolean;
  readonly isModeList: boolean;
  readonly isNavBackVisible: boolean;
  readonly isSearchVisible: boolean;
  // readonly isLogoutDialogVisible: boolean;
  readonly isAlertDialogVisible: boolean;
  // readonly isActionCentreVisible: boolean;
  readonly isMoreVisible: boolean;
  readonly alerts: IAlert[] | [];
}