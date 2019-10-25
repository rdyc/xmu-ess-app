export interface IWebJobMonitoringJobScheduled {
  id: string;
  job: string;
  enqueueAt: string;
  scheduledAt: string;
  inScheduledState: boolean;
}