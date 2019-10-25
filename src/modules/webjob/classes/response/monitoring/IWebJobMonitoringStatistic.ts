export interface IWebJobMonitoringStatistic {
  servers: number;
  recurring: number;
  enqueued: number;
  queues: number;
  scheduled: number;
  processing: number;
  succeeded: number;
  failed: number;
  deleted: number;
}