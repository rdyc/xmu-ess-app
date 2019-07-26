import { defineMessages } from 'react-intl';

const prefix = 'account.experience';

// field
export const accountExperienceField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},

  employeeUid: { id: `${prefix}.field.employeeUid`},
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder`},

  company: { id: `${prefix}.field.company`},
  companyPlaceholder: { id: `${prefix}.field.company.placeholder`},
  companyRequired: { id: `${prefix}.field.company.required`},

  position: { id: `${prefix}.field.position`},
  positionPlaceholder: { id: `${prefix}.field.position.placeholder`},
  positionRequired: { id: `${prefix}.field.position.required`},

  start: { id: `${prefix}.field.start`},
  startPlaceholder: { id: `${prefix}.field.start.placeholder`},
  startRequired: { id: `${prefix}.field.start.required`},

  end: { id: `${prefix}.field.end`},
  endPlaceholder: { id: `${prefix}.field.end.placeholder`},
  endRequired: { id: `${prefix}.field.end.required`},

  profession: { id: `${prefix}.field.profession`},
  professionPlaceholder: { id: `${prefix}.field.profession.placeholder`},
  professionRequired: { id: `${prefix}.field.profession.required`},
  
  date: { id: `${prefix}.field.date`},

  competencies: { id: `${prefix}.field.competencies`},
});

// helper
export const accountExperienceFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return accountExperienceField.uid;
      case 'employeeUid': return accountExperienceField.employeeUid;
      case 'company': return accountExperienceField.company;
      case 'position': return accountExperienceField.position;
      case 'start': return accountExperienceField.start;
      case 'end': return accountExperienceField.end;
      case 'professionType': return accountExperienceField.profession;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'company': return accountExperienceField.companyRequired;
      case 'position': return accountExperienceField.positionRequired;
      case 'start': return accountExperienceField.startRequired;
      case 'end': return accountExperienceField.endRequired;
      case 'professionType': return accountExperienceField.professionRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return accountExperienceField.uidPlaceholder;
      case 'employeeUid': return accountExperienceField.employeeUidPlaceholder;
      case 'company': return accountExperienceField.companyPlaceholder;
      case 'position': return accountExperienceField.positionPlaceholder;
      case 'start': return accountExperienceField.startPlaceholder;
      case 'end': return accountExperienceField.endPlaceholder;
      case 'professionType': return accountExperienceField.professionPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};