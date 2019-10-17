import { CronModel } from './CronModel';

export interface IWebJobRecurring {
  uid: string;
  name: string;
  description: string;
  cron: CronModel;
  isAutoStart: boolean;
}