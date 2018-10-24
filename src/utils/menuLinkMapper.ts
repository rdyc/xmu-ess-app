export const menuLinkMapper = (menuUid: string) => {
  let path = '';

  switch (menuUid) {
    case 'MNU31':
      path = '/expense/request/list';
      break;
    case 'MNU32':
      path = '/approval/expense/list';
      break;
    case 'MNU46':
      path = '/approval/finance';
      break;
    case 'MNU25':
      path = '/leave/list';
      break;
    case 'MNU26':
      path = '/approval/leave';
      break;
    case 'MNU57':
      path = '/leave/cancellation';
      break;
    case 'MNU44':
      path = '/approval/mileage';
      break;
    case 'MNU43':
      path = '/mileage/request';
      break;
    case 'MNU18':
      path = '/account/password';
      break;
    case 'MNU27':
      path = '/account/delegate';
      break;
    case 'MNU22':
      path = '/project/assignment/acceptance';
      break;
    case 'MNU21':
      path = '/project/assignment/request';
      break;
    case 'MNU19':
      path = '/project/list';
      break;
    case 'MNU20':
      path = '/approval/project';
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
    case 'MNU52':
      path = '/reports/progress';
      break;
    case 'MNU23':
      path = '/purchase/request/list';
      break;
    case 'MNU37':
      path = '/purchase/settlement/list';
      break;
    case 'MNU38':
      path = '/approval/purchase/settlement/list';
      break;
    case 'MNU24':
      path = '/approval/purchase/request/list';
      break;
    case 'MNU39':
      path = '/approval/timesheet/history';
      break;
    case 'MNU11':
      path = '/approval/timesheet';
      break;
    case 'MNU10':
      path = '/timesheet/entry';
      break;
    case 'MNU34':
      path = '/timesheet/entry/history';
      break;
    case 'MNU28':
      path = '/travel/request';
      break;
    case 'MNU40':
      path = '/approval/travel/request';
      break;
    case 'MNU29':
      path = '/travel/settlement';
      break;
    case 'MNU41':
      path = '/approval/travel/settlement';
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
      path = '/lookup/systemsetup/list';
      break;

    case 'MNU54':
      path = '/lookup/diemvalue/list';
      break;

    case 'MNU55':
      path = '/lookup/currency/list';
      break;

    case 'MNU59':
      path = '/lookup/mileageexception/list';
      break;

    default:
      path = '/';
      break;
  }

  return path;
};
