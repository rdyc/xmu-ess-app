export interface IWebJobMonitoringJobEnqueued {
  id: string;
  job: string;
  state: string;
  enqueueAt: string;
  inEnqueuedState: boolean;
}