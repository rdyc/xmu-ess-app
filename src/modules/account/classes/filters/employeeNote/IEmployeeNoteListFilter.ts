export interface IEmployeeNoteListFilter {
  readonly orderBy?: string;
  readonly direction?: 'ascending' | 'descending' | string;
}