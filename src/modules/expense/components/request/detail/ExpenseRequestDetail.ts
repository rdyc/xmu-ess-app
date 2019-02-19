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
import { ExpenseUserAction } from '@expense/classes/types';
import { IAppBarMenu } from '@layout/interfaces/IAppBarState';
import { ExpenseRequestDetailView } from './ExpenseRequestDetailView';

interface OwnRouteParams {
  expenseUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: ExpenseUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
  pageOptions?: IAppBarMenu[];
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
  setOptions: StateHandler<OwnState>;
}

export type ExpenseRequestDetailProps 
  = WithUser
  & WithExpenseRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<ExpenseRequestDetailProps, OwnState> = (props: ExpenseRequestDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<ExpenseRequestDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: ExpenseRequestDetailProps) => (): Partial<OwnState> => ({
    action: ExpenseUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(expenseMessage.request.dialog.modifyTitle), 
    dialogContent: props.intl.formatMessage(expenseMessage.request.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  }),
  setOptions: (prevState: OwnState, props: ExpenseRequestDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<ExpenseRequestDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: ExpenseRequestDetailProps) => () => { 
    if (props.userState.user && props.match.params.expenseUid && !props.expenseRequestState.detail.isLoading) {
      props.expenseRequestDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        expenseUid: props.match.params.expenseUid
      });
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

const lifecycles: ReactLifeCycleFunctions<ExpenseRequestDetailProps, OwnState> = {
  componentDidUpdate(prevProps: ExpenseRequestDetailProps) {
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
  withUser,
  withExpenseRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  lifecycle(lifecycles),
  withHandlers(handlerCreators),
)(ExpenseRequestDetailView);