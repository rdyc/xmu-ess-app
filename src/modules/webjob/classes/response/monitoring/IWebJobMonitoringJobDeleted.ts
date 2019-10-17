export interface IWebJobMonitoringJobDeleted {
  id: string;
  job: string;
  deletedAt: string;
  inDeletedState: boolean;
}