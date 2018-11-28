import { defineMessages } from 'react-intl';

const prefix = 'project.registration';

export const projectStatusMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.status.emptyProps` },
  updateSuccess: { id: `${prefix}.message.status.update.success` },
  updateFailure: { id: `${prefix}.message.status.update.failure` },
});