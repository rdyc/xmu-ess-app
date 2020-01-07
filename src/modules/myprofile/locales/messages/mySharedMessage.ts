import { defineMessages } from 'react-intl';

const prefix = 'account.profile';

// page
export const mySharedPage = defineMessages({
  detailTitle: {id: `${prefix}.page.detail.title`},
  detailSubheader: {id: `${prefix}.page.detail.subHeader`},
});

// tabs
export const myProfileTabs = defineMessages({
  detail: {id: `${prefix}.tab.detail`},
  competency: {id: `${prefix}.tab.competency`},
  kpi: {id: `${prefix}.tab.kpi`},
  kpiAssign: {id: `${prefix}.tab.kpiAssign`},
});

// helper
export const mySharedHelperFor = (field: string, type: 'fieldTab') => {
  if (type === 'fieldTab') {
    switch (field) {
      case 'Detail': return myProfileTabs.detail;
      case 'Competency': return myProfileTabs.competency;
      case 'KPI': return myProfileTabs.kpi;
      case 'KPIAssign': return myProfileTabs.kpiAssign;

      default: return {id: field};
    }
  }

  return {id: field};
};