import { defineMessages } from 'react-intl';

const prefix = 'web.job.shared';

// page
export const webJobPage = defineMessages({
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
});

// confirmation
export const webJobConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.subHeader` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.subHeader` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.subHeader` },
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