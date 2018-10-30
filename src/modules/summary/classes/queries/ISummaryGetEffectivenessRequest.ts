import { ISummaryEffectivenessFilter } from '@summary/classes/filters';

export interface ISummaryGetEffectivenessRequest {
  readonly filter: ISummaryEffectivenessFilter | undefined;
}