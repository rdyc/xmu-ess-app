// Example for using discriminated union types.
export type ThemeAnchors = 'left' | 'right';
export type MenuDrawerOpen = true | false;

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum LayoutActionTypes {
  SET_ANCHOR = '@@layout/SET_ANCHOR',
  SET_MENU_DRAWER = '@@layout/SET_MENU_DRAWER'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface LayoutState {
  readonly anchor: ThemeAnchors;
  readonly menuDrawer: MenuDrawerOpen;
}