export interface IMarkdownCategoryPutPayload {
  name: string;
  description?: string;
  isActive: boolean | false;
}