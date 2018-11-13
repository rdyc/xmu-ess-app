import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  IPurchaseItemPostPayload,
  IPurchaseItemPutPayload,
  IPurchasePostPayload,
  IPurchasePutPayload
} from '@purchase/classes/request/purchaseRequest';
import { IPurchase, 
} from '@purchase/classes/response/purchaseRequest';
import {
  PurchaseRequestFormData,
} from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestForm';
import { PurchaseRequestEditorView } from '@purchase/components/purchaseRequest/editor/PurchaseRequestEditorView';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
import { purchaseRequestMessage } from '@purchase/locales/messages/purchaseRequestMessage';
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
import { isNullOrUndefined, isObject } from 'util';

interface OwnHandlers {
  // handleEventListener: (event: CustomEvent) => void;
  handleValidate: (payload: PurchaseRequestFormData) => FormErrors;
  handleSubmit: (payload: PurchaseRequestFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  purchaseUid: string;
}

interface OwnState {
  // setState: PurchaseRequestFormData | undefined;
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  purchaseUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  // setTotalRequest: StateHandler<OwnState>;
}

export type PurchaseRequestEditorProps
  = WithPurchaseRequest
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<PurchaseRequestEditorProps, OwnState> = (props: PurchaseRequestEditorProps): OwnState => {
  const { history } = props;

  const state = history.location.state;

  return {
    // setState: state ? '' : undefined;
    formMode: state ? FormMode.Edit : FormMode.New,
    companyUid: state ? state.companyUid : undefined,
    positionUid: state ? state.positionUid : undefined,
    purchaseUid: state ? state.purchaseUid : undefined
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  // setTotalRequest: (prevState: OwnState) => (request: any) => ({
  //   ...prevState,
  //   information: {
  //     ...prevState,
  //   }
  // }),
};

const handlers: HandleCreators<PurchaseRequestEditorProps, OwnHandlers> = {
  // handleEventListener: (props: PurchaseRequestEditorProps) => (event: CustomEvent) => {
  //   const formValues = event.detail as PurchaseRequestFormData;
  //   const { setTotalRequest } = props;

  //   let requestValue: number = 0;

  //   if (formValues.items) {
  //     formValues.items.items.forEach(item => requestValue += item.request);
  //   }

  //   setTotalRequest(requestValue);
  // },
  handleValidate: (props: PurchaseRequestEditorProps) => (formData: PurchaseRequestFormData) => {
    const errors = {
      information: {},
      items: {
        items: [{}]
      }
    };

    const requiredFields = [
      'customerUid', 'projectUid',
      'date', 'rate', 'currencyType'
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({ id: `purchase.field.information.${field}.required` });
      }
    });

    if (formData.items) {
      const requiredItemFields = ['description', 'request'];
      const itemErrors: any[] = [];

      formData.items.items.forEach((item, index) => {
        const itemError: any = {};

        if (!item) { return; }

        requiredItemFields.forEach(field => {
          if (!item[field] || isNullOrUndefined(item[field])) {
            Object.assign(itemError, { [`${field}`]: props.intl.formatMessage({ id: `travel.field.information.item.${field}.required` }) });
          }
        });

        itemErrors.push(itemError);
      });

      if (itemErrors.length) {
        Object.assign(errors, {
          items: itemErrors
        });
      }
    }

    return errors;
  },
  handleSubmit: (props: PurchaseRequestEditorProps) => (formData: PurchaseRequestFormData) => {
    const { formMode, purchaseUid, intl } = props;
    const { user } = props.userState;
    // const { response } = props.purchaseRequestState.detail;
    const { createRequest, updateRequest } = props.purchaseRequestDispatch;

    if (!user) {
      return Promise.reject('item was not found');
    }

    const parsedItems = () => {
      if (!formData.items) {
        return null;
      }

      // let _item: [] = [];
      const _items: IPurchaseItemPostPayload[] = [];
      
      if (formMode === FormMode.New)  {
        formData.items.items.forEach(item =>
          _items.push({
            description: item.description,
            request: item.request
              })
            );
      }

      return _items;
    };

    const parsedItemsPut = () => {
      if (!formData.items) {
        return null;
      }
      
      const _itemsPut: IPurchaseItemPutPayload[] = [];

      if (formMode === FormMode.Edit) {
        formData.items.items.forEach(item =>
          _itemsPut.push({
            uid: item.uid,
            description: item.description,
            request: item.request
          })
          );
        } 
        
      return _itemsPut;
    };

    const payload = {
      ...formData.information,
      items: parsedItems()
    };
    
    const payloadPut = {
      ...formData.information,
      items: parsedItemsPut()
      };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as IPurchasePostPayload
        });
      });
    }

    // update checking
    if (!purchaseUid) {
      const message = intl.formatMessage(purchaseRequestMessage.emptyPurchaseUid);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          purchaseUid,
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payloadPut as IPurchasePutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: PurchaseRequestEditorProps) => (response: IPurchase) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(purchaseRequestMessage.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(purchaseRequestMessage.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push('/purchase/requests/list');
  },
  handleSubmitFail: (props: PurchaseRequestEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(purchaseRequestMessage.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(purchaseRequestMessage.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<PurchaseRequestEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.purchaseRequestDispatch;
    const { user } = this.props.userState;

    const purchase = {
      title: 'purchase.form.purchaseRequest.newTitle',
      subTitle: 'purchase.form.purchaseRequest.newSubTitle',
    };

    if (!user) {
      return;
    }

    stateUpdate({
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    if (!isNullOrUndefined(history.location.state)) {
      purchase.title = 'purchase.form.purchaseRequest.editTitle';
      purchase.subTitle = 'purchase.form.purchaseRequest.editSubTitle';

      stateUpdate({
        formMode: FormMode.Edit,
        purchaseUid: history.location.state.uid
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        purchaseUid: history.location.state.uid
      });
      
    }

    layoutDispatch.changeView({
      uid: AppMenu.PurchaseRequest,
      parentUid: AppMenu.Purchase,
      title: intl.formatMessage({ id: purchase.title }),
      subTitle: intl.formatMessage({ id: purchase.subTitle })
    });

    layoutDispatch.navBackShow();
  },
  // componentDidUpdate() {
  //   this.props.setState(this.props.);
  // },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, purchaseRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    purchaseRequestDispatch.createDispose();
    purchaseRequestDispatch.updateDispose();
  }
};

export const PurchaseRequestEditor = compose<PurchaseRequestEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withPurchaseRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseRequestEditorProps, OwnHandlers>(handlers),
  lifecycle<PurchaseRequestEditorProps, {}>(lifecycles),
)(PurchaseRequestEditorView);