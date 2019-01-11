import { ICompanyAccess } from '@generic/interfaces';

export interface IExpenseApprovalGetByIdRequest extends ICompanyAccess {
    expenseUid?: string;
}