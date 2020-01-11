import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCurrencyDeletePayload } from '@lookup/classes/request/currency';
import { CurrencyUserAction } from '@lookup/classes/types';
import { CurrencyDetailView } from '@lookup/components/currency/detail/CurrencyDetailView';
import { WithLookupCurrency, withLookupCurrency } from '@lookup/hoc/withLookupCurrency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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

interface IOwnRouteParams {
  currencyUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: CurrencyUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type CurrencyDetailProps
  = WithLookupCurrency
  & WithUser
  & WithOidc
  & WithLayout
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<CurrencyDetailProps, IOwnState> = (props: CurrencyDetailProps): IOwnState => {
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
    dialogOpen: false,
  };
};

const stateUpdaters: StateUpdaters<CurrencyDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: CurrencyDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: CurrencyDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: CurrencyDetailProps) => (): Partial<IOwnState> => ({
    action: CurrencyUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.currency.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.currency.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  }),
  setDelete: (prevState: IOwnState, props: CurrencyDetailProps) => (): Partial<IOwnState> => ({
    action: CurrencyUserAction.Delete,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.currency.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.currency.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<CurrencyDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: CurrencyDetailProps) => () => {
    if (props.userState.user && props.match.params.currencyUid && !props.lookupCurrencyState.detail.isLoading) {
      props.lookupCurrencyDispatch.loadDetailRequest({
        currencyUid: props.match.params.currencyUid
      });
    }
  },
  handleOnSelectedMenu: (props: CurrencyDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case CurrencyUserAction.Refresh:
        props.setShouldLoad();
        break;
      case CurrencyUserAction.Modify:
        props.setModify();        
        break;
      case CurrencyUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
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
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.currency.message.deleteFailure),
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<CurrencyDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: CurrencyDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.currencyUid !== prevProps.match.params.currencyUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupCurrencyState.detail.response !== prevProps.lookupCurrencyState.detail.response) {
      const { isLoading } = this.props.lookupCurrencyState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {              
          id: CurrencyUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: CurrencyUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: CurrencyUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: !isLoading,
          visible: true,
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const CurrencyDetail = compose(
  withUser,
  withOidc,
  withLayout,
  withRouter,
  withLookupCurrency,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(CurrencyDetailView);