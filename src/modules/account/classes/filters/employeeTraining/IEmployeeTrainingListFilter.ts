export interface IEmployeeTrainingListFilter {
  employeeUid: string;
  readonly orderBy?: string | undefined;
  readonly direction?: 'ascending' | 'descending' | string | undefined;
}