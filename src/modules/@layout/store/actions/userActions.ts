import { IAppUser } from '@layout/interfaces';
import { action } from 'typesafe-actions';

export const enum UserAction {
  ASSIGN_USER = '@@user/ASSIGN_USER'
}

export const userAssign = (user: IAppUser) => action(UserAction.ASSIGN_USER, user);