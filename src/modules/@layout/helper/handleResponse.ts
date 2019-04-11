import { IValidationErrorResponse } from '@layout/interfaces';
import { IApiResponse } from '@utils/index';

export const handleResponse = (response: IApiResponse): IValidationErrorResponse => {
  const dateHeader = response.headers.find(header => header.name === 'date');
  const logHeader = response.headers.find(header => header.name === 'x-correlation-id');

  return {
    ...response.body,
    id: logHeader && logHeader.value,
    date: dateHeader && dateHeader.value
  };
};