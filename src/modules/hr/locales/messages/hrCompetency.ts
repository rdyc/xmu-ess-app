import { defineMessages } from 'react-intl';

const prefix = 'hr.competency';

// field
export const hrCompetencyField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  uidRequired: { id: `${prefix}.field.uid.required`},
  
  type: { id: `${prefix}.field.type`},

  name: { id: `${prefix}.field.name`},
  namePlaceholder: { id: `${prefix}.field.name.placeholder`},
  nameRequired: { id: `${prefix}.field.name.required`},

  description: { id: `${prefix}.field.description`},
  descriptionPlaceholder: { id: `${prefix}.field.description.placeholder`},
  descriptionRequired: { id: `${prefix}.field.description.required`},

  level: { id: `${prefix}.field.level`},
  levelPlaceholder: { id: `${prefix}.field.level.placeholder`},
  levelRequired: { id: `${prefix}.field.level.required`},

  indicator: { id: `${prefix}.field.indicator`},
  indicatorNum: { id: `${prefix}.field.indicatorNum`},
  indicatorPlaceholder: { id: `${prefix}.field.indicator.placeholder`},
  indicatorRequired: { id: `${prefix}.field.indicator.required`},

  note: { id: `${prefix}.field.note`},
  noteRequired: { id: `${prefix}.field.note.required`},
  notePlaceholder: { id: `${prefix}.field.note.placeholder`},

  year: { id: `${prefix}.field.year`},
  company: { id: `${prefix}.field.company`},
  position: { id: `${prefix}.field.position`},

  minNote: { id: `${prefix}.field.minNote`},
  minCategories: { id: `${prefix}.field.minCategories`},
  minLevels: { id: `${prefix}.field.minLevels`},
  minIndicators: { id: `${prefix}.field.minIndicators`},
  totalItem: { id: `${prefix}.field.totalItem`},
  zeroItem: { id: `${prefix}.field.zeroItem`},
  oneItem: { id: `${prefix}.field.oneItem`},
  manyItem: { id: `${prefix}.field.manyItem`},
  notFound: { id: `${prefix}.field.notFound`},
  
  assessment: { id: `${prefix}.field.assessment`},
  competency: { id: `${prefix}.field.competency`},

  employee: { id: `${prefix}.field.employee`},
  responden: { id: `${prefix}.field.responden`},

  status: { id: `${prefix}.field.status`},
  cluster: { id: `${prefix}.field.cluster`},
  category: { id: `${prefix}.field.category`},
  clusterRequired: { id: `${prefix}.field.cluster.required`},

  // status
  assigned: { id: `${prefix}.field.assigned`},
  respond: { id: `${prefix}.field.respond`},
  expired: { id: `${prefix}.field.expired`},

  completion: { id: `${prefix}.field.completion`},
});

// helper
export const hrCompetencyFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return hrCompetencyField.uid;
      // case 'clusterUid': return hrCompetencyField.clusterUid;
      // case 'categoryUid': return hrCompetencyField.categoryUid;
      // case 'levelUid': return hrCompetencyField.levelUid;
      // case 'indicatorUid': return hrCompetencyField.indicatorUid;
      case 'name': return hrCompetencyField.name;
      case 'description': return hrCompetencyField.description;
      case 'level': return hrCompetencyField.level;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      // case 'clusterUid': return hrCompetencyField.clusterUidRequired;
      // case 'categoryUid': return hrCompetencyField.categoryUidRequired;
      // case 'levelUid': return hrCompetencyField.levelUidRequired;
      // case 'indicatorUid': return hrCompetencyField.indicatorUidRequired;
      case 'name': return hrCompetencyField.nameRequired;
      case 'description': return hrCompetencyField.descriptionRequired;
      case 'level': return hrCompetencyField.levelRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return hrCompetencyField.uidPlaceholder;
      // case 'clusterUid': return hrCompetencyField.clusterUidPlaceholder;
      // case 'categoryUid': return hrCompetencyField.categoryUidPlaceholder;
      // case 'levelUid': return hrCompetencyField.levelUidPlaceholder;
      // case 'indicatorUid': return hrCompetencyField.indicatorUidPlaceholder;
      case 'name': return hrCompetencyField.namePlaceholder;
      case 'description': return hrCompetencyField.descriptionPlaceholder;
      case 'level': return hrCompetencyField.levelPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};