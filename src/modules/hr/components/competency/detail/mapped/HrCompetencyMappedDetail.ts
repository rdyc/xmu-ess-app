import { AppRole } from '@constants/AppRole';
import { IHrCompetencyMappedUserAction } from '@hr/classes/types';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
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

import { HrCompetencyMappedDetailView } from './HrCompetencyMappedDetailView';

interface IOwnRouteParams {
  mappedUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: IHrCompetencyMappedUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

export type HrCompetencyMappedDetailProps
  = WithOidc
  & WithUser
  & WithHrCompetencyMapped
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCompetencyMappedDetailProps, IOwnState> = (props: HrCompetencyMappedDetailProps): IOwnState => { 
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
      dialogOpen: false
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyMappedDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyMappedDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyMappedDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCompetencyMappedDetailProps) => (): Partial<IOwnState> => ({
    action: IHrCompetencyMappedUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Mapped'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'Mapped'}),
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

const handlerCreators: HandleCreators<HrCompetencyMappedDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyMappedDetailProps) => () => { 
    const { user } = props.userState;
    const mappedUid = props.match.params.mappedUid;
    const { isLoading } = props.hrCompetencyMappedState.detail;

    if (user && mappedUid && !isLoading) {
      props.hrCompetencyMappedDispatch.loadDetailRequest({
        mappedUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyMappedDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IHrCompetencyMappedUserAction.Refresh:
        props.setShouldLoad();
        break;

      case IHrCompetencyMappedUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: HrCompetencyMappedDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCompetencyMappedDetailProps) => () => {
    const { response } = props.hrCompetencyMappedState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let mappedUid: string | undefined;

    // get project uid
    if (response.data) {
      mappedUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      IHrCompetencyMappedUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case IHrCompetencyMappedUserAction.Modify:
          next = '/lookup/competencymapped/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: mappedUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyMappedDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyMappedDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.mappedUid !== prevProps.match.params.mappedUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.hrCompetencyMappedState.detail.response !== prevProps.hrCompetencyMappedState.detail.response) {
      const { isLoading } = this.props.hrCompetencyMappedState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: IHrCompetencyMappedUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: IHrCompetencyMappedUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const HrCompetencyMappedDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withHrCompetencyMapped,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('HrCompetencyMappedDetail')
)(HrCompetencyMappedDetailView);