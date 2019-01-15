import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ITravelSettlementPostPayload, ITravelSettlementPutItem, ITravelSettlementPutPayload } from '@travel/classes/request/settlement';
import { ITravelRequest } from '@travel/classes/response';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { WithTravelSettlement, withTravelSettlement } from '@travel/hoc/withTravelSettlement';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { TravelSettlementFormData } from './forms/TravelSettlementForm';
import { travelSettlementEditorView } from './TravelSettlementEditorView';

interface OwnHandlers {
  handleValidate: (payload: TravelSettlementFormData) => any;
  handleSubmit: (payload: TravelSettlementFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  travelSettlementUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  travelSettlementUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type TravelSettlementEditorProps
  = WithTravelSettlement
  & WithTravelRequest
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<TravelSettlementEditorProps, OwnHandlers> = {
  handleValidate: (props: TravelSettlementEditorProps) => (formData: TravelSettlementFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'projectUid', 'destinationType', 'activityType',
      'start', 'end',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({ id: `travel.field.information.${field}.required` });
      }
    });

    if (formData.item) {
      const requiredItemFields = ['employeeUid', 'transportType'];

      const itemErrors: any[] = [];

      formData.item.items.forEach((item, index) => {
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
  handleSubmit: (props: TravelSettlementEditorProps) => (formData: TravelSettlementFormData) => {
    const { formMode, travelSettlementUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.travelSettlementDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const parsedItems = () => {
      if (!formData.item) {
        return null;
      }

      const _items: ITravelSettlementPutItem[] = [];

      formData.item.items.forEach(item =>
        _items.push({
          uid: item.uid,
          employeeUid: item.employeeUid,
          isRoundTrip: item.isRoundTrip,
          transportType: item.transportType,
          from: item.from,
          departureDate: item.departureDate,
          destination: item.destination,
          returnDate: item.returnDate,
          costTransport: item.costTransport,
          isTransportByCompany: item.isTransportByCompany,
          hotel: item.hotel,
          costHotel: item.costHotel,
          isHotelByCompany: item.isHotelByCompany,
          notes: item.notes
        })
      );

      return _items;
    };

    const payload = {
      ...formData.information,
      items: parsedItems(),
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as ITravelSettlementPostPayload
        });
      });
    }

    // update checking
    if (!travelSettlementUid) {
      // const message = intl.formatMessage(travelRequestMessage.emptyTravelUid);

      return Promise.reject('empty travel settlement ID');
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          travelSettlementUid,
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as ITravelSettlementPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: TravelSettlementEditorProps) => (response: ITravelRequest) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(travelMessage.settlement.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(travelMessage.settlement.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/travel/settlement/requests/${response.uid}`);
  },
  handleSubmitFail: (props: TravelSettlementEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(travelMessage.settlement.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(travelMessage.settlement.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<TravelSettlementEditorProps, OwnState> = (props: TravelSettlementEditorProps): OwnState => ({
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(travelMessage.settlement.dialog.createTitle),
  submitDialogContentText: props.intl.formatMessage(travelMessage.settlement.dialog.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<TravelSettlementEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadRequest } = this.props.travelSettlementDispatch;
    const { loadDetailRequest } = this.props.travelRequestDispatch;
    const { user } = this.props.userState;

    const view = {
      title: travelMessage.settlement.page.newTitle,
      subTitle: travelMessage.settlement.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    stateUpdate({
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    if (!isNullOrUndefined(history.location.state)) {

      if (!isNullOrUndefined(history.location.state.uid)) {
        view.title = travelMessage.settlement.page.modifyTitle;
        view.subTitle = travelMessage.settlement.page.modifySubHeader;

        stateUpdate({
          formMode: FormMode.Edit,
          travelSettlementUid: history.location.state.uid,
          submitDialogTitle: this.props.intl.formatMessage(travelMessage.settlement.dialog.editTitle),
          submitDialogContentText: this.props.intl.formatMessage(travelMessage.settlement.dialog.editDescription),
        });

        loadRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelSettlementUid: history.location.state.uid
        });
      }

      if (!isNullOrUndefined(history.location.state.traveluid)) {
        view.title = travelMessage.settlement.page.newTitle,
        view.subTitle = travelMessage.settlement.page.newSubHeader,

        // stateUpdate({ 
        //   formMode: FormMode.New,
        //   travelSettlementUid: history.location.state.uid
        // });

        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelUid: history.location.state.traveluid
        });
      }
    }

    layoutDispatch.changeView({
      uid: AppMenu.TravelSettlementRequest,
      parentUid: AppMenu.Travel,
      title: intl.formatMessage(view.title),
      subTitle: intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow();
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, travelSettlementDispatch, travelRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    travelSettlementDispatch.createDispose();
    travelSettlementDispatch.updateDispose();

    travelRequestDispatch.createDispose();
    travelRequestDispatch.updateDispose();
  }
};

export default compose<TravelSettlementEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTravelSettlement,
  withTravelRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<TravelSettlementEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<TravelSettlementEditorProps, {}>(lifecycles),
)(travelSettlementEditorView);
