import { ICompanyAccess } from '@generic/interfaces';

export interface IExpenseApprovalGetByIdRequest extends ICompanyAccess {
    readonly expenseUid: string | undefined;
}