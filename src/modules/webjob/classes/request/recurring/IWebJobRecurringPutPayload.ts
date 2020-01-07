export interface IWebJobRecurringPutPayload {
  jobUid: string;
  name: string;
  description: string;
  cronExpression: string;
  isAutoStart: boolean;
}