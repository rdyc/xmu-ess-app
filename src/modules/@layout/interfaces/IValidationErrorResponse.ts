import { IValidationError } from './IValidationError';

export type IValidationErrorResponse = {
  id: string;
  date: string;
  message: string;
  errors?: IValidationError[];
};