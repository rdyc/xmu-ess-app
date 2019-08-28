import { defineMessages } from 'react-intl';

const prefix = 'hr.shared';

// option
export const hrSharedOption = defineMessages({
  new: { id: `${prefix}.option.new` },
  modify: { id: `${prefix}.option.modify` }
});

// page
export const hrSharedPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
  modifyTitle: { id: `${prefix}.page.modify.title`},
  modifySubHeader: { id: `${prefix}.page.modify.subHeader`}
});

// messages
export const hrSharedMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// confirmation
export const hrSharedConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.subHeader` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.subHeader` },
  saveAsTitle: { id: `${prefix}.confirm.saveAs.title` },
  saveAsDescription: { id: `${prefix}.confirm.saveAs.subHeader` },
});

// section
export const hrSharedSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  infoSubHeader: { id: `${prefix}.section.info.subHeader`},
  submission: { id: `${prefix}.section.submission`},
});