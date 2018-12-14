export interface IOrganizationHierarchyPutItem {
  itemUid?: string | null;
  sequence: number;
  positionUid: string;
  relationType: string;
}