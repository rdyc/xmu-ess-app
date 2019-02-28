import AppMenu from '@constants/AppMenu';

export interface IPageInfo {
  uid: AppMenu | string;
  parentUid?: AppMenu | string;
  parentUrl?: string;
  title: string;
  description?: string;
}