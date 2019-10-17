import { IWebJobMonitoringJobHistory } from './IWebJobMonitoringJobHistory';

export interface IWebJobMonitoringJobDetail {
  job: string;
  createdAt: string;
  properties: any;
  history: IWebJobMonitoringJobHistory;
  expireAt: string;
}