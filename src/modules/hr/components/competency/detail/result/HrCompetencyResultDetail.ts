import { AppRole } from '@constants/AppRole';
import { IHrCompetencyEmployeeUserAction } from '@hr/classes/types';
import { withHrCompetencyEmployee, WithHrCompetencyEmployee } from '@hr/hoc/withHrCompetencyEmployee';
import { withHrCompetencyMapped, WithHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { WithHrCompetencyResult, withHrCompetencyResult } from '@hr/hoc/withHrCompetencyResult';
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
import { isNullOrUndefined } from 'util';

import { HrCompetencyResultDetailView } from './HrCompetencyResultDetailView';

interface IOwnRouteParams {
  competencyEmployeeUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnLoadResult: () => void;
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

export type HrCompetencyResultDetailProps
  = WithOidc
  & WithUser
  & WithHrCompetencyResult
  & WithHrCompetencyEmployee
  & WithHrCompetencyMapped
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCompetencyResultDetailProps, IOwnState> = (props: HrCompetencyResultDetailProps): IOwnState => { 
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

const stateUpdaters: StateUpdaters<HrCompetencyResultDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyResultDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyResultDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCompetencyResultDetailProps) => (): Partial<IOwnState> => ({
    action: IHrCompetencyEmployeeUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Assessment resut'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'assessment result'}),
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

const handlerCreators: HandleCreators<HrCompetencyResultDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyResultDetailProps) => () => { 
    if (!isNullOrUndefined(props.history.location.state)) {
      const { user } = props.userState;
      const competencyEmployeeUid = props.match.params.competencyEmployeeUid;
      const { isLoading } = props.hrCompetencyEmployeeState.detail;
  
      if (user && competencyEmployeeUid && !isLoading) {
        props.hrCompetencyEmployeeDispatch.loadDetailRequest({
          competencyEmployeeUid
        });
      }

      const positionUid = props.history.location.state.positionUid;
      const respondenUid = props.history.location.state.respondenUid;
      const { isLoading: resultLoading } = props.hrCompetencyResultState.detailList;
    
      if (user && positionUid && respondenUid && !resultLoading) {
        props.hrCompetencyResultDispatch.loadDetailListRequest({
          positionUid,
          respondenUid
        });
      }

      props.hrCompetencyMappedDispatch.loadListRequest({
        filter: {
          positionUid
        }
      });
    }
  },
  handleOnLoadResult: (props: HrCompetencyResultDetailProps) => () => { 
    const { user } = props.userState;
    if (!isNullOrUndefined(props.history.location.state)) {
      const positionUid = props.history.location.state.positionUid;
      const respondenUid = props.history.location.state.respondenUid;
      const { isLoading } = props.hrCompetencyResultState.detailList;
    
      if (user && positionUid && respondenUid && !isLoading) {
        props.hrCompetencyResultDispatch.loadDetailListRequest({
          positionUid,
          respondenUid
        });
      }
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyResultDetailProps) => (item: IPopupMenuOption) => {
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
  handleOnCloseDialog: (props: HrCompetencyResultDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCompetencyResultDetailProps) => () => {
    const { response } = props.hrCompetencyEmployeeState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let competencyEmployeeUid: string | undefined;
    let positionUid: string | undefined;
    let respondenUid: string | undefined;

    // get project uid
    if (response.data) {
      competencyEmployeeUid = response.data.uid;
    }

    if (props.history.location.state) {
      positionUid = props.history.location.state.positionUid;
      respondenUid = props.history.location.state.respondenUid;
    }

    // actions with new page
    const actions = [
      IHrCompetencyEmployeeUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case IHrCompetencyEmployeeUserAction.Modify:
          next = '/hr/assessmentresult/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        positionUid,
        respondenUid,
        uid: competencyEmployeeUid,
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyResultDetailProps, IOwnState> = {
  componentDidMount() {
    // 
  },
  componentDidUpdate(prevProps: HrCompetencyResultDetailProps) {
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

      if (response && response.data) {
        isDraft = response.data.isDraft;
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
          enabled: isDraft,
          visible: isDraft,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const HrCompetencyResultDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withHrCompetencyEmployee,
  withHrCompetencyResult,
  withHrCompetencyMapped,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles),
  setDisplayName('HrCompetencyResultDetail')
)(HrCompetencyResultDetailView);