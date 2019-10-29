import { defineMessages } from 'react-intl';

const prefix = 'web.job.recurring';

// field
export const webJobRecurringField = defineMessages({
  uid: {id: `${prefix}.field.uid`},
  name: {id: `${prefix}.field.name`},
  description: {id: `${prefix}.field.description`},
  cron: {id: `${prefix}.field.cron`},
  cronDesc: {id: `${prefix}.field.cronDesc`},
  expression: {id: `${prefix}.field.expression`},
  job: {id: `${prefix}.field.job`},
  namespace: {id: `${prefix}.field.namespace`},
  class: {id: `${prefix}.field.class`},
  method: {id: `${prefix}.field.method`},
  startType: {id: `${prefix}.field.start.type`},
  isAutoStart: {id: `${prefix}.field.start.auto`},
  isManualStart: {id: `${prefix}.field.start.manual`},
  definition: {id: `${prefix}.field.definition`},

  // FREE TYPE
  type: {id: `${prefix}.field.type`},
});