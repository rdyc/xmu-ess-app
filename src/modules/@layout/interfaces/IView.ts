import AppMenu from '@constants/AppMenu';

export interface IView { 
  uid: AppMenu | string;
  parentUid: AppMenu | string | undefined;
  title: string;
  subTitle: string;
}