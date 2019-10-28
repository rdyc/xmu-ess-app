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
  isAutoStart: {id: `${prefix}.field.isAutoStart`},
  definition: {id: `${prefix}.field.definition`},

  // FREE TYPE
  type: {id: `${prefix}.field.type`},
});