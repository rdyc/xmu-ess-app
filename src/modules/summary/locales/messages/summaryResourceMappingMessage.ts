import { defineMessages } from 'react-intl';

const prefix = 'summary.resourceMapping';

export const summaryResourceMappingPage = defineMessages({
  title: { id: `${prefix}.page.title`},
  subHeader: { id: `${prefix}.page.subHeader`},
  detail: { id: `${prefix}.page.detail.title`}
});

export const summaryResourceMappingField = defineMessages({
  company: { id: `${prefix}.field.company`},
  companyRequired: { id: `${prefix}.field.company.required`},
  year: { id: `${prefix}.field.year`},
  yearRequired: { id: `${prefix}.field.year.required`},
  null: { id: `${prefix}.field.null`}
});
