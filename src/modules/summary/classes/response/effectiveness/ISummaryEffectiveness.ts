import { IAccountEmployee } from '@account/classes';
import { ISummaryEffectivenessAssignment } from '@summary/classes/response/effectiveness';

export interface ISummaryEffectiveness {
  employee: IAccountEmployee;
  assignments?: ISummaryEffectivenessAssignment[] | null;
}