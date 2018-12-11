export interface IOrganizationStructurePutItem {
  structureItemUid?: string | null;
  positionUid: string;
  start: string;
  end?: string | null; 
}