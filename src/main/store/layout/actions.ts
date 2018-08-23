import { action } from 'typesafe-actions';
import { LayoutActionTypes, ThemeAnchors, MenuDrawerOpen } from './types';

export const setTheme = (anchor: ThemeAnchors) => action(LayoutActionTypes.SET_ANCHOR, anchor);
export const setMenuDrawer = (open: MenuDrawerOpen) => action(LayoutActionTypes.SET_MENU_DRAWER, open);