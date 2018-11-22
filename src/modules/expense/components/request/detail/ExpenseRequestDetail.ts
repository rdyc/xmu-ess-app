import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseMessages } from '@expense/locales/messages/expenseMessages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
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

import { ExpenseUserAction } from '@expense/classes/types';
import { ExpenseRequestDetailView } from './ExpenseRequestDetailView';

interface OwnRouteParams {
  expenseUid: string;
}

interface OwnHandler {
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
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
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
    dialogTitle: props.intl.formatMessage(expenseMessages.request.dialog.modifyTitle), 
    dialogContent: props.intl.formatMessage(expenseMessages.request.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
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

const handlerCreators: HandleCreators<ExpenseRequestDetailProps, OwnHandler> = {
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

export const ExpenseRequestDetail = compose(
  withRouter,
  withUser,
  withExpenseRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(ExpenseRequestDetailView);