export interface IKPIAssignItemPostPayload {
  uid?: string;
  categoryUid: string;
  categoryName: string;
  measurementUid: string;
  measurementDescription: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  sequence: number;
}