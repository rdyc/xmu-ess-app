import { defineMessages } from 'react-intl';

const prefix = 'web.job.definition';

// field
export const webJobDefinitionField = defineMessages({
  // succeeded
  uid: {id: `${prefix}.field.uid`},
  assembly: {id: `${prefix}.field.assembly`},
  name: {id: `${prefix}.field.name`},
  description: {id: `${prefix}.field.description`},
  version: {id: `${prefix}.field.version`},
  jobsCount: {id: `${prefix}.field.jobsCount`},
  namespace: {id: `${prefix}.field.namespace`},
  class: {id: `${prefix}.field.class`},
  method: {id: `${prefix}.field.method`},

  package: {id: `${prefix}.field.package`},

  // FREE TYPE
  type: {id: `${prefix}.field.type`},

});