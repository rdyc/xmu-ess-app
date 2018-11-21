import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IDiem } from '@lookup/classes/response';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { ITravelPostPayload, ITravelPutPayload } from '@travel/classes/request';
import { ITravelPutItem } from '@travel/classes/request/ITravelPutItem';
import { ITravelRequest } from '@travel/classes/response';
import { RequestEditorView } from '@travel/components/request/editor//RequestEditorView';
import { TravelRequestFormData } from '@travel/components/request/editor/forms/RequestForm';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { travelRequestMessage } from '@travel/locales/messages/travelRequestMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

interface OwnHandlers {
  handleValidate: (payload: TravelRequestFormData) => any;
  handleSubmit: (payload: TravelRequestFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
  generateDiemData: () => IDiem[] | undefined;
}

interface OwnRouteParams {
  travelUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  travelUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type RequestEditorProps
  = WithTravelRequest
  & WithLookupDiem
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<RequestEditorProps, OwnHandlers> = {
  handleValidate: (props: RequestEditorProps) => (formData: TravelRequestFormData) => {
    const errors = {
      information: {},
      item: {}
    };

    const requiredFields = [
      'projectUid', 'destinationType', 'activityType',
      'start', 'end',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        Object.assign(errors.information, {[`${field}`]: props.intl.formatMessage({ id: `travel.field.information.${field}.required` })});
      }
    });

    if (formData.item.items) {
      const requiredItemFields = ['employeeUid', 'transportType'];

      const itemErrors: any[] = [];
      
      formData.item.items.forEach((item, index) => {
        const itemError: any = {};

        if (!item) { return ; }

        requiredItemFields.forEach(field => {
          if (!item[field] || isNullOrUndefined(item[field])) {
            Object.assign(itemError, {[`${field}`]: props.intl.formatMessage({id: `travel.field.information.item.${field}.required`})});
          }
        });

        itemErrors.push(itemError);
      });

      if (itemErrors.length) {
        Object.assign(errors.item, {
          items: itemErrors
        });
      }
    }
    
    console.log(errors);
    return errors;
  },
  handleSubmit: (props: RequestEditorProps) => (formData: TravelRequestFormData) => {
    const { formMode, travelUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.travelRequestDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    if (!formData.item.items.length) {
      return Promise.reject('At least one item must be entered');
    }

    const parsedItems = () => {
      if (!formData.item.items) {
        return null;
      }

      const _items: ITravelPutItem[] = [];

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
          costTransport: item.costTransport ? item.costTransport : 0,
          isTransportByCompany: item.isTransportByCompany,
          hotel: item.hotel,
          costHotel: item.costHotel ? item.costHotel : 0,
          isHotelByCompany: item.isHotelByCompany,
          notes : item.notes
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
          data: payload as ITravelPostPayload
        });
      });
    }

    // update checking
    if (!travelUid) {
      // const message = intl.formatMessage(travelRequestMessage.emptyTravelUid);

      return Promise.reject('empty travelUid');
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          travelUid,
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as ITravelPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: RequestEditorProps) => (response: ITravelRequest) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(travelRequestMessage.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(travelRequestMessage.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push('/travel/requests');
  },
  handleSubmitFail: (props: RequestEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(travelRequestMessage.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(travelRequestMessage.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }, 
  generateDiemData: (props: RequestEditorProps) => (): IDiem[] | undefined => {
    const { response } = props.lookupDiemState.all;
    if (response && response.data) {
      return response.data;
    }
    return undefined;
  }
};

const createProps: mapper<RequestEditorProps, OwnState> = (props: RequestEditorProps): OwnState => ({ 
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<RequestEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.travelRequestDispatch;
    const loadDiem = this.props.lookupDiemDispatch.loadAllRequest;
    const { user } = this.props.userState;
    
    const filter: any = {
      projectType: undefined,
      destinationType: undefined,
      find: user && user.company.uid,
      findBy: 'companyUid'      
    };

    const view = {
      title: 'travel.form.newTitle',
      subTitle: 'travel.form.newSubTitle',
    };

    if (!user) {
      return;
    }

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'travel.form.editTitle';
      view.subTitle = 'travel.form.editSubTitle';

      stateUpdate({ 
        formMode: FormMode.Edit,
        travelUid: history.location.state.uid
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        travelUid: history.location.state.uid
      });      
    }
    
    loadDiem({
      filter
    });

    layoutDispatch.changeView({
      uid: AppMenu.TravelRequest,
      parentUid: AppMenu.Travel,
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, travelRequestDispatch, lookupDiemDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    lookupDiemDispatch.loadAllDispose();
    travelRequestDispatch.createDispose();
    travelRequestDispatch.updateDispose();
  }
};

export default compose<RequestEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTravelRequest,
  withLookupDiem,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RequestEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<RequestEditorProps, {}>(lifecycles),
)(RequestEditorView);
