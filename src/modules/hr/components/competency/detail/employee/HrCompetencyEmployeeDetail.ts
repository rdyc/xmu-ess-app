import { AppRole } from '@constants/AppRole';
import { IHrCompetencyEmployeeUserAction } from '@hr/classes/types';
import { WithHrCompetencyEmployee, withHrCompetencyEmployee } from '@hr/hoc/withHrCompetencyEmployee';
import { withHrCompetencyMapped, WithHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '@styles';
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

import { HrCompetencyEmployeeDetailView } from './HrCompetencyEmployeeDetailView';

interface IOwnRouteParams {
  competencyEmployeeUid: string;
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
  action?: IHrCompetencyEmployeeUserAction;
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

export type HrCompetencyEmployeeDetailProps
  = WithOidc
  & WithUser
  & WithHrCompetencyEmployee
  & WithHrCompetencyMapped
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCompetencyEmployeeDetailProps, IOwnState> = (props: HrCompetencyEmployeeDetailProps): IOwnState => { 
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

const stateUpdaters: StateUpdaters<HrCompetencyEmployeeDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyEmployeeDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyEmployeeDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCompetencyEmployeeDetailProps) => (): Partial<IOwnState> => ({
    action: IHrCompetencyEmployeeUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Assessment input'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'assessment input'}),
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

const handlerCreators: HandleCreators<HrCompetencyEmployeeDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyEmployeeDetailProps) => () => { 
    const { user } = props.userState;
    const competencyEmployeeUid = props.match.params.competencyEmployeeUid;
    const { isLoading } = props.hrCompetencyEmployeeState.detail;

    if (user && competencyEmployeeUid && !isLoading) {
      props.hrCompetencyEmployeeDispatch.loadDetailRequest({
        competencyEmployeeUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyEmployeeDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IHrCompetencyEmployeeUserAction.Refresh:
        props.setShouldLoad();
        break;

      case IHrCompetencyEmployeeUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: HrCompetencyEmployeeDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCompetencyEmployeeDetailProps) => () => {
    const { response } = props.hrCompetencyEmployeeState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let competencyEmployeeUid: string | undefined;

    // get project uid
    if (response.data) {
      competencyEmployeeUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      IHrCompetencyEmployeeUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case IHrCompetencyEmployeeUserAction.Modify:
          next = '/hr/assessmentinput/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: competencyEmployeeUid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyEmployeeDetailProps, IOwnState> = {
  componentDidMount() {
    // const { response, request } = this.props.hrCompetencyEmployeeState.detail;
    // const { match } = this.props;

    // if (!response || request && request.competencyEmployeeUid !== match.params.competencyEmployeeUid) {
    //   this.props.handleOnLoadApi();
    // }
  },
  componentWillUpdate(nextProps: HrCompetencyEmployeeDetailProps) {
    const { response: thisResponse } = this.props.hrCompetencyEmployeeState.detail; 
    const { response: nextResponse } = nextProps.hrCompetencyEmployeeState.detail;
    const { response, request } = this.props.hrCompetencyMappedState.list;

    if (thisResponse !== nextResponse) {
      if (nextResponse && nextResponse.data) {
        if (!response || request && request.filter && request.filter.positionUid !== nextResponse.data.positionUid) {
          this.props.hrCompetencyMappedDispatch.loadListRequest({
            filter: {
              positionUid: nextResponse.data.positionUid
            }
          });
        }
      }
    }
  },
  componentDidUpdate(prevProps: HrCompetencyEmployeeDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.competencyEmployeeUid !== prevProps.match.params.competencyEmployeeUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.hrCompetencyEmployeeState.detail.response !== prevProps.hrCompetencyEmployeeState.detail.response) {
      const { isLoading, response } = this.props.hrCompetencyEmployeeState.detail;

      let isDraft: boolean = true;
      let isExpired: boolean = false;

      if (response && response.data) {
        isDraft = response.data.isDraft;
        isExpired = response.data.isExpired;
      }

      const options: IPopupMenuOption[] = [
        {
          id: IHrCompetencyEmployeeUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: IHrCompetencyEmployeeUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: isDraft && !isExpired,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const HrCompetencyEmployeeDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withHrCompetencyEmployee,
  withHrCompetencyMapped,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles),
  setDisplayName('HrCompetencyEmployeeDetail')
)(HrCompetencyEmployeeDetailView);