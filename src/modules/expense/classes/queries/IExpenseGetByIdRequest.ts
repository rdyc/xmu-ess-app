import { ICompanyAccess } from '@generic/interfaces';

export interface IExpenseGetByIdRequest extends ICompanyAccess {
    readonly expenseUid: string | undefined;
}