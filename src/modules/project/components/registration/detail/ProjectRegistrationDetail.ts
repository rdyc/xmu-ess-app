import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ProjectUserAction } from '@project/classes/types';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ProjectRegistrationDetailView } from './ProjectRegistrationDetailView';

interface IOwnRouteParams {
  projectUid: string;
}

interface IOwnHandler {
  handleOnModify: () => void;
  handleOnChangeStatus: () => void;
  handleOnChangeOwner: () => void;
  handleOnAdjustHour: () => void;
  handleOnReOpen: () => void;
  handleOnManageSite: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  isAdmin: boolean;
  action?: ProjectUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setModify: StateHandler<IOwnState>;
  setClose: StateHandler<IOwnState>;
  setReopen: StateHandler<IOwnState>;
  setChangeOwner: StateHandler<IOwnState>;
  setAdjustHour: StateHandler<IOwnState>;
  setManageSite: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

export type ProjectRegistrationDetailProps 
  = WithUser
  & WithProjectRegistration
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<ProjectRegistrationDetailProps, IOwnState> = (props: ProjectRegistrationDetailProps): IOwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<ProjectRegistrationDetailProps, IOwnState, IOwnStateUpdaters> = {
  setModify: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setClose: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.Close,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.closeTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.closeDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setReopen: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.ReOpen,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.reOpenDescription), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.reOpenDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
  }),
  setChangeOwner: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.ChangeOwner,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.changeOwnerTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.changeOwnerDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setAdjustHour: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.AdjustHour,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.adjustHourTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.adjustHourDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setManageSite: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.ManageSites,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.manageSiteTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.manageSiteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<ProjectRegistrationDetailProps, IOwnHandler> = {
  handleOnModify: (props: ProjectRegistrationDetailProps) => () => { 
    props.setModify();
  },
  handleOnChangeStatus: (props: ProjectRegistrationDetailProps) => () => { 
    props.setClose();
  },
  handleOnReOpen: (props: ProjectRegistrationDetailProps) => () => { 
    props.setReopen();
  },
  handleOnChangeOwner: (props: ProjectRegistrationDetailProps) => () => { 
    props.setChangeOwner();
  },
  handleOnAdjustHour: (props: ProjectRegistrationDetailProps) => () => { 
    props.setAdjustHour();
  },
  handleOnManageSite: (props: ProjectRegistrationDetailProps) => () => { 
    props.setManageSite();
  },
  handleOnCloseDialog: (props: ProjectRegistrationDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: ProjectRegistrationDetailProps) => () => { 
    const { response } = props.projectRegisterState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let companyUid: string | undefined;
    let projectUid: string | undefined;

    // get company uid
    if (response.data && response.data.customer) {
      companyUid = response.data.customer.companyUid;
    }

    // get project uid
    if (response.data) {
      projectUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      ProjectUserAction.Modify, 
      ProjectUserAction.ChangeOwner, 
      ProjectUserAction.AdjustHour, 
      ProjectUserAction.Close, 
      ProjectUserAction.ReOpen, 
      ProjectUserAction.ManageSites
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case ProjectUserAction.Modify:
          next = '/project/requests/form';
          break;
          
        case ProjectUserAction.ChangeOwner:
          next = '/project/requests/owner';
          break;

        case ProjectUserAction.AdjustHour:
          next = '/project/requests/hour';
          break;
        
        case ProjectUserAction.Close:
        case ProjectUserAction.ReOpen:
          next = '/project/requests/status';
          break;

        case ProjectUserAction.ManageSites:
          next = `/project/requests/sites/${companyUid}/${projectUid}`;
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: projectUid 
      });
    }
  },
};

export const ProjectRegistrationDetail = compose(
  setDisplayName('ProjectRegistrationDetail'),
  withRouter,
  withUser,
  withProjectRegistration,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(ProjectRegistrationDetailView);