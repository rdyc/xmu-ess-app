import AppMenu from '@constants/AppMenu';

export interface IPage {
  uid: AppMenu | string;
  isSearching: boolean;
}

export interface IPageState {
  readonly pages: IPage[]; 
}