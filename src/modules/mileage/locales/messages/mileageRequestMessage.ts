import { defineMessages } from 'react-intl';

const prefix = 'mileage.request';

// message
export const mileageRequestMessage = defineMessages({
  emptyProps: { id: 'mileage.message.request.emptyProps' },
  createSuccess: { id: 'mileage.message.request.create.success' },
  createFailure: { id: 'mileage.message.request.create.failure' },
});

// page
export const mileageRequestPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
});

// fields
export const mileageRequestField = defineMessages({
  uid: { id: `${prefix}.field.information.uid` },

  statusType: { id: `${prefix}.field.information.statusType`},
  
  date: { id: `${prefix}.field.information.date`},

  employeeName: { id: `${prefix}.field.information.employeeName`},

  amount: { id: `${prefix}.field.information.amount`},

  notes: { id: `${prefix}.field.information.notes`},

  month: { id: `${prefix}.field.information.month`},
  monthRequired: { id: `${prefix}.field.information.month.required`},
  monthPlaceholder: { id: `${prefix}.field.information.month.placeholder`},

  year: { id: `${prefix}.field.information.year`},
  yearRequired: { id: `${prefix}.field.information.year.required`},
  yearPlaceholder: { id: `${prefix}.field.information.year.placeholder`},

  // detail information
  title: { id: `${prefix}.field.information.title`},
  subHeader: { id: `${prefix}.field.information.subHeader`},

  // item
  itemRequired: {id: `${prefix}.field.item.required`},
  itemTitle: { id: `${prefix}.field.item.title`},
  itemSubHeader: { id: `${prefix}.field.item.subHeader`},
  noData: { id: `${prefix}.field.information.noData`},
  
  // field item
  itemUid: { id: `${prefix}.field.item.uid`},
  itemUidRequired: { id: `${prefix}.field.item.uid.required`},
  
  itemDate: { id: `${prefix}.field.item.date`},
  itemCustomer: { id: `${prefix}.field.item.customer`},
  itemProject: { id: `${prefix}.field.item.project`},
  itemStatus: { id: `${prefix}.field.item.status`},
  itemSite: { id: `${prefix}.field.item.site`},
  itemValue: { id: `${prefix}.field.item.value`},

  submitTitle: { id: `${prefix}.field.submit.title`},
  submitSubHeader: { id: `${prefix}.field.submit.subHeader`},

  employee: { id: `${prefix}.field.employee`},

  isNotify: { id: `${prefix}.field.isNotify` },
  completion: { id: `${prefix}.field.completion` },
  isRejected: { id: `${prefix}.field.isRejected` },
});

export const mileageRequestItem = defineMessages({
  title: { id: `${prefix}.item.title`},
  subHeader: { id: `${prefix}.item.subHeader`},

  empty: { id: `${prefix}.item.empty`}
});

export const mileageRequestConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.description` },
});

export const timesheetItem = defineMessages({
  title: { id: `${prefix}.timesheet.item.title` },
  subHeader: { id: `${prefix}.timesheet.item.subHeader` }
});

// helper
export const mileageFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'year': return mileageRequestField.year;
      case 'month': return mileageRequestField.month;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'year': return mileageRequestField.yearRequired;
      case 'month': return mileageRequestField.monthRequired;
      case 'items': return mileageRequestField.itemRequired;
      case 'itemUid': return mileageRequestField.itemUidRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'year': return mileageRequestField.yearPlaceholder;
      case 'month': return mileageRequestField.monthPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};

export const mileageRequestSubmission = defineMessages({
  form: { id: `${prefix}.submission.form`}
});
