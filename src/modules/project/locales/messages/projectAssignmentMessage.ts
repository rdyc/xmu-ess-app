import { defineMessages } from 'react-intl';

const prefix = 'project.assignment';

// fields
export const projectAssignmentFieldMessage = defineMessages({
  uid: { id: `${prefix}.field.information.uid` },
  
  projectUid: { id: `${prefix}.field.information.projectUid` },
  projectUidRequired: { id: `${prefix}.field.information.projectUid.required` },
  projectUidPlaceholer: { id: `${prefix}.field.information.projectUid.placeholder` },
  
  assignedHours: { id: `${prefix}.field.information.projectUid.assignedHours` },
  unassignedHours: { id: `${prefix}.field.information.projectUid.unassignedHours` },

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
});