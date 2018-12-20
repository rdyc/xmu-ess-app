import { defineMessages } from 'react-intl';

const prefix = 'project.assignment';

// page
export const projectAssignmentPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
});

// section
export const projectAssignmentSection = defineMessages({
  projectTitle: { id: `${prefix}.section.project.title` },
  projectSubHeader: { id: `${prefix}.section.project.subHeader` },
  memberAddTitle: { id: `${prefix}.section.member.add.title` },
  memberAddSubHeader: { id: `${prefix}.section.member.add.subHeader` },
  itemTitle: { id: `${prefix}.section.item.title` },
  itemSubHeader: { id: `${prefix}.section.item.subHeader` },
});

// action
export const projectAssignmentOption = defineMessages({
  addMember: { id: `${prefix}.option.addMember` },
  acceptance: { id: `${prefix}.option.acceptance` },
});

// fields
export const projectAssignmentField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  
  projectUid: { id: `${prefix}.field.projectUid` },
  projectUidRequired: { id: `${prefix}.field.projectUid.required` },
  projectUidPlaceholder: { id: `${prefix}.field.projectUid.placeholder` },
  
  assignedHours: { id: `${prefix}.field.assignedHours` },
  unassignedHours: { id: `${prefix}.field.unassignedHours` },
  
  itemUid: { id: `${prefix}.field.item.uid` },
  
  employeeUid: { id: `${prefix}.field.item.employeeUid` },
  employeeUidRequired: { id: `${prefix}.field.item.employeeUid.required` },
  employeeUidPlaceholder: { id: `${prefix}.field.item.employeeUid.placeholder` },
  
  role: { id: `${prefix}.field.item.role` },
  roleRequired: { id: `${prefix}.field.item.role.required` },
  rolePlaceholder: { id: `${prefix}.field.item.role.placeholder` },

  jobDesc: { id: `${prefix}.field.item.jobDesc` },
  jobDescRequired: { id: `${prefix}.field.item.jobDesc.required` },
  jobDescPlaceholder: { id: `${prefix}.field.item.jobDesc.placeholder` },

  mandays: { id: `${prefix}.field.item.mandays` },
  mandaysRequired: { id: `${prefix}.field.item.mandays.required` },
  mandaysPlaceholder: { id: `${prefix}.field.item.mandays.placeholder` },

  hours: { id: `${prefix}.field.item.hours` },
  newMandays: { id: `${prefix}.field.item.newMandays` },
  newHours: { id: `${prefix}.field.item.newHours` },
  statusType: { id: `${prefix}.field.item.statusType` },
  reason: { id: `${prefix}.field.item.rejectedReason` },
  activeOnly: { id: `${prefix}.field.item.activeOnly` },
});

export const projectAssignmentFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'projectUid': return projectAssignmentField.projectUid;
      case 'employeeUid': return projectAssignmentField.employeeUid;
      case 'role': return projectAssignmentField.role;
      case 'mandays': return projectAssignmentField.mandays;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'projectUid': return projectAssignmentField.projectUidRequired;
      case 'employeeUid': return projectAssignmentField.employeeUidRequired;
      case 'role': return projectAssignmentField.roleRequired;
      case 'mandays': return projectAssignmentField.mandaysRequired;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'projectUid': return projectAssignmentField.projectUidPlaceholder;
      case 'employeeUid': return projectAssignmentField.employeeUidPlaceholder;
      case 'role': return projectAssignmentField.rolePlaceholder;
      case 'mandays': return projectAssignmentField.mandaysPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// confirm
export const projectAssignmentConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyContent: { id: `${prefix}.confirm.modify.content` },
});

// messages
export const projectAssignmentMessage = defineMessages({
  invalidProps: { id: `${prefix}.message.invalidProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});