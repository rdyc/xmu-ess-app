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
  imageSliderTitle: { id: `${prefix}.section.imageSlider.title` },
  imageSliderSubHeader: { id: `${prefix}.section.imageSlider.subHeader` },
  achievementChartTitle: { id: `${prefix}.section.achievementChart.title` },
  achievementChartSubHeader: { id: `${prefix}.section.achievementChart.subHeader` },
  newsFeedTitle: { id: `${prefix}.section.newsFeed.title` },
  newsFeedSubHeader: { id: `${prefix}.section.newsFeed.subHeader` }
});

// text
export const homeDashboardText = defineMessages({
  showAll: { id: `${prefix}.text.showAll` },
  showAllDesc: { id: `${prefix}.text.showAll.description` }
});