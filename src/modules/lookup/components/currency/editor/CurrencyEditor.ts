import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCurrencyPostPayload, ILookupCurrencyPutPayload } from '@lookup/classes/request/currency';
import { ICurrency } from '@lookup/classes/response';
import { WithLookupCurrency, withLookupCurrency } from '@lookup/hoc/withLookupCurrency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { CurrencyEditorView } from './CurrencyEditorView';
import { CurrencyFormData } from './CurrencyForm';

interface OwnHandlers {
  handleValidate: (payload: CurrencyFormData) => FormErrors;
  handleSubmit: (payload: CurrencyFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}
interface OwnRouteParams {
  currencyUid: string;
}

interface OwnState {
  formMode: FormMode;
  currencyUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type CurrencyEditorProps
  = WithLookupCurrency
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<CurrencyEditorProps, OwnState> = (props: CurrencyEditorProps): OwnState => {
  const { history } = props;

  const state = history.location.state;

  return {
    formMode: state ? FormMode.Edit : FormMode.New,
    currencyUid: state ? state.currencyUid : undefined,
    submitDialogTitle: props.intl.formatMessage(lookupMessage.currency.dialog.createTitle),
    submitDialogContentText: props.intl.formatMessage(lookupMessage.currency.dialog.createDescription),
    submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
    submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),

  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<CurrencyEditorProps, OwnHandlers> = {
  handleValidate: (props: CurrencyEditorProps) => (formData: CurrencyFormData) => {
    const errors = {
      information: {}
    };
    const requiredFields = [
      'name', 'symbol', 'rate',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(lookupMessage.currency.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: CurrencyEditorProps) => (formData: CurrencyFormData) => {
    const { formMode, currencyUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.lookupCurrencyDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          data: payload as ILookupCurrencyPostPayload,
        });
      });
    }

    // update checking
    if (!currencyUid) {
      const message = props.intl.formatMessage(lookupMessage.currency.message.emptyCurrencyUid);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve,
          reject,
          currencyUid: payload.uid || currencyUid,
          data: payload as ILookupCurrencyPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: CurrencyEditorProps) => (response: ICurrency) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.currency.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(lookupMessage.currency.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/currencies/${response.uid}`);
  },
  handleSubmitFail: (props: CurrencyEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (formMode === FormMode.New) {
        message = intl.formatMessage(lookupMessage.currency.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.currency.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<CurrencyEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.lookupCurrencyDispatch;
    const { user } = this.props.userState;

    const view = {
      title: lookupMessage.currency.form.newTitle,
      subTitle: lookupMessage.currency.form.newSubTitle,
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {

        view.title = lookupMessage.currency.form.editTitle,
        view.subTitle = lookupMessage.currency.form.editSubTitle,

        stateUpdate({
          formMode: FormMode.Edit,
          currencyUid: history.location.state.uid
        });

        loadDetailRequest({
          currencyUid: history.location.state.uid
        });
      
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupCurrency,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/currencies/',
      title: intl.formatMessage(view.title),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage, lookupCurrencyDispatch } = this.props;

    masterPage.resetPage();

    lookupCurrencyDispatch.createDispose();
    lookupCurrencyDispatch.updateDispose();
  }
};

export const CurrencyEditor = compose<CurrencyEditorProps, {}>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withLookupCurrency,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<CurrencyEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<CurrencyEditorProps, {}>(lifecycles),
)(CurrencyEditorView);