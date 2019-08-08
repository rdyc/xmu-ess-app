import { defineMessages } from 'react-intl';

const prefix = 'hr.competency';

// field
export const hrCompetencyField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  uidRequired: { id: `${prefix}.field.uid.required`},
  
  type: { id: `${prefix}.field.type`},
  // clusterUid: { id: `${prefix}.field.clusterUid`},
  // clusterUidPlaceholder: { id: `${prefix}.field.clusterUid.placeholder`},
  // clusterUidRequired: { id: `${prefix}.field.clusterUid.required`},

  // categoryUid: { id: `${prefix}.field.categoryUid`},
  // categoryUidPlaceholder: { id: `${prefix}.field.categoryUid.placeholder`},
  // categoryUidRequired: { id: `${prefix}.field.categoryUid.required`},

  // levelUid: { id: `${prefix}.field.levelUid`},
  // levelUidPlaceholder: { id: `${prefix}.field.levelUid.placeholder`},
  // levelUidRequired: { id: `${prefix}.field.levelUid.required`},

  // indicatorUid: { id: `${prefix}.field.indicatorUid`},
  // indicatorUidPlaceholder: { id: `${prefix}.field.indicatorUid.placeholder`},
  // indicatorUidRequired: { id: `${prefix}.field.indicatorUid.required`},

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

  company: { id: `${prefix}.field.company`},
  position: { id: `${prefix}.field.position`},
  minCategories: { id: `${prefix}.field.minCategories`},
  minLevels: { id: `${prefix}.field.minLevels`},
  minIndicators: { id: `${prefix}.field.minIndicators`},
  totalCategories: { id: `${prefix}.field.totalCategories`},
  oneCategories: { id: `${prefix}.field.oneCategories`},
  manyCategories: { id: `${prefix}.field.manyCategories`},
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