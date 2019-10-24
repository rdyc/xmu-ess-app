export interface IWebJobMonitoringRecurring {
  id: string;
  cron: string;
  queue: string;
  job: string;
  nextExecution: string;
  lastJobId: string;
  lastJobState: string;
  lastExecution: string;
  createdAt: string;
  removed: boolean;
  timeZoneId: string;
}