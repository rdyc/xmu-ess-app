import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
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

import { WorkflowStatusType } from '@common/classes/types';
import { AppRole } from '@constants/AppRole';
import { ExpenseUserAction } from '@expense/classes/types';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { IAppBarMenu } from '@layout/interfaces/IAppBarState';
import { ExpenseRequestDetailView } from './ExpenseRequestDetailView';

interface IOwnRouteParams {
  expenseUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  isAdmin: boolean;
  action?: ExpenseUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
  shouldLoad: boolean;
  menuOptions?: IPopupMenuOption[];
}

interface OwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
}

export type ExpenseRequestDetailProps 
  = WithUser
  & WithOidc
  & WithExpenseRequest
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & OwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<ExpenseRequestDetailProps, IOwnState> = (props: ExpenseRequestDetailProps): IOwnState => { 
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
  
  return ({
    isAdmin,
    shouldLoad: false,
    dialogFullScreen: false,
    dialogOpen: false,
  });
};

const stateUpdaters: StateUpdaters<ExpenseRequestDetailProps, IOwnState, OwnStateUpdaters> = {
  setModify: (prevState: IOwnState, props: ExpenseRequestDetailProps) => (): Partial<IOwnState> => ({
    action: ExpenseUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(expenseMessage.request.dialog.modifyTitle), 
    dialogContent: props.intl.formatMessage(expenseMessage.request.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  }),
  setOptions: (prevState: IOwnState, props: ExpenseRequestDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: ExpenseRequestDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
};

const handlerCreators: HandleCreators<ExpenseRequestDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: ExpenseRequestDetailProps) => () => { 
    if (props.userState.user && props.match.params.expenseUid && !props.expenseRequestState.detail.isLoading) {
      props.expenseRequestDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        expenseUid: props.match.params.expenseUid
      });
    }
  },
  handleOnSelectedMenu: (props: ExpenseRequestDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case ExpenseUserAction.Refresh:
        props.setShouldLoad();
        break;
      case ExpenseUserAction.Modify:
        props.setModify();
        break;
    
      default:
        break;
    }
  },
  handleOnModify: (props: ExpenseRequestDetailProps) => () => { 
    props.setModify();
  },
  handleOnCloseDialog: (props: ExpenseRequestDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: ExpenseRequestDetailProps) => () => { 
    const { response } = props.expenseRequestState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let expenseUid: string | undefined;

    // get expense uid
    if (response.data) {
      expenseUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      ExpenseUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case ExpenseUserAction.Modify:
          next = '/expense/requests/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: expenseUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ExpenseRequestDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: ExpenseRequestDetailProps) {
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    if (this.props.match.params.expenseUid !== prevProps.match.params.expenseUid) {
      this.props.handleOnLoadApi();
    }

    if (this.props.expenseRequestState.detail.response !== prevProps.expenseRequestState.detail.response) {
      const { isLoading, response } = this.props.expenseRequestState.detail;

      // find status type
      let _statusType: string | undefined = undefined;

      if (response && response.data) {
        _statusType = response.data.statusType;
      }

      // checking status types
      const isContains = (statusType: string | undefined, statusTypes: string[]): boolean => { 
        return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
      };

      const options: IAppBarMenu[] = [
        {
          id: ExpenseUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi,
        },
        {
          id: ExpenseUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: _statusType !== undefined,
          visible: isContains(_statusType, [ WorkflowStatusType.Submitted, WorkflowStatusType.InProgress ]),
          onClick: this.props.handleOnModify
        }
      ];

      this.props.setOptions(options);
    }
  },
};

export const ExpenseRequestDetail = compose(
  setDisplayName('ExpenseRequestDetail'),
  withRouter,
  withOidc,
  withUser,
  withExpenseRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ExpenseRequestDetailView);