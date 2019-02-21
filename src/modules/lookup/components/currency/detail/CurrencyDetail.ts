import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCurrencyDeletePayload } from '@lookup/classes/request/currency';
import { CurrencyUserAction } from '@lookup/classes/types';
import { CurrencyDetailView } from '@lookup/components/currency/detail/CurrencyDetailView';
import { WithLookupCurrency, withLookupCurrency } from '@lookup/hoc/withLookupCurrency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
// import { currencyMessage } from '@lookup/locales/messages/currency/currencyMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';

interface OwnRouteParams {
  currencyUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnDelete: () => void;
}

interface OwnState {
  pageOptions?: IAppBarMenu[];
  action?: CurrencyUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
  setDelete: StateHandler<OwnState>;
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
  setOptions: (prevState: OwnState, props: CurrencyDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
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
  handleOnLoadApi: (props: CurrencyDetailProps) => () => {
    if (props.userState.user && props.match.params.currencyUid && !props.lookupCurrencyState.detail.isLoading) {
      props.lookupCurrencyDispatch.loadDetailRequest({
        currencyUid: props.match.params.currencyUid
      });
    }
  },  
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
          next = '/lookup/currencies/form';
          break;
          
        default:
          break;
      }

      props.setDefault();
      
      props.history.push(next, { uid: currencyUid });
    }
  },

  handleSubmit: (props: CurrencyDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupCurrencyDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.currencyUid) {
      const message = intl.formatMessage(lookupMessage.currency.message.emptyCurrencyUid);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.currencyUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupCurrencyDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: CurrencyDetailProps) => (response: boolean) => {
    props.history.push('/lookup/currencies/');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.currency.message.deleteSuccess, { uid: props.match.params.currencyUid })
    });
  },
  handleSubmitFail: (props: CurrencyDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.currency.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<CurrencyDetailProps, OwnState> = {
  componentDidUpdate(prevProps: CurrencyDetailProps) {
    // handle updated route params
    if (this.props.match.params.currencyUid !== prevProps.match.params.currencyUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupCurrencyState.detail.response !== prevProps.lookupCurrencyState.detail.response) {
      const { isLoading } = this.props.lookupCurrencyState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {              
          id: CurrencyUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: CurrencyUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnModify
        },
        {
          id: CurrencyUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnModify
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const CurrencyDetail = compose(
  withUser,
  withLayout,
  withRouter,
  withLookupCurrency,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(CurrencyDetailView);