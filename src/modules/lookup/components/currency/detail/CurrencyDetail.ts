import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { CurrencyUserAction } from '@lookup/classes/types';
import { CurrencyDetailView } from '@lookup/components/currency/detail/CurrencyDetailView';
import { WithLookupCurrency, withLookupCurrency } from '@lookup/hoc/currency/withLookupCurrency';
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
}

interface OwnRouteParams {
  currencyUid: string;
}

export type CurrencyDetailProps
  = WithLookupCurrency
  & WithUser
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
    // dialogTitle: props.intl.formatMessage(currencyMessage.confirm.modifyTitle),
    // dialogContent: props.intl.formatMessage(currencyMessage.confirm.modifyDescription),
    dialogTitle: 'Modify?',
    dialogContent: 'Modify content.',
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
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
  handleOnCloseDialog: (props: CurrencyDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: CurrencyDetailProps) => () => {
    const { response } = props.lookupCurrencyState.detail;

    let currencyUid: string | undefined;

    if (!props.action || !response) {
      return;
    }

    if (response.data) {
      currencyUid = response.data.uid;
    }

    const actions = [
      CurrencyUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case CurrencyUserAction.Modify:
          next = '/lookup/currency/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { uid: currencyUid });
    }
  },
};

export const CurrencyDetail = compose(
  withUser,
  withRouter,
  withLookupCurrency,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(CurrencyDetailView);