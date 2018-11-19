import AppMenu from '@constants/AppMenu';

export interface IViewConfig {
  view: {
    uid: AppMenu | string;
    parentUid?: AppMenu | string | undefined;
    title: string;
    subTitle: string;
  };
  status: {
    isModeSearch?: boolean | false;
    isModeList?: boolean | false;
    isNavBackVisible?: boolean | false;
    isSearchVisible?: boolean | false;
    isLogoutDialogVisible?: boolean | false;
    isActionCentreVisible?: boolean | false;
    isMoreVisible?: boolean | false;
  };
}