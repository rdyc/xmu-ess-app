import { defineMessages } from 'react-intl';

const prefix = 'account.employee.training';

// field
export const accountEmployeeTrainingField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},

  employeeUid: { id: `${prefix}.field.employeeUid`},
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder`},

  name: { id: `${prefix}.field.name`},
  namePlaceholder: { id: `${prefix}.field.name.placeholder`},
  nameRequired: { id: `${prefix}.field.name.required`},
  
  start: { id: `${prefix}.field.start`},
  startPlaceholder: { id: `${prefix}.field.start.placeholder`},
  startRequired: { id: `${prefix}.field.start.required`},

  end: { id: `${prefix}.field.end`},
  endPlaceholder: { id: `${prefix}.field.end.placeholder`},
  endRequired: { id: `${prefix}.field.end.required`},
  
  organizer: { id: `${prefix}.field.organizer`},
  organizerPlaceholder: { id: `${prefix}.field.organizer.placeholder`},
  organizerRequired: { id: `${prefix}.field.organizer.required`},
  
  trainingType: { id: `${prefix}.field.trainingType`},
  trainingTypePlaceholder: { id: `${prefix}.field.trainingType.placeholder`},
  trainingTypeRequired: { id: `${prefix}.field.trainingType.required`},
  
  certificationType: { id: `${prefix}.field.certificationType`},
  certificationTypePlaceholder: { id: `${prefix}.field.certificationType.placeholder`},
  certificationTypeRequired: { id: `${prefix}.field.certificationType.required`},
});

// confirmation
export const accountEmployeeTrainingConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.subHeader` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.subHeader` },
});

// page
export const accountEmployeeTrainingPage = defineMessages({
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
  modifyTitle: { id: `${prefix}.page.modify.title`},
  modifySubHeader: { id: `${prefix}.page.modify.subHeader`},
  deleteTitle: { id: `${prefix}.page.delete.title`},
  deleteSubHeader: { id: `${prefix}.page.delete.subHeader`},
});

// option
export const accountEmployeeTrainingOption = defineMessages({
  new: { id: `${prefix}.option.new` },
  modify: { id: `${prefix}.option.modify` },
  remove: { id: `${prefix}.option.remove` }
});

// messages
export const accountEmployeeTrainingMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success`},
  deleteFailure: { id: `${prefix}.message.delete.failure`},
});

// helper
export const accountEmployeeTrainingFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return accountEmployeeTrainingField.uid;
      case 'employeeUid': return accountEmployeeTrainingField.uid;
      case 'name': return accountEmployeeTrainingField.name;
      case 'start': return accountEmployeeTrainingField.start;
      case 'end': return accountEmployeeTrainingField.end;
      case 'organizer': return accountEmployeeTrainingField.organizer;
      case 'trainingType': return accountEmployeeTrainingField.trainingType;
      case 'certificationType': return accountEmployeeTrainingField.certificationType;
            
      default: return {id: field};
    }
  }
  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return accountEmployeeTrainingField.nameRequired;
      case 'start': return accountEmployeeTrainingField.startRequired;
      case 'end': return accountEmployeeTrainingField.endRequired;
      case 'organizer': return accountEmployeeTrainingField.organizerRequired;
      case 'trainingType': return accountEmployeeTrainingField.trainingTypeRequired;
      case 'certificationType': return accountEmployeeTrainingField.certificationTypeRequired;
         
      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return accountEmployeeTrainingField.uidPlaceholder;
      case 'name': return accountEmployeeTrainingField.namePlaceholder;
      case 'start': return accountEmployeeTrainingField.startPlaceholder;
      case 'end': return accountEmployeeTrainingField.endPlaceholder;
      case 'organizer': return accountEmployeeTrainingField.organizerPlaceholder;
      case 'trainingType': return accountEmployeeTrainingField.trainingTypePlaceholder;
      case 'certificationType': return accountEmployeeTrainingField.certificationTypePlaceholder;
         
      default: return {id: field};
    }
  }

  return {id: field};
};

// section
export const accountEmployeeTrainingSection = defineMessages({
  title: { id: `${prefix}.section.basic.title`},
  subHeader: { id: `${prefix}.section.basic.subHeader`},
});