import { action } from 'typesafe-actions';
import { LayoutActionTypes, Anchor, Active, AppUser } from './types';
import { LookupRoleMenuListType } from '../lookup/types/LookupRoleMenuListType';

export const setAnchor = (anchor: Anchor) => action(LayoutActionTypes.SET_ANCHOR, anchor);
export const setMenuDrawer = (open: boolean) => action(LayoutActionTypes.SET_MENU_DRAWER, open);
export const setAdditionalDrawer = (open: boolean) => action(LayoutActionTypes.SET_ADDITIONAL_DRAWER, open);
export const setAccountShow = (open: boolean) => action(LayoutActionTypes.SET_ACCOUNT_SHOW, open);
export const setTopDrawer = (open: boolean) => action(LayoutActionTypes.SET_TOP_DRAWER, open);
export const setBottomDrawer = (open: boolean) => action(LayoutActionTypes.SET_ANCHOR, open);
export const setMenuItems = (items: LookupRoleMenuListType[]) => action(LayoutActionTypes.SET_MENU_ITEMS, items);
export const setActive = (active: Active) => action(LayoutActionTypes.SET_ACTIVE, active);
export const setUser = (user: AppUser) => action(LayoutActionTypes.SET_USER, user);
export const setNotification = (count: number) => action(LayoutActionTypes.SET_NOTIFICATION, count);