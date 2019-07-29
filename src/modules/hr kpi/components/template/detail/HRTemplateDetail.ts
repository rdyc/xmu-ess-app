import { AppRole } from '@constants/AppRole';
import { HRTemplateUserAction } from '@hr/classes/types';
import { WithHRTemplate, withHRTemplate } from '@hr/hoc/withHRTemplate';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { HRTemplateDetailView } from './HRTemplateDetailView';

interface IOwnRouteParams {
  templateUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: HRTemplateUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

export type HRTemplateDetailProps
  = WithUser
  & WithOidc
  & WithHRTemplate
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HRTemplateDetailProps, IOwnState> = (props: HRTemplateDetailProps): IOwnState => {
  // checking admin status
  const { user } = props.oidcState;
  let isAdmin: boolean = false;

  if (user) {
    const role: string | string[] | undefined = user.profile.role;

    if (role) {
      if (Array.isArray(role)) {
        isAdmin = role.indexOf(AppRole.Admin) !== -1;
      } else {
        isAdmin = role === AppRole.Admin;
      }
    }
  }
  return {
    isAdmin,
    shouldLoad: false,
    dialogFullScreen: false,
    dialogOpen: false,
  };
};

const stateUpdaters: StateUpdaters<HRTemplateDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HRTemplateDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HRTemplateDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HRTemplateDetailProps) => (): Partial<IOwnState> => ({
    action: HRTemplateUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.template.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(hrMessage.template.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
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

const handlerCreators: HandleCreators<HRTemplateDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HRTemplateDetailProps) => () => { 
    if (props.userState.user && props.match.params.templateUid && !props.hrTemplateState.detail.isLoading) {
      props.hrTemplateDispatch.loadDetailRequest({
        templateUid: props.match.params.templateUid
      });
    }
  },
  handleOnSelectedMenu: (props: HRTemplateDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case HRTemplateUserAction.Refresh:
        props.setShouldLoad();
        break;
      case HRTemplateUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: HRTemplateDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HRTemplateDetailProps) => () => {
    const { response } = props.hrTemplateState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let templateUid: string | undefined;

    // get templateUid uid
    if (response.data) {
      templateUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      HRTemplateUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case HRTemplateUserAction.Modify:
          next = '/kpi/templates/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: templateUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<HRTemplateDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: HRTemplateDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.templateUid !== prevProps.match.params.templateUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.hrTemplateState.detail.response !== prevProps.hrTemplateState.detail.response) {
      const { isLoading } = this.props.hrTemplateState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: HRTemplateUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: HRTemplateUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const HRTemplateDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withHRTemplate,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupMileageExceptionDetail')
)(HRTemplateDetailView);