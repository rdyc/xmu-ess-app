import { LookupRoleMenuListType } from '../lookup/types/LookupRoleMenuListType';
import { SnackbarType } from '../../constants/snackbarType';

// Example for using discriminated union types.
export type Anchor = 'left' | 'right';

export interface Active { 
  menuUid: string;
  title: string;
  subTitle: string;
}

export interface UserPosition {
  uid: string;
  name: string;
  description: string;
}

export interface UserCompany {
  uid: string;
  code: string;
  name: string;
}

export interface AppUser {
  uid: string;
  fullName: string;
  email: string;
  company: UserCompany;
  position: UserPosition;
}

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum LayoutActionTypes {
  SET_ANCHOR = '@@layout/SET_ANCHOR',
  SET_MENU_DRAWER = '@@layout/SET_MENU_DRAWER',
  SET_ADDITIONAL_DRAWER = '@@layout/SET_ADDITIONAL_DRAWER',
  SET_ACCOUNT_SHOW = '@@layout/SET_ACCOUNT_SHOW',
  SET_TOP_DRAWER = '@@layout/SET_TOP_DRAWER',
  SET_BOTTOM_DRAWER = '@@layout/SET_BOTTOM_DRAWER',
  SET_MENU_ITEMS = '@@layout/SET_MENU_ITEMS',
  SET_ACTIVE = '@@layout/SET_ACTIVE',
  SET_USER = '@@layout/SET_USER',
  SET_NOTIFICATION = '@@layout/SET_NOTIFICATION',
  SET_LOGOUT_DIALOG = '@@layout/SET_LOGOUT_DIALOG',
  SET_ALERT_SNACKBAR = '@@layout/SET_ALERT_SNACKBAR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface LayoutState {
  readonly anchor: Anchor;
  readonly menuDrawer: boolean;
  readonly additionalDrawer: boolean;
  readonly accountShow: boolean;
  readonly topDrawer: boolean;
  readonly bottomDrawer: boolean;
  readonly menuItems: LookupRoleMenuListType[];
  readonly active: Active;
  readonly user: AppUser | null;
  readonly notification: number;
  readonly logoutDialog: boolean;
  readonly alertSnackbar: SnackbarType;
}