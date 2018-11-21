import { defineMessages } from 'react-intl';

const prefix = 'leave.cancellation';

export const leaveCancellationMessage = defineMessages({
  emptyProps: { id: 'leave.message.cancellation.emptyProps' },
  createSuccess: { id: 'leave.message.cancellation.create.success' },
  createFailure: { id: 'leave.message.cancellation.create.failure' },
});

// page
export const leaveCancellationPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` }
});