import { defineMessages } from 'react-intl';

const prefix = 'mileage.approval';

// message
export const mileageApprovalMessage = defineMessages({
  emptyProps: { id: 'mileage.message.approval.emptyProps' },
  createSuccess: { id: 'mileage.message.approval.create.success' },
  createFailure: { id: 'mileage.message.approval.create.failure' },
  updateSuccess: { id: 'mileage.message.approval.update.success' },
  updateFailure: { id: 'mileage.message.approval.update.failure' },
});

// page
export const mileageApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
});