import { AppRole } from '@constants/AppRole';
import { IHrCompetencyAssessmentUserAction } from '@hr/classes/types';
import { WithHrCompetencyAssessment, withHrCompetencyAssessment } from '@hr/hoc/withHrCompetencyAssessment';
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

import { HrCompetencyAssessmentDetailView } from './HrCompetencyAssessmentDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  assessmentUid: string;
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
  action?: IHrCompetencyAssessmentUserAction;
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

export type HrCompetencyAssessmentDetailProps
  = WithOidc
  & WithUser
  & WithHrCompetencyAssessment
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCompetencyAssessmentDetailProps, IOwnState> = (props: HrCompetencyAssessmentDetailProps): IOwnState => { 
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

const stateUpdaters: StateUpdaters<HrCompetencyAssessmentDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyAssessmentDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyAssessmentDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCompetencyAssessmentDetailProps) => (): Partial<IOwnState> => ({
    action: IHrCompetencyAssessmentUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Assessment'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'assessment'}),
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

const handlerCreators: HandleCreators<HrCompetencyAssessmentDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyAssessmentDetailProps) => () => { 
    const { user } = props.userState;
    const assessmentUid = props.match.params.assessmentUid;
    const { isLoading } = props.hrCompetencyAssessmentState.detail;

    if (user && assessmentUid && !isLoading) {
      props.hrCompetencyAssessmentDispatch.loadDetailRequest({
        assessmentUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyAssessmentDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IHrCompetencyAssessmentUserAction.Refresh:
        props.setShouldLoad();
        break;

      case IHrCompetencyAssessmentUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: HrCompetencyAssessmentDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCompetencyAssessmentDetailProps) => () => {
    const { response } = props.hrCompetencyAssessmentState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let assessmentUid: string | undefined;

    // get project uid
    if (response.data) {
      assessmentUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      IHrCompetencyAssessmentUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case IHrCompetencyAssessmentUserAction.Modify:
          next = `/hr/assessment/form`;
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: assessmentUid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyAssessmentDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyAssessmentDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.assessmentUid !== prevProps.match.params.assessmentUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.hrCompetencyAssessmentState.detail.response !== prevProps.hrCompetencyAssessmentState.detail.response) {
      const { isLoading } = this.props.hrCompetencyAssessmentState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: IHrCompetencyAssessmentUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: IHrCompetencyAssessmentUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const HrCompetencyAssessmentDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withHrCompetencyAssessment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('HrCompetencyAssessmentDetail')
)(HrCompetencyAssessmentDetailView);