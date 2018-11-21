import { defineMessages } from 'react-intl';

const prefix = 'project.acceptance';

// page
export const projectAcceptancePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  approvalTitle: { id: `${prefix}.page.approval.title` },
  approvalSubHeader: { id: `${prefix}.page.approval.subHeader` }
});

// section
export const projectAcceptanceSection = defineMessages({
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
});

// confirm
export const projectAcceptanceConfirm = defineMessages({
  approvalTitle: { id: `${prefix}.confirm.approval.title` },
  approvalContent: { id: `${prefix}.confirm.approval.content` },
});

// message
export const projectAcceptanceMessage = defineMessages({
  approvalSuccess: { id: `${prefix}.message.approval.success` },
  approvalFailure: { id: `${prefix}.message.approval.failure` },
});