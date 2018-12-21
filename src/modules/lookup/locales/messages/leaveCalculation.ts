import { defineMessages } from 'react-intl';

const prefix = 'leave.calculation';

export const leaveCalculationPage = defineMessages({
  title: { id: `${prefix}.page.title`},
  subHeader: { id: `${prefix}.page.subHeader`}
});

export const leaveCalculationField = defineMessages({
  company: { id: `${prefix}.field.company`},
  year: { id: `${prefix}.field.year`},
});

export const leaveCalculationFilter = defineMessages({
  company: { id: `${prefix}.filter.company`},
  companyPlaceHolder: { id: `${prefix}.filter.companyPlaceHolder`},
  year: { id: `${prefix}.filter.year`},
  yearPlaceHolder: { id: `${prefix}.filter.yearPlaceHolder`},
});
