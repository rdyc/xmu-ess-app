import { defineMessages } from 'react-intl';

const prefix = 'web.job.shared';

// page
export const webJobPage = defineMessages({
  createTitle: {id: `${prefix}.page.create.title`},
  createSubheader: {id: `${prefix}.page.create.subheader`},
  modifyTitle: {id: `${prefix}.page.modify.title`},
  modifySubheader: {id: `${prefix}.page.modify.subheader`},
  listTitle: {id: `${prefix}.page.list.title`},
  listSubheader: {id: `${prefix}.page.list.subheader`},
  detailTitle: {id: `${prefix}.page.detail.title`},
  detailSubheader: {id: `${prefix}.page.detail.subheader`},
});

// tabs
export const webJobTabs = defineMessages({
  monitoring: {id: `${prefix}.tab.monitoring`},
  definitions: {id: `${prefix}.tab.definitions`},
  retries: {id: `${prefix}.tab.retries`},
  recurrings: {id: `${prefix}.tab.recurrings`},
  servers: {id: `${prefix}.tab.servers`},  
  enqueued: {id: `${prefix}.tab.enqueued`},  
  scheduled: {id: `${prefix}.tab.scheduled`},  
  processing: {id: `${prefix}.tab.processing`},  
  succeeded: {id: `${prefix}.tab.succeeded`},  
  failed: {id: `${prefix}.tab.failed`},  
  deleted: {id: `${prefix}.tab.deleted`},  
  queues: {id: `${prefix}.tab.queues`},  
  fetched: {id: `${prefix}.tab.fetched`},  
});

// section
export const webJobSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  submissionTitle: { id: `${prefix}.section.submission.title`},
});

// confirmation
export const webJobConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.subHeader` },
  uploadTitle: { id: `${prefix}.confirm.upload.title` },
  uploadDescription: { id: `${prefix}.confirm.upload.subHeader` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.subHeader` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.subHeader` },
  triggerTitle: { id: `${prefix}.confirm.trigger.title` },
  triggerDescription: { id: `${prefix}.confirm.trigger.subHeader`}
});

// messages
export const webJobSharedMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  uploadSuccess: { id: `${prefix}.message.upload.success` },
  uploadFailure: { id: `${prefix}.message.upload.failure` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
  triggerSuccess: { id: `${prefix}.message.trigger.success` },
  triggerFailure: { id: `${prefix}.message.trigger.failure` },
});

// helper
export const webJobSharedHelperFor = (field: string, type: 'fieldTab') => {
  if (type === 'fieldTab') {
    switch (field) {
      case 'monitoring': return webJobTabs.monitoring;
      case 'definitions': return webJobTabs.definitions;
      case 'retries': return webJobTabs.retries;
      case 'recurrings': return webJobTabs.recurrings;
      case 'servers': return webJobTabs.servers;
      case 'enqueued': return webJobTabs.enqueued;
      case 'scheduled': return webJobTabs.scheduled;
      case 'processing': return webJobTabs.processing;
      case 'succeeded': return webJobTabs.succeeded;
      case 'failed': return webJobTabs.failed;
      case 'deleted': return webJobTabs.deleted;
      case 'queues': return webJobTabs.queues;
      case 'fetched': return webJobTabs.fetched;

      default: return {id: field};
    }
  }

  return {id: field};
};