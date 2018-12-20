import { defineMessages } from 'react-intl';

const prefix = 'layout';

// text
export const layoutText = defineMessages({
  loading: { id: `${prefix}.text.loading`},
  waiting: { id: `${prefix}.text.waiting`},
  processing: { id: `${prefix}.text.processing`},
  none: { id: `${prefix}.text.none`},
  dataInfo: { id: `${prefix}.text.dataInfo` },
  pagingInfo: { id: `${prefix}.text.pagingInfo` },
  active: { id: `${prefix}.text.active`},
  inactive: { id: `${prefix}.text.inactive`}
});

// tooltip
export const layoutTooltip = defineMessages({
  more: { id: `${prefix}.tooltip.more`},
  filter: { id: `${prefix}.tooltip.filter`},
  orderBy: { id: `${prefix}.tooltip.orderBy`},
  sortDirection: { id: `${prefix}.tooltip.sortDirection`},
  rowsPerPage: { id: `${prefix}.tooltip.rowsPerPage` },
  createNew: { id: `${prefix}.tooltip.createNew` },
  refresh: { id: `${prefix}.tooltip.refresh` },
  nextPage: { id: `${prefix}.tooltip.nextPage` },
  prevPage: { id: `${prefix}.tooltip.prevPage` },
});

// action
export const layoutAction = defineMessages({
  apply: { id: `${prefix}.action.apply`},
  yes: { id: `${prefix}.action.yes`},
  no: { id: `${prefix}.action.no`},
  ok: { id: `${prefix}.action.ok`},
  aggre: { id: `${prefix}.action.aggre`},
  disaggre: { id: `${prefix}.action.disaggre`},
  continue: { id: `${prefix}.action.continue`},
  create: { id: `${prefix}.action.create`},
  save: { id: `${prefix}.action.save`},
  cancel: { id: `${prefix}.action.cancel`},
  discard: { id: `${prefix}.action.discard`},
  edit: { id: `${prefix}.action.edit`},
  modify: { id: `${prefix}.action.modify`},
  close: { id: `${prefix}.action.close`},
  dismiss: { id: `${prefix}.action.dismiss`},
  approve: { id: `${prefix}.action.approve`},
  reject: { id: `${prefix}.action.reject`},
  refresh: { id: `${prefix}.action.refresh`},
  submit: { id: `${prefix}.action.submit`},
  reset: { id: `${prefix}.action.reset`},
  clear: { id: `${prefix}.action.yes`},
  details: { id: `${prefix}.action.details`},
  next: { id: `${prefix}.action.next`},
  nextCount: { id: `${prefix}.action.nextCount`},
  previous: { id: `${prefix}.action.previous`},
  previousCount: { id: `${prefix}.action.previousCount`},
  delete: { id: `${prefix}.action.delete`},
  calculation: { id: `${prefix}.action.calculation`}
});

// field
export const layoutField = defineMessages({
  createdBy: { id: `${prefix}.field.created.by`},
  createdAt: { id: `${prefix}.field.created.at`},
  updatedBy: { id: `${prefix}.field.updated.by`},
  updatedAt: { id: `${prefix}.field.updated.at`}
});