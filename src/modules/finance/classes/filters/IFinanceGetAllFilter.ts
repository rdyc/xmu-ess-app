export interface IFinanceGetAllFilter {
  moduleType: string | undefined;
  employeeName: string | undefined;
  financeStatusTypes: string[] | undefined;
  settlementStatusTypes: string[] | undefined;
}