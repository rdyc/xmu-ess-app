import { defineMessages } from 'react-intl';

const prefix = 'account.access';
const fieldPrefix = `${prefix}.field`;

export const accountAccessMessage = defineMessages({
  greeting: { id: `${prefix}.message.greeting` },
  selection: { id: `${prefix}.message.selection` },
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});

export const accountAccessDialog = defineMessages({
  createTitle: { id: `${prefix}.dialog.create.title` },
  createDescription: { id: `${prefix}.dialog.create.subHeader` },
  modifyTitle: { id: `${prefix}.dialog.modify.title` },
  modifyDescription: { id: `${prefix}.dialog.modify.subHeader` },
  deleteTitle: { id: `${prefix}.dialog.delete.title` },
  deleteDescription: { id: `${prefix}.dialog.delete.subHeader` },
});

export const accountAccessField = defineMessages({
  uid: {id: `${fieldPrefix}.uid`},

  companyUid: {id: `${fieldPrefix}.companyUid`},
  companyUidRequired: {id: `${fieldPrefix}.companyUid.required`},
  companyUidPlaceholder: {id: `${fieldPrefix}.companyUid.placeholder`},

  positionUid: {id: `${fieldPrefix}.positionUid`},
  positionUidRequired: {id: `${fieldPrefix}.positionUid.required`},
  positionUidPlaceholder: {id: `${fieldPrefix}.positionUid.placeholder`},

  departmentType: {id: `${fieldPrefix}.departmentType`},
  departmentTypeRequired: {id: `${fieldPrefix}.departmentType.required`},
  departmentTypePlaceholder: {id: `${fieldPrefix}.departmentType.placeholder`},

  unitType: {id: `${fieldPrefix}.unitType`},
  unitTypeRequired: {id: `${fieldPrefix}.unitType.required`},
  unitTypePlaceholder: {id: `${fieldPrefix}.unitType.placeholder`},

  levelType: {id: `${fieldPrefix}.levelType`},
  levelTypeRequired: {id: `${fieldPrefix}.levelType.required`},
  levelTypePlaceholder: {id: `${fieldPrefix}.levelType.placeholder`},

  roleUid: {id: `${fieldPrefix}.roleUid`},
  roleUidRequired: {id: `${fieldPrefix}.roleUid.required`},
  roleUidPlaceholder: {id: `${fieldPrefix}.roleUid.placeholder`},

  start: {id: `${fieldPrefix}.start`},
  startRequired: {id: `${fieldPrefix}.start.required`},
  startPlaceholder: {id: `${fieldPrefix}.start.placeholder`},

  end: {id: `${fieldPrefix}.end`},
  endPlaceholder: {id: `${fieldPrefix}.end.placeholder`},
});

export const accountAccessFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return accountAccessField.uid;
      case 'companyUid': return accountAccessField.companyUid;
      case 'positionUid': return accountAccessField.positionUid;
      case 'departmentType': return accountAccessField.departmentType;
      case 'unitType': return accountAccessField.unitType;
      case 'levelType': return accountAccessField.levelType;
      case 'roleUid': return accountAccessField.roleUid;
      case 'start': return accountAccessField.start;
      case 'end': return accountAccessField.end;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'companyUid': return accountAccessField.companyUidRequired;
      case 'positionUid': return accountAccessField.positionUidRequired;
      case 'departmentType': return accountAccessField.departmentTypeRequired;
      case 'unitType': return accountAccessField.unitTypeRequired;
      case 'levelType': return accountAccessField.levelTypeRequired;
      case 'roleUid': return accountAccessField.roleUidRequired;
      case 'start': return accountAccessField.startRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'companyUid': return accountAccessField.companyUidPlaceholder;
      case 'positionUid': return accountAccessField.positionUidPlaceholder;
      case 'departmentType': return accountAccessField.departmentTypePlaceholder;
      case 'unitType': return accountAccessField.unitTypePlaceholder;
      case 'levelType': return accountAccessField.levelTypePlaceholder;
      case 'roleUid': return accountAccessField.roleUidPlaceholder;
      case 'start': return accountAccessField.startPlaceholder;
      case 'end': return accountAccessField.endPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};