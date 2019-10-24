export interface IWebJobMonitoringJobFailed {
  id: string;
  job: string;
  reason: string;
  failedAt: string;
  exceptionType: string;
  exceptionMessage: string;
  exceptionDetails: string;
  inFailedState: boolean;
}