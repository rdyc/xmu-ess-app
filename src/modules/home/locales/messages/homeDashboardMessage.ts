import { defineMessages } from 'react-intl';

const prefix = 'home.dashboard';

// page
export const homeDashboardPage = defineMessages({
  title: { id: `${prefix}.page.title` },
  subHeader: { id: `${prefix}.page.subHeader` }
});

// section
export const homeDashboardSection = defineMessages({
  notificationTitle: { id: `${prefix}.section.notification.title` },
  notificationSubHeader: { id: `${prefix}.section.notification.subHeader` },
  billableTitle: { id: `${prefix}.section.billable.title` },
  billableSubHeader: { id: `${prefix}.section.billable.subHeader` }
});

// text
export const homeDashboardText = defineMessages({
  showAll: { id: `${prefix}.text.showAll` },
  showAllDesc: { id: `${prefix}.text.showAll.description` }
});