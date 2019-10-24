export interface IWebJobMonitoringServer {
  name: string;
  workersCount: number;
  startedAt: string;
  queues: string[];
  heartbeat: string;
}