import { ICompanyAccess } from '@generic/interfaces';

export interface IExpenseRequestGetByIdRequest extends ICompanyAccess {
    expenseUid?: string;
}