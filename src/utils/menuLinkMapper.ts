export const menuLinkMapper = (menuUid: string) => {
  let path = '';

  switch (menuUid) {
    case 'MNU06':
      path = '/lookup/position/list';
      break;
    case 'MNU31':
      path = '/expense/request';    
      break;
    case 'MNU32':
      path = '/approval/expense';    
      break;
    case 'MNU46':
      path = '/approval/finance';    
      break;
    case 'MNU25':
      path = '/leave/request';    
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
      path = '/purchase/request';    
      break;
    case 'MNU37':
      path = '/purchase/settlement';    
      break;
    case 'MNU38':
      path = '/approval/purchase/settlement';    
      break;
    case 'MNU24':
      path = '/approval/purchase/request';    
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

    default:
      path = '/';
      break;
  }

  return path;
};