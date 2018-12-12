import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCurrencyDeletePayload } from '@lookup/classes/request/currency';
import { CurrencyUserAction } from '@lookup/classes/types';
import { CurrencyDetailView } from '@lookup/components/currency/detail/CurrencyDetailView';
import { WithLookupCurrency, withLookupCurrency } from '@lookup/hoc/currency/withLookupCurrency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
// import { currencyMessage } from '@lookup/locales/messages/currency/currencyMessage';
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

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnDelete: () => void;
}

interface OwnState {
  action?: CurrencyUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDefault: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
  setDelete: StateHandler<OwnState>;
}

interface OwnRouteParams {
  currencyUid: string;
}

export type CurrencyDetailProps
  = WithLookupCurrency
  & WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<CurrencyDetailProps, OwnState> = (props: CurrencyDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<CurrencyDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: CurrencyDetailProps) => (): Partial<OwnState> => ({
    action: CurrencyUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.currency.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.currency.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDelete: (prevState: OwnState, props: CurrencyDetailProps) => (): Partial<OwnState> => ({
    action: CurrencyUserAction.Delete,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.currency.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.currency.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<CurrencyDetailProps, OwnHandler> = {
  handleOnModify: (props: CurrencyDetailProps) => () => {
    props.setModify();
  },
  handleOnDelete: (props: CurrencyDetailProps) => () => {
    props.setDelete();
  },
  handleOnCloseDialog: (props: CurrencyDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: CurrencyDetailProps) => () => {
    const { response } = props.lookupCurrencyState.detail;
    const { deleteRequest } = props.lookupCurrencyDispatch;
    const { alertAdd } = props.layoutDispatch;

    let currencyUid: string | undefined;

    if (!props.action || !response) {
      return;
    }

    if (response.data) {
      currencyUid = response.data.uid;
    }

    const actions = [
      CurrencyUserAction.Modify,
      CurrencyUserAction.Delete
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';
      let deleteAction: boolean = false;

      switch (props.action) {
        case CurrencyUserAction.Modify:
          next = '/lookup/currency/form';
          break;
        
        case CurrencyUserAction.Delete:
          deleteAction = true;
          next = `/lookup/currency`;
          break;
          
        default:
          break;
      }

      props.setDefault();
      if (deleteAction) {
        deleteRequest({
          reject: Promise.reject,
          resolve: Promise.resolve,
          data: {uid: currencyUid} as ILookupCurrencyDeletePayload
        });

        alertAdd({
          message: props.intl.formatMessage(lookupMessage.currency.message.deleteSuccess),
          time: new Date(),
        });
        props.history.push(next);
      } else {
        props.history.push(next, { uid: currencyUid });
      }
    }
  },
};

export const CurrencyDetail = compose(
  withUser,
  withLayout,
  withRouter,
  withLookupCurrency,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(CurrencyDetailView);