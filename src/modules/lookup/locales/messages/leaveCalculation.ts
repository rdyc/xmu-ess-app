import { defineMessages } from 'react-intl';

const prefix = 'leave.calculation';

export const leaveCalculationPage = defineMessages({
  title: { id: `${prefix}.page.title`},
  subHeader: { id: `${prefix}.page.subHeader`}
});

export const leaveCalculationField = defineMessages({
  company: { id: `${prefix}.field.company`},
  year: { id: `${prefix}.field.year`},
  calculate: { id: `${prefix}.field.calculate`},
});

export const leaveCalculationFilter = defineMessages({
  employee: { id: `${prefix}.filter.employee`},
  company: { id: `${prefix}.filter.company`},
  companyRequired: { id: `${prefix}.filter.company.required`},
  companyPlaceHolder: { id: `${prefix}.filter.companyPlaceHolder`},
  year: { id: `${prefix}.filter.year`},
  yearRequired: { id: `${prefix}.filter.year.required`},
  yearPlaceHolder: { id: `${prefix}.filter.yearPlaceHolder`},
});

export const leaveCalculationMessage = defineMessages({
  calculateSuccess: { id: `${prefix}.message.calculate.success` },
  calculateFailure: { id: `${prefix}.message.calculate.failure` },
});

export const leaveCalculationConfirm = defineMessages({
  calculateTitle: { id: `${prefix}.confirm.calculate.title` },
  calculateDescription: { id: `${prefix}.confirm.calculate.description` },
});
