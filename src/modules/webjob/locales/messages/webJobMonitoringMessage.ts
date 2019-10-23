import { defineMessages } from 'react-intl';

const prefix = 'web.job.monitoring';

// field
export const webJobMonitoringField = defineMessages({
  // succeeded
  id: {id: `${prefix}.field.id`},
  job: {id: `${prefix}.field.job`},
  result: {id: `${prefix}.field.result`},
  totalDuration: {id: `${prefix}.field.totalDuration`},
  succeededAt: {id: `${prefix}.field.succeededAt`},
  inSucceededState: {id: `${prefix}.field.inSucceededState`},

  // deleted
  deletedAt: {id: `${prefix}.field.deletedAt`},
  inDeletedState: {id: `${prefix}.field.inDeletedState`},

  // enqueued
  state: {id: `${prefix}.field.state`},
  enqueuedAt: {id: `${prefix}.field.enqueuedAt`},
  inEnqueuedState: {id: `${prefix}.field.inEnqueuedState`},
  
  // failed
  reason: {id: `${prefix}.field.reason`},
  failedAt: {id: `${prefix}.field.failedAt`},
  exceptionType: {id: `${prefix}.field.exceptionType`},
  exceptionMessage: {id: `${prefix}.field.exceptionMessage`},
  exceptionDetails: {id: `${prefix}.field.exceptionDetails`},
  inFailedState: {id: `${prefix}.field.inFailedState`},

  // fetched
  fetchedAt: {id: `${prefix}.field.fetchedAt`},

  // processing
  serverId: {id: `${prefix}.field.serverId`},
  startedAt: {id: `${prefix}.field.startedAt`},
  inProcessingState: {id: `${prefix}.field.inProcessingState`},

  // scheduled
  scheduledAt: {id: `${prefix}.field.scheduledAt`},
  inScheduledState: {id: `${prefix}.field.inScheduledState`},
  
  // detail
  createdAt: {id: `${prefix}.field.createdAt`},
  properties: {id: `${prefix}.field.properties`},
  history: {id: `${prefix}.field.history`},
  stateName: {id: `${prefix}.field.stateName`},
  data: {id: `${prefix}.field.data`},
  expireAt: {id: `${prefix}.field.expireAt`},

  // queue
  name: {id: `${prefix}.field.name`},
  length: {id: `${prefix}.field.length`},
  fetched: {id: `${prefix}.field.fetched`},

  // server
  workersCount: {id: `${prefix}.field.workersCount`},
  queues: {id: `${prefix}.field.queues`},
  heartbeat: {id: `${prefix}.field.heartbeat`},
  
  // FREE TYPE
  type: {id: `${prefix}.field.type`},

});