export interface IWebJobMonitoringJobSucceeded {
  id: string;
  job: string;
  result: string;
  totalDuration: number;
  succeededAt: string;
  inSucceededState: boolean;
}