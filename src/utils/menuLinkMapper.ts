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

    case 'MNU65':
      path = '/project/administrations';
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

    case 'MNU60':
      path = '/reports/winningratio';
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
      path = '/lookup/company';
      break;

    case 'MNU03':
      path = '/account/employee';
      break;

    case 'MNU04':
      path = '/organization/hierarchy';
      break;

    case 'MNU05':
      path = '/organization/structure';
      break;

    case 'MNU06':
      path = '/lookup/positions';
      break;

    case 'MNU07':
      path = '/lookup/roles';
      break;

    case 'MNU33':
      path = '/lookup/customers';
      break;

    case 'MNU35':
      path = '/organization/workflow';
      break;

    case 'MNU36':
      path = '/lookup/holidays';
      break;

    case 'MNU47':
      path = '/lookup/systemlimits';
      break;

    case 'MNU48':
      path = '/lookup/leaves';
      break;

    case 'MNU49':
      path = '/lookup/employeeleave';
      break;

    case 'MNU53':
      path = '/common/system';
      break;

    case 'MNU54':
      path = '/lookup/diemvalues';
      break;

    case 'MNU55':
      path = '/lookup/currencies';
      break;

    case 'MNU59':
      path = '/lookup/mileageexceptions';
      break;
    
    case 'MNU62':
      path = '/lookup/imagegalleries';
      break;

    case 'MNU62':
      path = '/lookup/gallery';
      break;

    case 'MNU63':
      path = '/lookup/achievementchart';
      break;

    case 'MNU64':
      path = '/lookup/cogsupload';
      break;

    case 'MNU80':
      path = '/hr/notification/periods';
      break;

    case 'MNU81':
      path = '/hr/notification/settings';
      break;

    case 'MNU82':
      path = '/hr/notification/templates';
      break;
      
    case 'MNU66':
      path = '/reports/resourcemapping';
      break;
      
    case 'MNU69':
      path = '/hr/competency/cluster';
      break;

    case 'MNU78':
      path = '/hr/competency/category';
      break;

    case 'MNU79':
      path = '/hr/competency/mapped';
      break;
      
    case 'MNU67':
      path = '/kpi/categories';
      break;

    case 'MNU68':
      path = '/kpi/templates';
      break;

    case 'MNU84':
      path = '/kpi/assigns';
      break;

    case 'MNU73':
      path = '/kpi/finals';
      break;

    case 'MNU74':
      path = '/kpi/employees';
      break;

    case 'MNU75':
      path = '/kpi/approvals';
      break;
    
    case 'MNU70':
      path = '/hr/corner/page';
      break;

    case 'MNU76':
      path = '/hr/assessmentresult';
      break;

    case 'MNU77':
      path = '/hr/assessment';
      break;

    case 'MNU83':
      path = '/hr/assessmentinput';
      break;
    
    case 'MNU85':
      path = '/account/profile/detail';
      break;

    case 'MNU86':
      path = '/lookup/employeelevels';
      break;

    case 'MNU91':
      path = '/kpi/opens';
      break;

    case 'MNU71':
      path = '/webjob';
      break;
      
    default:
      path = '/home/dashboard';
      break;
  }

  return path;
};
