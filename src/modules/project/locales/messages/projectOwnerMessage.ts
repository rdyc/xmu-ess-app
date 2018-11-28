import { defineMessages } from 'react-intl';

const prefix = 'project.registration';

export const projectOwnerMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.owner.emptyProps` },
  updateSuccess: { id: `${prefix}.message.owner.update.success` },
  updateFailure: { id: `${prefix}.message.owner.update.failure` },
});