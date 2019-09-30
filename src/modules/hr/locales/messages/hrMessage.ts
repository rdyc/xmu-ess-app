import { hrCompetencyField, hrCompetencyFieldHelperFor } from './hrCompetency';
import { hrCornerField, hrCornerFieldHelperFor } from './hrCorner';
import {
  hrSharedConfirm,
  hrSharedMessage,
  hrSharedOption,
  hrSharedPage,
  hrSharedSection
} from './hrShared';

export const hrMessage = {
  shared: {
    message: hrSharedMessage,
    option: hrSharedOption,
    page: hrSharedPage,
    section: hrSharedSection,
    confirm: hrSharedConfirm
  },
  competency: {
    field: hrCompetencyField,
    fieldFor: hrCompetencyFieldHelperFor
  },
  corner: {
    field: hrCornerField,
    fieldFor: hrCornerFieldHelperFor
  }
};
