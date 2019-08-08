import { AppRole } from '@constants/AppRole';
import { KPITemplateUserAction } from '@kpi/classes/types';
import { WithKPITemplate, withKPITemplate } from '@kpi/hoc/withKPITemplate';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
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

import { KPITemplateDetailView } from './KPITemplateDetailView';

interface IOwnRouteParams {
  templateUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: KPITemplateUserAction;
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

export type KPITemplateDetailProps
  = WithUser
  & WithOidc
  & WithKPITemplate
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<KPITemplateDetailProps, IOwnState> = (props: KPITemplateDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<KPITemplateDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: KPITemplateDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: KPITemplateDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: KPITemplateDetailProps) => (): Partial<IOwnState> => ({
    action: KPITemplateUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(kpiMessage.template.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(kpiMessage.template.confirm.modifyDescription),
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

const handlerCreators: HandleCreators<KPITemplateDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPITemplateDetailProps) => () => { 
    if (props.userState.user && props.match.params.templateUid && !props.kpiTemplateState.detail.isLoading) {
      props.kpiTemplateDispatch.loadDetailRequest({
        companyUid: props.history.location.state.companyUid,
        positionUid: props.history.location.state.positionUid,
        templateUid: props.match.params.templateUid
      });
    }
  },
  handleOnSelectedMenu: (props: KPITemplateDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case KPITemplateUserAction.Refresh:
        props.setShouldLoad();
        break;
      case KPITemplateUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: KPITemplateDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: KPITemplateDetailProps) => () => {
    const { response } = props.kpiTemplateState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let companyUid: string | undefined;
    let positionUid: string | undefined;
    let templateUid: string | undefined;

    // get templateUid uid
    if (response.data) {
      companyUid = response.data.companyUid;
      positionUid = response.data.positionUid;
      templateUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      KPITemplateUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case KPITemplateUserAction.Modify:
          next = '/kpi/templates/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        companyUid, 
        positionUid,
        uid: templateUid, 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<KPITemplateDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: KPITemplateDetailProps) {
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
    if (this.props.kpiTemplateState.detail.response !== prevProps.kpiTemplateState.detail.response) {
      const { isLoading } = this.props.kpiTemplateState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPITemplateUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: KPITemplateUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const KPITemplateDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withKPITemplate,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('KPITemplateDetail')
)(KPITemplateDetailView);