import { defineMessages } from 'react-intl';

const prefix = 'summary.resourceMapping';

export const summaryResourceMappingPage = defineMessages({
  title: { id: `${prefix}.page.title`},
  subHeader: { id: `${prefix}.page.subHeader`},
  detail: { id: `${prefix}.page.detail.title`},
  employee: { id: `${prefix}.page.employee.detail`},
});

export const summaryResourceMappingField = defineMessages({
  infoTitle: { id: `${prefix}.field.info.title`},
  employeeName: { id: `${prefix}.field.employee.name`},
  company: { id: `${prefix}.field.company`},
  companyRequired: { id: `${prefix}.field.company.required`},
  year: { id: `${prefix}.field.year`},
  profession: { id: `${prefix}.field.profession`},
  competency: { id: `${prefix}.field.competency`},
  employee: { id: `${prefix}.field.employee`},
  yearRequired: { id: `${prefix}.field.year.required`},
  projectId: { id: `${prefix}.field.project.id`},
  projectOwner: { id: `${prefix}.field.project.owner`},
  projectCustomer: { id: `${prefix}.field.project.customer`},
  projectType: { id: `${prefix}.field.project.type`},
  projectName: { id: `${prefix}.field.project.name`},
  projectDescription: { id: `${prefix}.field.project.description`},
  projectStart: { id: `${prefix}.field.project.start`},
  projectEnd: { id: `${prefix}.field.project.end`},
  allocatedHours: { id: `${prefix}.field.allocated.hours`},
  actualHours: { id: `${prefix}.field.actual.hours`},
  allocatedMandays: { id: `${prefix}.field.allocated.mandays`},
  actualMandays: { id: `${prefix}.field.actual.mandays`},  
  summary: { id: `${prefix}.field.summary`},  
  null: { id: `${prefix}.field.null`},
});
