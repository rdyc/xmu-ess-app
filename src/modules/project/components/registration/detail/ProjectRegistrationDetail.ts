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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ProjectRegistrationDetailView } from './ProjectRegistrationDetailView';

interface OwnRouteParams {
  projectUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnChangeStatus: () => void;
  handleOnChangeOwner: () => void;
  handleOnReOpen: () => void;
  handleOnManageSite: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: ProjectUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setModify: StateHandler<OwnState>;
  setClose: StateHandler<OwnState>;
  setReopen: StateHandler<OwnState>;
  setChangeOwner: StateHandler<OwnState>;
  setManageSite: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type ProjectRegistrationDetailProps 
  = WithUser
  & WithProjectRegistration
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<ProjectRegistrationDetailProps, OwnState> = (props: ProjectRegistrationDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<ProjectRegistrationDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: ProjectRegistrationDetailProps) => (): Partial<OwnState> => ({
    action: ProjectUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setClose: (prevState: OwnState, props: ProjectRegistrationDetailProps) => (): Partial<OwnState> => ({
    action: ProjectUserAction.Close,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.closeTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.closeDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setReopen: (prevState: OwnState, props: ProjectRegistrationDetailProps) => (): Partial<OwnState> => ({
    action: ProjectUserAction.ReOpen,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.reOpenDescription), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.reOpenDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
  }),
  setChangeOwner: (prevState: OwnState, props: ProjectRegistrationDetailProps) => (): Partial<OwnState> => ({
    action: ProjectUserAction.ChangeOwner,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.changeOwnerTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.changeOwnerDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setManageSite: (prevState: OwnState, props: ProjectRegistrationDetailProps) => (): Partial<OwnState> => ({
    action: ProjectUserAction.ManageSites,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.manageSiteTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.manageSiteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<ProjectRegistrationDetailProps, OwnHandler> = {
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
  withRouter,
  withUser,
  withProjectRegistration,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(ProjectRegistrationDetailView);