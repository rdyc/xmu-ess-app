import { defineMessages } from 'react-intl';

const prefix = 'account.profile';

// page
export const mySharedPage = defineMessages({
  detailTitle: {id: `${prefix}.page.detail.title`},
  detailSubheader: {id: `${prefix}.page.detail.subheader`},
});

// tabs
export const myProfileTabs = defineMessages({
  profile: {id: `${prefix}.tab.profile`},
  competency: {id: `${prefix}.tab.competency`},
  kpi: {id: `${prefix}.tab.kpi`},
  kpiAssign: {id: `${prefix}.tab.kpiAssign`},
});

// helper
export const mySharedHelperFor = (field: string, type: 'fieldTab') => {
  if (type === 'fieldTab') {
    switch (field) {
      case 'profile': return myProfileTabs.profile;
      case 'competency': return myProfileTabs.competency;
      case 'KPI': return myProfileTabs.kpi;
      case 'KPIAssign': return myProfileTabs.kpiAssign;

      default: return {id: field};
    }
  }

  return {id: field};
};