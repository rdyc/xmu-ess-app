import { defineMessages } from 'react-intl';

const prefix = 'summary.filter.field';

export const summaryFilterField = defineMessages({
  customerUid: {id: `${prefix}.customerUid`},
  customerUidPlaceholder: {id: `${prefix}.customerUid.placeholder`},
  
  projectUid: {id: `${prefix}.projectUid`},
  projectUidPlaceholder: {id: `${prefix}.projectUid.placeholder`},
  
  employeeUid: {id: `${prefix}.employeeUid`},
  employeeUidPlaceholder: {id: `${prefix}.employeeUid.placeholder`},
  
  start: {id: `${prefix}.start`},
  
  end: {id: `${prefix}.end`},
});