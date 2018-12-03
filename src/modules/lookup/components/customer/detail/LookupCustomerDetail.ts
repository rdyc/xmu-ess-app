import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupCustomerUserAction } from '@lookup/classes/types/customer/LookupCustomerUserAction';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupCustomerDetailView } from './LookupCustomerDetailView';

interface OwnRouteParams {
  customerUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: LookupCustomerUserAction;
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

export type LookupCustomerDetailProps
  = WithUser
  & WithLookupCustomer
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LookupCustomerDetailProps, OwnState> = (props: LookupCustomerDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<LookupCustomerDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: LookupCustomerDetailProps) => (): Partial<OwnState> => ({
    action: LookupCustomerUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.company.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.company.confirm.modifyDescription),
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

const handlerCreators: HandleCreators<LookupCustomerDetailProps, OwnHandler> = {
  handleOnModify: (props: LookupCustomerDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: LookupCustomerDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: LookupCustomerDetailProps) => () => {
    const { response } = props.lookupCustomerState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let customerUid: string | undefined;

    // get project uid
    if (response.data) {
      customerUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupCustomerUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupCustomerUserAction.Modify:
          next = '/lookup/customer/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: customerUid 
      });
    }
  },
};

export const LookupCustomerDetail = compose(
  withRouter,
  withUser,
  withLookupCustomer,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(LookupCustomerDetailView);