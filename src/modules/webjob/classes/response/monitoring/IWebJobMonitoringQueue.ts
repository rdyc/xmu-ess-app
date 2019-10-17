import { IWebJobMonitoringJobEnqueued } from './IWebJobMonitoringJobEnqueued';

export interface IWebJobMonitoringQueue {
  name: string;
  length: number;
  fetched: number;
  firstJobs: IWebJobMonitoringJobEnqueued;
}