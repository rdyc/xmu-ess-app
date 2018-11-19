import { defineMessages } from 'react-intl';

const prefix = 'project';

// action
export const projectAction = defineMessages({
  close: { id: `${prefix}.action.close` },
  reOpen: { id: `${prefix}.action.reOpen` },
  owner: { id: `${prefix}.action.owner` },
  site: { id: `${prefix}.action.site` }
});