export const menuLinkMapper = (menuUid: string) => {
  let path = '';

  switch (menuUid) {
    case 'MNU31':
      path = '/expense/requests';
      break;
    case 'MNU32':
      path = '/expense/approvals';
      break;
    case 'MNU46':
      path = '/finance/approvals';
      break;
    case 'MNU25':
      path = '/leave/requests';
      break;
    case 'MNU26':
      path = '/leave/approvals';
      break;
    case 'MNU57':
      path = '/leave/cancellations';
      break;
    case 'MNU44':
      path = '/mileage/approvals';
      break;
    case 'MNU43':
      path = '/mileage/requests';
      break;
    case 'MNU18':
      path = '/account/password';
      break;
    case 'MNU27':
      path = '/account/delegate';
      break;
    case 'MNU22':
      path = '/project/acceptances';
      break;
    case 'MNU21':
      path = '/project/assignments';
      break;
    case 'MNU19':
      path = '/project/requests';
      break;
    case 'MNU20':
      path = '/project/approvals';
      break;
    case 'MNU58':
      path = '/reports/billable';
      break;
    case 'MNU61':
      path = '/reports/presales';
      break;
    case 'MNU56':
      path = '/reports/profitability';
      break;
    case 'MNU51':
      path = '/reports/effectiveness';
      break;
    case 'MNU52':
      path = '/reports/progress';
      break;
    case 'MNU23':
      path = '/purchase/requests';
      break;
    case 'MNU37':
      path = '/purchase/settlement/requests';
      break;
    case 'MNU38':
      path = '/purchase/settlement/approvals';
      break;
    case 'MNU24':
      path = '/purchase/approvals';
      break;
    case 'MNU39':
      path = '/timesheet/approvals/history';
      break;
    case 'MNU11':
      path = '/timesheet/approvals';
      break;
    case 'MNU10':
      path = '/timesheet/requests/form';
      break;
    case 'MNU34':
      path = '/timesheet/requests';
      break;
    case 'MNU28':
      path = '/travel/requests';
      break;
    case 'MNU40':
      path = '/travel/approvals';
      break;
    case 'MNU29':
      path = '/travel/settlement/requests';
      break;
    case 'MNU41':
      path = '/travel/settlement/approvals';
      break;

    case 'MNU02':
      path = '/lookup/company/list';
      break;

    case 'MNU03':
      path = '/lookup/employee/list';
      break;

    case 'MNU04':
      path = '/lookup/approvalhierarchy/list';
      break;

    case 'MNU05':
      path = '/lookup/organization/list';
      break;

    case 'MNU06':
      path = '/lookup/position/list';
      break;

    case 'MNU07':
      path = '/lookup/roles/list';
      break;

    case 'MNU33':
      path = '/lookup/customer/list';
      break;

    case 'MNU35':
      path = '/lookup/workflow/list';
      break;

    case 'MNU36':
      path = '/lookup/holiday/list';
      break;

    case 'MNU47':
      path = '/lookup/timelimit/list';
      break;

    case 'MNU48':
      path = '/lookup/leave/list';
      break;

    case 'MNU49':
      path = '/lookup/employeeleave/list';
      break;

    case 'MNU53':
      path = '/common/system';
      break;

    case 'MNU54':
      path = '/lookup/diemvalue/list';
      break;

    case 'MNU55':
      path = '/lookup/currency/list';
      break;

    case 'MNU59':
      path = '/lookup/mileageexception';
      break;

    default:
      path = '/home/dashboard';
      break;
  }

  return path;
};
