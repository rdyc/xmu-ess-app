import { defineMessages } from 'react-intl';

const prefix = 'account.competency';

// field
export const accountCompetencyField = defineMessages({
  colorCodeInfo: { id: `${prefix}.field.color.code.info`},
  colorCodeRed: { id: `${prefix}.field.color.code.red`},
  colorCodeBlue: { id: `${prefix}.field.color.code.blue`},

  category: { id: `${prefix}.field.category`},
  current: { id: `${prefix}.field.current`},
  result: { id: `${prefix}.field.result`},
  next: { id: `${prefix}.field.next`}
});
