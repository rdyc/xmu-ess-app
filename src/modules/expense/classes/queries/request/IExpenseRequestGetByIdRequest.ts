import { ICompanyAccess } from '@generic/interfaces';

export interface IExpenseRequestGetByIdRequest extends ICompanyAccess {
    readonly expenseUid: string | undefined;
}