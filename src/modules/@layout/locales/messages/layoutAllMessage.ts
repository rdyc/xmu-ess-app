import { defineMessages } from 'react-intl';

const prefix = 'layout';

// text
export const layoutText = defineMessages({
  autoField: { id: `${prefix}.text.autoField`},
  loading: { id: `${prefix}.text.loading`},
  waiting: { id: `${prefix}.text.waiting`},
  processing: { id: `${prefix}.text.processing`},
  semester: { id: `${prefix}.text.semester`},
  retry: { id: `${prefix}.text.retry`},
  none: { id: `${prefix}.text.none`},
  dataInfo: { id: `${prefix}.text.dataInfo` },
  pagingInfo: { id: `${prefix}.text.pagingInfo` },
  active: { id: `${prefix}.text.active`},
  inactive: { id: `${prefix}.text.inactive`},
  find: { id: `${prefix}.text.find`},
  search: { id: `${prefix}.text.search`},
  selection: { id: `${prefix}.text.selection`},
  all: { id: `${prefix}.text.all`},
  invalidFormFields: { id: `${prefix}.text.invalidFormFields`}
});

// label
export const layoutLabel = defineMessages({
  login: { id: `${prefix}.label.login`},
  logout: { id: `${prefix}.label.logout`},
  themeDark: { id: `${prefix}.label.theme.dark`},
  themeLight: { id: `${prefix}.label.theme.light`},
  anchorRight: { id: `${prefix}.label.anchor.right`},
  anchorLeft: { id: `${prefix}.label.anchor.left`},
  switch: { id: `${prefix}.label.switch`}
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
  add: { id: `${prefix}.action.add`},
  accept: { id: `${prefix}.action.accept`},
  remove: { id: `${prefix}.action.remove`},
  apply: { id: `${prefix}.action.apply`},
  yes: { id: `${prefix}.action.yes`},
  no: { id: `${prefix}.action.no`},
  ok: { id: `${prefix}.action.ok`},
  agree: { id: `${prefix}.action.agree`},
  disagree: { id: `${prefix}.action.disagree`},
  continue: { id: `${prefix}.action.continue`},
  process: { id: `${prefix}.action.process`},
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
  clear: { id: `${prefix}.action.clear`},
  details: { id: `${prefix}.action.details`},
  next: { id: `${prefix}.action.next`},
  nextCount: { id: `${prefix}.action.nextCount`},
  previous: { id: `${prefix}.action.previous`},
  previousCount: { id: `${prefix}.action.previousCount`},
  delete: { id: `${prefix}.action.delete`},
  calculation: { id: `${prefix}.action.calculation`},
  saveAs: { id: `${prefix}.action.saveAs`},
  draft: { id: `${prefix}.action.draft`},
  final: { id: `${prefix}.action.final`},
});

// field
export const layoutField = defineMessages({
  createdBy: { id: `${prefix}.field.created.by`},
  createdAt: { id: `${prefix}.field.created.at`},
  updatedBy: { id: `${prefix}.field.updated.by`},
  updatedAt: { id: `${prefix}.field.updated.at`}
});

// dialog
export const layoutDialog = defineMessages({
  accessTitle: { id: `${prefix}.dialog.access.title`},
  accessContent: { id: `${prefix}.dialog.access.content`},
  logoutTitle: { id: `${prefix}.dialog.logout.title`},
  logoutContent: { id: `${prefix}.dialog.logout.content`},
});

// page
export const layoutPage = defineMessages({
  forbidden: { id: `${prefix}.page.forbidden`},
  notFound: { id: `${prefix}.page.notFound`},
  error: { id: `${prefix}.page.error`}
});

// page
export const layoutContent = defineMessages({
  forbiddenTitle: { id: `${prefix}.content.forbidden.title`},
  forbiddenSubHeader: { id: `${prefix}.content.forbidden.subHeader`},
});