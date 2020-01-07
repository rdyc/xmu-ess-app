export interface IKPITemplatePostItemPayload {
  uid?: string;
  categoryUid: string;
  categoryName: string;
  measurementUid: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  sequence: number;
}