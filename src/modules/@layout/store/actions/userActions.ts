import { IAppUser } from '@layout/interfaces';
import { action } from 'typesafe-actions';

export const enum UserAction {
  ASSIGN_USER = '@@user/ASSIGN_USER',
  SWITCH_ACCESS = '@@user/SWITCH_ACCESS'
}

export const userAssign = (user: IAppUser) => action(UserAction.ASSIGN_USER, user);
export const switchAccess = () => action(UserAction.SWITCH_ACCESS);