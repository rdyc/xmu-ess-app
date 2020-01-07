export interface IWebJobMonitoringJobProcessing {
  id: string;
  job: string;
  serverId: string;
  startedAt: string;
  inProcessingState: boolean;
}