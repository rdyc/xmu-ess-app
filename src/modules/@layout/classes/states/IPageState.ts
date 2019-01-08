import AppMenu from '@constants/AppMenu';

export interface IPage {
  uid: AppMenu | string;
  isSearch?: boolean;
  isFilter?: boolean;
  isSelect?: boolean;
  request?: any;
}

export interface IPageState {
  readonly pages: IPage[]; 
}