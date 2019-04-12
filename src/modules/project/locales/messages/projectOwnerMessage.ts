import { defineMessages } from 'react-intl';

const prefix = 'project.registration';

// message
export const projectOwnerMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.owner.emptyProps` },
  updateSuccess: { id: `${prefix}.message.owner.update.success` },
  cloneSuccess: { id: `${prefix}.message.owner.clone.success` },
  updateFailure: { id: `${prefix}.message.owner.update.failure` },
});