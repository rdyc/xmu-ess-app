import { action } from 'typesafe-actions';
import { LayoutActionTypes, ThemeAnchors } from './types';
import { LookupRoleMenuListType } from '../lookup/types/LookupRoleMenuListType';

export const setTheme = (anchor: ThemeAnchors) => action(LayoutActionTypes.SET_ANCHOR, anchor);
export const setMenuDrawer = (open: boolean) => action(LayoutActionTypes.SET_MENU_DRAWER, open);
export const setMenuItems = (items: LookupRoleMenuListType[]) => action(LayoutActionTypes.SET_MENU_ITEMS, items);
export const setTitle = (title: string) => action(LayoutActionTypes.SET_TITLE, title);