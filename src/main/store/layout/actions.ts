import { action } from 'typesafe-actions';
import { LayoutActionTypes, ThemeAnchors } from './types';

export const setTheme = (anchor: ThemeAnchors) => action(LayoutActionTypes.SET_ANCHOR, anchor);