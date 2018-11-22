import { defineMessages } from 'react-intl';

const prefix = 'expense.approval';

export const expenseApprovalMessage = defineMessages({  
  approveSuccess: { id: `${prefix}.message.approve.success` },
  rejectSuccess: { id: `${prefix}.message.reject.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
});

export const expenseApprovalPage = defineMessages({
  title: { id: `${prefix}.form.newTitle`},
  subTitle: { id: `${prefix}.form.newSubTitle`},
});

export const expenseApprovalSection = defineMessages({
  title: { id: `${prefix}.title`},
  subTitle: { id: `${prefix}.subTitle`},
});

export const expenseApprovalDialog = defineMessages({
  title: {id: `${prefix}.dialog.title`},
  content: {id: `${prefix}.dialog.content`},
});