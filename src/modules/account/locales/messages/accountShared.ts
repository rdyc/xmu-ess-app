import { defineMessages } from 'react-intl';

const prefix = 'account.shared';

// option
export const accountSharedOption = defineMessages({
  new: { id: `${prefix}.option.new` },
  modify: { id: `${prefix}.option.modify` },
  remove: { id: `${prefix}.option.remove` }
});

// page
export const accountSharedPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
  modifyTitle: { id: `${prefix}.page.modify.title`},
  modifySubHeader: { id: `${prefix}.page.modify.subHeader`},
  deleteTitle: { id: `${prefix}.page.delete.title`},
  deleteSubHeader: { id: `${prefix}.page.delete.subHeader`},
});

// messages
export const accountSharedMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});