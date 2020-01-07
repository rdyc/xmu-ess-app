// import { IWebJobPage } from '@webjob/classes/types';
import { MonitoringTabs } from '@webjob/classes/types/monitoring/MonitoringTabs';
import { action } from 'typesafe-actions';

export const enum WebJobPageAction {
  CHANGE = '@@webjob/page/CHANGE'
}

export const webjobPageChange = (webJobPage: MonitoringTabs) => action(WebJobPageAction.CHANGE, webJobPage);