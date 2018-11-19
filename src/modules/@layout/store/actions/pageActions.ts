import { IPage } from '@layout/classes/states';
import { action } from 'typesafe-actions';

export const enum PageAction {
  CHANGE = '@@page/CHANGE'
}

export const pageChange = (page: IPage) => action(PageAction.CHANGE, page);