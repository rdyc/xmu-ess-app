import { AccountEmployeeUserAction } from '@account/classes/types';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeDetailView } from './AccountEmployeeDetailView';

interface OwnRouteParams {
  employeeUid: string;
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

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type AccountEmployeeDetailProps
  = OwnState
  & OwnHandler
  & OwnStateUpdaters
  & RouteComponentProps<OwnRouteParams>
  & WithUser
  & WithAccountEmployee
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeDetailProps, OwnState> = (): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<AccountEmployeeDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setModify: (prevState: OwnState, props: AccountEmployeeDetailProps) => (): Partial<OwnState> => ({
    action: AccountEmployeeUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.employee.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(accountMessage.employee.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
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

const handlerCreators: HandleCreators<AccountEmployeeDetailProps, OwnHandler> = {
  handleOnModify: (props: AccountEmployeeDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: AccountEmployeeDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: AccountEmployeeDetailProps) => () => {
    const { response } = props.accountEmployeeState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;

    // get project uid
    if (response.data) {
      employeeUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      AccountEmployeeUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case AccountEmployeeUserAction.Modify:
          next = '/account/employee/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: employeeUid 
      });
    }
  },
};

export const AccountEmployeeDetail = compose<AccountEmployeeDetailProps, {}>(
  withRouter,
  withUser,
  withAccountEmployee,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeDetailProps, OwnHandler>(handlerCreators)
)(AccountEmployeeDetailView);