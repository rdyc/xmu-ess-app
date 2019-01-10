export enum ModuleDefinition {
  ProjectRegistration = 'MOD07',
  ProjectAssignment = 'MOD08',
  Leave = 'MOD10',
  Expense = 'MOD01',
  Timesheet = 'MOD09',
  Travel = 'MOD05',
  TravelSettlement = 'MOD06',
  Purchase = 'MOD02',
  PurchaseSettlement = 'MOD03',
  Mileage = 'MOD04'
}

export enum NotificationType {
  Approval = 'Approval',
  Assignment = 'New Assignment',
  Notify = 'Notify',
  Rejected = 'Rejected',
  Settlement = 'Settlement',
  NewOwner = 'New Owner'
}

export interface IModuleRedirectResult {
  path: string;
  state: any;
}

export const redirector = (module: ModuleDefinition, type: NotificationType, uid?: string): IModuleRedirectResult => {
  let path: string = '/';

  let state: any = { 
    status: type === NotificationType.Notify ? undefined : 'pending', 
    isNotify: type === NotificationType.Notify
  };

  switch (module) {
    case ModuleDefinition.ProjectRegistration: 
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

    case ModuleDefinition.ProjectAssignment:
      path = '/project';
      
      if (type === NotificationType.Assignment) {
        path = path.concat('/acceptances', uid && `/${uid}` || '');
      } else {
        path = path.concat('/assignments', uid && `/${uid}` || '');
      }
      break;

    case ModuleDefinition.Leave:
      path = '/leave';
      
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
      }
      break;

    case ModuleDefinition.Expense:
      path = '/expense';

      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');
      }
      break;

    case ModuleDefinition.Timesheet:
      path = '/timesheet';

      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');
      }
      break;
      
    case ModuleDefinition.Travel:
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

    case ModuleDefinition.TravelSettlement:
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
  
    case ModuleDefinition.Purchase:
      path = '/purchase';
      
      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
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
  
    case ModuleDefinition.PurchaseSettlement:
      path = '/purchase/settlement';

      if (type === NotificationType.Approval || type === NotificationType.Notify) {
        path = path.concat('/approvals', uid && `/${uid}` || '');
      } else {
        path = path.concat('/requests', uid && `/${uid}` || '');

        if (type === NotificationType.Rejected) {
          state = {
            isRejected: true,
          };
        }
      }
      break;
  
    case ModuleDefinition.Mileage:
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

    default:
      break;
  }
    
  return {
    path,
    state
  };
};