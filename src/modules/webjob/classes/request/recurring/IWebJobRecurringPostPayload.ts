export interface IWebJobRecurringPostPayload {
  jobUid: string;
  name: string;
  description: string;
  cronExpression: string;
  isAutoStart: boolean;
}