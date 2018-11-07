import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  ISettlementItemPostPayload,
  ISettlementItemPutPayload,
  ISettlementPostPayload,
  ISettlementPutPayload
} from '@purchase/classes/request/purchaseSettlement';
import { ISettlement, 
  // ISettlementDetail 
} from '@purchase/classes/response/purchaseSettlement';
import {
  PurchaseSettlementFormData, 
  // PurchaseSettlementItemFormData,
} from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementForm';
import { PurchaseSettlementEditorView } from '@purchase/components/purchaseSettlement/editor/PurchaseSettlementEditorView';
import { WithPurchaseSettlement, withPurchaseSettlement } from '@purchase/hoc/purchaseSettlement/withPurchaseSettlement';
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
  handleValidate: (payload: PurchaseSettlementFormData) => FormErrors;
  handleSubmit: (payload: PurchaseSettlementFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  purchaseUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  purchaseUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type PurchaseSettlementEditorProps
  = WithPurchaseSettlement
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<PurchaseSettlementEditorProps, OwnState> = (props: PurchaseSettlementEditorProps): OwnState => {
  const { history } = props;

  const state = history.location.state;

  return {
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
  })
};

const handlers: HandleCreators<PurchaseSettlementEditorProps, OwnHandlers> = {
  // handleEventListener: (props: PurchaseSettlementEditorProps) => (event: CustomEvent) => {
  //   const formValues = event.detail as PurchaseSettlementEditorProps;

  //   let requestValue: number = 0;

  //   if (formValues.items) {
  //     formValues.items.items.forEach(items => requestValue += items.request);
  //   }
  // },
  handleValidate: (props: PurchaseSettlementEditorProps) => (formData: PurchaseSettlementFormData) => {
    const errors = {
      information: {},
      items: {
        items: []
      }
    };

    const requiredFields = [
      'settlementDate',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({ id: `purchase.field.information.${field}.required` });
      }
    });

    return errors;
  },
  handleSubmit: (props: PurchaseSettlementEditorProps) => (formData: PurchaseSettlementFormData) => {
    const { formMode, purchaseUid, intl } = props;
    const { user } = props.userState;
    // const { response } = props.purchaseSettlementState.detail;
    const { createRequest, updateRequest } = props.purchaseSettlementDispatch;

    if (!user) {
      return Promise.reject('item was not found');
    }

    const parsedItems = () => {
      if (!formData.items) {
        return null;
      }

      const _items: ISettlementItemPostPayload[] = [];
      
      if (formMode === FormMode.New)  {
        formData.items.items.forEach(item =>
          _items.push({
            uid: item.uid,
            amount: item.amount
              })
            );
      }

      return _items;
    };

    const parsedItemsPut = () => {
      if (!formData.items) {
        return null;
      }
      
      const _itemsPut: ISettlementItemPutPayload[] = [];

      if (formMode === FormMode.Edit) {
        formData.items.items.forEach(item =>
          _itemsPut.push({
            uid: item.uid,
            amount: item.amount
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
      
    if (!purchaseUid) {
      const message = intl.formatMessage(purchaseRequestMessage.emptyPurchaseUid);

      return Promise.reject(message);
    }
    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          purchaseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as ISettlementPostPayload
        });
      });
    }

    // update checking

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          purchaseUid,
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payloadPut as ISettlementPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: PurchaseSettlementEditorProps) => (response: ISettlement) => {
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

    history.push('/purchase/request/list');
  },
  handleSubmitFail: (props: PurchaseSettlementEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

const lifecycles: ReactLifeCycleFunctions<PurchaseSettlementEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.purchaseSettlementDispatch;
    const { user } = this.props.userState;

    const purchase = {
      title: 'purchase.form.purchaseSettlement.newTitle',
      subTitle: 'purchase.form.purchaseSettlement.newSubTitle',
    };

    if (!user) {
      return;
    }

    stateUpdate({
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    if (!isNullOrUndefined(history.location.state)) {
      purchase.title = 'purchase.form.purchaseSettlement.editTitle';
      purchase.subTitle = 'purchase.form.purchaseSettlement.editSubTitle';

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
      uid: AppMenu.PurchaseSettlementRequest,
      parentUid: AppMenu.Purchase,
      title: intl.formatMessage({ id: purchase.title }),
      subTitle: intl.formatMessage({ id: purchase.subTitle })
    });

    layoutDispatch.navBackShow();
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, purchaseSettlementDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    purchaseSettlementDispatch.createDispose();
    purchaseSettlementDispatch.updateDispose();
  }
};

export const PurchaseSettlementEditor = compose<PurchaseSettlementEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withPurchaseSettlement,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseSettlementEditorProps, OwnHandlers>(handlers),
  lifecycle<PurchaseSettlementEditorProps, {}>(lifecycles),
)(PurchaseSettlementEditorView);