export interface IEmployeeNoteListFilter {
  readonly orderBy?: string | undefined;
  readonly direction?: 'ascending' | 'descending' | string | undefined;
}