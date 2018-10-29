import { ISummaryEffectivenessFilter } from '@summary/classes/filters';

export interface ISummaryEffectivenessRequest {
  readonly filter: ISummaryEffectivenessFilter | undefined;
}