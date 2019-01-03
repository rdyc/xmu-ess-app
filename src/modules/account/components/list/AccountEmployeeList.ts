import { AccountEmployeeUserAction } from '@account/classes/types';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeListView } from './AccountEmployeeListView';

interface OwnHandler {
  handleOnCreate: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  action?: AccountEmployeeUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setCreate: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type AccountEmployeeListProps
  = WithUser
  & OwnState
  & OwnStateUpdaters
  & OwnHandler
  & RouteComponentProps
  & InjectedIntlProps
  & WithAccountEmployee;

const createProps: mapper<AccountEmployeeListProps, OwnState> = (): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<AccountEmployeeListProps, OwnState, OwnStateUpdaters> = {
  setCreate: (prevState: OwnState, props: AccountEmployeeListProps) => (): Partial<OwnState> => ({
    action: AccountEmployeeUserAction.Create,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.employee.confirm.createTitle), 
    dialogContent: props.intl.formatMessage(accountMessage.employee.confirm.createDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.cancel),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.ok)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<AccountEmployeeListProps, OwnHandler> = {
  handleOnCreate: (props: AccountEmployeeListProps) => () => { 
    props.setCreate();
  },
  handleOnCloseDialog: (props: AccountEmployeeListProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: AccountEmployeeListProps) => () => { 
    props.history.push('employee/form');
  },
};

export const AccountEmployeeList = compose(
  withRouter,
  withUser,
  injectIntl,
  withAccountEmployee,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(AccountEmployeeListView);