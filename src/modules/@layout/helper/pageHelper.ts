import { IRedirection } from '@generic/interfaces';
import { ModuleDefinitionType, NotificationType } from '@layout/types';

const redirectFrom = (module: ModuleDefinitionType, type: NotificationType, uid?: string): IRedirection => {
  let path: string = '/';

  let state: any = { 
    status: type === NotificationType.Notify ? undefined : 'pending', 
    isNotify: type === NotificationType.Notify
  };

  switch (module) {
    case ModuleDefinitionType.ProjectRegistration: 
      path = '/project';
    
      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');

        if (type === NotificationType.Approval) {
          state = {
            status: 'pending',
          };
        }

        if (type === NotificationType.Notify) {
          state = {
            status: 'complete',
            isNotify: true,
          };
        }
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');

        if (type === NotificationType.NewOwner) {
          state = {
            status: 'complete',
            isNewOwner: true,
          };
        }
      }
      break;

    case ModuleDefinitionType.ProjectAssignment:
      path = '/project';
      
      if (type === NotificationType.Assignment) {
        path = path.concat('/acceptances', uid && `/${uid}` || '');
      } else {
        path = path.concat('/assignments', uid && `/${uid}` || '');
      }
      break;

    case ModuleDefinitionType.Leave:
      path = '/leave';
      
      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');
      }
      break;

    case ModuleDefinitionType.Expense:
      path = '/expense';

      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');
      }
      break;

    case ModuleDefinitionType.Timesheet:
      path = '/timesheet';

      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');
      }
      break;
      
    case ModuleDefinitionType.Travel:
      path = '/travel';

      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');

        if (type === NotificationType.Approval) {
          state = {
            status: 'pending',
          };
        }

        if (type === NotificationType.Notify) {
          state = {
            status: 'complete',
            isNotify: true,
          };
        }
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');

        if (type === NotificationType.Settlement) {
          state = {
            isSettlement: true,
          };
        }

        if (type === NotificationType.Rejected) {
          state = {
            isRejected: true,
          };
        }
      }
      break;

    case ModuleDefinitionType.TravelSettlement:
      path = '/travel';

      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/settlement/approvals', uid && `/${uid}` || '');

        if (type === NotificationType.Approval) {
          state = {
            status: 'pending',
          };
        }

        if (type === NotificationType.Notify) {
          state = {
            status: 'complete',
            isNotify: true,
          };
        }

      } else {
        path = path.concat('/settlement/requests', uid && `/${uid}` || '');

        if (type === NotificationType.Rejected) {
          state = {
            isRejected: true,
          };
        }
      }
      break;        
  
    case ModuleDefinitionType.Purchase:
      path = '/purchase';
      
      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
        
        if (type === NotificationType.Approval) {
          state = {
            status: 'pending',
          };
        }

        if (type === NotificationType.Notify) {
          state = {
            status: 'complete',
            isNotify: true,
          };
        }
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');

        if (type === NotificationType.Settlement) {
          state = {
            isSettlement: true,
          };
        }

        if (type === NotificationType.Rejected) {
          state = {
            isRejected: true,
          };
        }
      }
      break;
  
    case ModuleDefinitionType.PurchaseSettlement:
      path = '/purchase/settlement';

      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');

        if (type === NotificationType.Approval) {
          state = {
            status: 'pending',
          };
        }

        if (type === NotificationType.Notify) {
          state = {
            status: 'complete',
            isNotify: true,
          };
        }
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');

        if (type === NotificationType.Rejected) {
          state = {
            isRejected: true,
          };
        }
      }
      break;
  
    case ModuleDefinitionType.Mileage:
      path = '/mileage';
      
      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
        
        if (type === NotificationType.Approval) {
          state = {
            status: 'pending',
          };
        }

        if (type === NotificationType.Notify) {
          state = {
            status: 'complete',
            isNotify: true,
          };
        }
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');       
      }
      break;

    case ModuleDefinitionType.Assessment:
      path = '/hr/assessmentinput';
      
      if (type === NotificationType.Assessment) {      
          
        if (type === NotificationType.Assessment && uid) {
          // path = path.concat('/form');

          state = {
            uid
          };
        }
      }

      break;

    default:
      break;
  }
    
  return({
    path,
    state
  });
};

export const pageHelper = {
  redirectFrom
};