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
  jobs: {id: `${prefix}.tab.jobs`},
  retries: {id: `${prefix}.tab.retries`},
  recurring: {id: `${prefix}.tab.recurring`},
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

// helper
export const webJobSharedHelperFor = (field: string, type: 'fieldTab') => {
  if (type === 'fieldTab') {
    switch (field) {
      case 'jobs': return webJobTabs.jobs;
      case 'retries': return webJobTabs.retries;
      case 'recurring': return webJobTabs.recurring;
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