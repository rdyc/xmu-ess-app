import AppMenu from '@constants/AppMenu';

export interface IView { 
  uid: AppMenu;
  parentUid: AppMenu | undefined;
  title: string;
  subTitle: string;
}