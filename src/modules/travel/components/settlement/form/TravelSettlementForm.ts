import { FormMode } from '@generic/types/FormMode';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';

import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IExpense } from '@expense/classes/response';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { GlobalFormat } from '@layout/types';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { ITravelSettlementPostPayload, ITravelSettlementPutPayload } from '@travel/classes/request/settlement';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { WithTravelSettlement, withTravelSettlement } from '@travel/hoc/withTravelSettlement';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { PurchaseSettlementFormView as TravelSettlementFormView } from './TravelSettlementFormView';

interface ITravelItemFormValue {
  uid?: string;
  employeeUid: string;
  fullName: string;
  transportType: string;
  isRoundTrip: boolean;
  from: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  costTransport: number | 0;
  isTransportByCompany: boolean;
  hotel?: string;
  costHotel: number | 0;
  isHotelByCompany: boolean;
  notes?: string;
  duration: number | 0;
  amount: number | 0;
  currencyUid?: string;
  currencyRate: number | 0;
  diemValue: number | 0;
}

export interface ITravelSettlementFormValue {
  uid: string;
  travelUid: string;
  fullName: string;
  position: string;
  destinationType: string;
  start: string;
  end: string;
  customerUid: string;
  projectUid: string;
  siteUid: string;
  activityType: string;
  objective: string;
  target: string;
  comment: string;
  total: number;
  items: ITravelItemFormValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: ITravelSettlementFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ITravelSettlementFormValue>>>;
  
  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ITravelSettlementFormValue, actions: FormikActions<ITravelSettlementFormValue>) => void;
}

export type TravelSettlementFormProps
  = WithTravelSettlement
  & WithTravelRequest
  & WithCommonSystem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<TravelSettlementFormProps, IOwnState> = (props: TravelSettlementFormProps): IOwnState => ({
  // form props
  formMode: (props.history.location.state !== undefined && (props.history.location.state.uid === undefined || props.history.location.state.uid === null)) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    travelUid: '',
    fullName: '',
    position: '',
    destinationType: '',
    start: '',
    end: '',
    customerUid: '',
    projectUid: '',
    siteUid: '',
    activityType: '',
    objective: '',
    target: '',
    comment: '',
    total: 0,
    items: [],
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ITravelSettlementFormValue>>({
    fullName: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.fullName)),
      
    position: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.position)),
      
    destinationType: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.destinationType)),

    start: Yup.string()
      .label(props.intl.formatMessage(travelMessage.settlement.field.start))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(travelMessage.settlement.field.end))
      .required(),
      
    customerUid: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.customerUid)),
      
    projectUid: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.projectUid)),
      
    siteUid: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.siteUid)),
      
    activityType: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.activityType)),
      
    objective: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.objective)),
      
    target: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.target)),
      
    comment: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(travelMessage.request.field.comment)),

    total: Yup.number()
      .label(props.intl.formatMessage(travelMessage.request.field.total)),
  
    items: Yup.array()
      .of(
        Yup.object().shape({
          employeeUid: Yup.string()
            .label(props.intl.formatMessage(travelMessage.settlement.field.employeeUid))
            .required(),
            
          fullName: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.fullName)),
            
          transportType: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.transportType)),
            
          isRoundTrip: Yup.boolean()
            .label(props.intl.formatMessage(travelMessage.request.field.isRoundTrip))
            .required(),
            
          from: Yup.string()
            .max(50)
            .label(props.intl.formatMessage(travelMessage.request.field.from))
            .required(),
          
          destination: Yup.string()
            .max(50)
            .label(props.intl.formatMessage(travelMessage.request.field.destination))
            .required(),
            
          departureDate: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.itemStart))
            .required(),
          
          returnDate: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.itemEnd)),
            
          costTransport: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.transportCost)),
            
          isTransportByCompany: Yup.boolean()
            .label(props.intl.formatMessage(travelMessage.request.field.isTransportByCompany)),
            
          hotel: Yup.string()
            .max(50)
            .label(props.intl.formatMessage(travelMessage.request.field.hotel)),
            
          costHotel: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.hotelCost)),
            
          isHotelByCompany: Yup.boolean()
            .label(props.intl.formatMessage(travelMessage.request.field.isHotelByCompany)),
            
          notes: Yup.string()
            .max(125)
            .label(props.intl.formatMessage(travelMessage.request.field.note)),
            
          duration: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.duration)),
            
          amount: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.amount)),
            
          currencyUid: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.currencyUid)),
            
          currencyRate: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.currencyRate)),
            
          diemValue: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.diemValue)),
        })
      )
      .min(1, props.intl.formatMessage(purchaseMessage.request.items.itemsMinimum))
  }),

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<TravelSettlementFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
};

const handlerCreators: HandleCreators<TravelSettlementFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: TravelSettlementFormProps) => () => {
    const user = props.userState.user;
    if (!(props.history.location.state === undefined || props.history.location.state === null )) {
      if (!(props.history.location.state.uid === undefined || props.history.location.state.uid === null)) {
        const settlementUid = props.history.location.state.uid;
        const { isLoading } = props.travelSettlementState.detail;
  
        if (user && settlementUid && !isLoading) {
          props.travelSettlementDispatch.loadRequest({
            travelSettlementUid: settlementUid,
            companyUid: user.company.uid,
            positionUid: user.position.uid
          });
        }
      } else if (!(props.history.location.state.traveluid === undefined || props.history.location.state.traveluid === null)) {
        const travelUid = props.history.location.state.traveluid;
        const { isLoading } = props.travelRequestState.detail;
  
        if (user && travelUid && !isLoading) {
          props.travelRequestDispatch.loadDetailRequest({
            travelUid,
            companyUid: user.company.uid,
            positionUid: user.position.uid
          });
        }
      }
    }
  },
  handleOnSubmit: (props: TravelSettlementFormProps) => (values: ITravelSettlementFormValue, actions: FormikActions<ITravelSettlementFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ITravelSettlementPostPayload = {
          travelUid: values.travelUid,
          start: values.start,
          end: values.end,
          comment: values.comment,
          items: [],
        };

        // fill items
        values.items.forEach(item => payload.items && payload.items.push({
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
          notes: item.notes,
        }));
        
        // set the promise
        promise = new Promise((resolve, reject) => {
          props.travelSettlementDispatch.createRequest({
            resolve,
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            data: payload
          });
        });
      }

      // editing
      if (props.formMode === FormMode.Edit) {
        const settlementUid = props.history.location.state.uid;

        // must have expenseUid
        if (settlementUid) {
          const payload: ITravelSettlementPutPayload = {
            travelUid: values.travelUid,
            start: values.start,
            end: values.end,
            comment: values.comment,
            items: [],
          };
  
          // fill items
          values.items.forEach(item => payload.items && payload.items.push({
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
            notes: item.notes,
          }));

          promise = new Promise((resolve, reject) => {
            props.travelSettlementDispatch.updateRequest({
              resolve, 
              reject,
              travelSettlementUid: settlementUid, 
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              data: payload, 
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IExpense) => {
        console.log(response);
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.settlement.message.createSuccess : travelMessage.settlement.message.updateSuccess, { uid: response.uid })
        });
       
        props.history.push(`/travel/settlement/requests/${response.uid}`);
      })
      .catch((error: any) => {
        let err: IValidationErrorResponse | undefined = undefined;
        
        if (error.id) {
          err = error;
        }
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.settlement.message.createFailure : travelMessage.settlement.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<TravelSettlementFormProps, IOwnState> = {
  // tslint:disable-next-line:no-empty
  componentDidMount() {    
  },
  componentDidUpdate(prevProps: TravelSettlementFormProps) {
    // handle project detail response
    const { response } = this.props.travelSettlementState.detail;
    const { response: travelResponse } = this.props.travelRequestState.detail;

    if (response !== prevProps.travelSettlementState.detail.response && this.props.formMode === FormMode.Edit) {
      if (response && response.data) {
        // define initial values
        const initialValues: ITravelSettlementFormValue = {
          uid: response.data.settlement.uid,
          travelUid: response.data.settlement.travelUid,
          fullName: response.data.settlement.employee && response.data.settlement.employee.fullName || 'N/A',
          position: response.data.settlement.position && response.data.settlement.position.name || 'N/A',
          destinationType: response.data.settlement.destination && response.data.settlement.destination.value || 'N/A',
          start: response.data.settlement.start,
          end: response.data.settlement.end,
          customerUid: response.data.settlement.customer && response.data.settlement.customer.name || 'N/A',
          projectUid: response.data.settlement.project && response.data.settlement.project.name || 'N/A',
          siteUid: response.data.settlement.site && response.data.settlement.site.name || 'N/A',
          activityType: response.data.settlement.activity && response.data.settlement.activity.value || 'N/A',
          objective: response.data.settlement.objective || '',
          target: response.data.settlement.target || '',
          comment: response.data.settlement.comment || '',
          total: response.data.settlement.total,
          items: [],
        };

        // fill items
        if (response.data.settlement.items) {
          response.data.settlement.items.forEach(item => initialValues.items && initialValues.items.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            fullName: item.employee && item.employee.fullName || 'N/A',
            transportType: item.transportType,
            isRoundTrip: item.isRoundTrip,
            from: item.from,
            destination: item.destination,
            departureDate: this.props.intl.formatDate(item.departureDate, GlobalFormat.TimeDate),
            returnDate: this.props.intl.formatDate(item.returnDate, GlobalFormat.TimeDate),
            costTransport: item.costTransport || 0,
            isTransportByCompany: item.isTransportByCompany,
            hotel: item.hotel || '',
            costHotel: item.costHotel || 0,
            isHotelByCompany: item.isHotelByCompany,
            notes: item.notes || '',
            duration: item.duration || 0,
            amount: item.amount,
            currencyUid: item.currency && item.currency.name,
            currencyRate: item.currency && item.currency.rate || 0,
            diemValue: item.diemValue || 0,
          }));
        }

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }

    if (travelResponse !== prevProps.travelRequestState.detail.response && this.props.formMode === FormMode.New) {
      if (travelResponse && travelResponse.data) {
        // define initial values
        const initialValues: ITravelSettlementFormValue = {
          uid: 'Auto Generated',
          travelUid: travelResponse.data.uid,
          fullName: travelResponse.data.employee && travelResponse.data.employee.fullName || 'N/A',
          position: travelResponse.data.position && travelResponse.data.position.name || 'N/A',
          destinationType: travelResponse.data.destination && travelResponse.data.destination.value || 'N/A',
          start: travelResponse.data.start,
          end: travelResponse.data.end,
          customerUid: travelResponse.data.customer && travelResponse.data.customer.name || 'N/A',
          projectUid: travelResponse.data.project && travelResponse.data.project.name || 'N/A',
          siteUid: travelResponse.data.site && travelResponse.data.site.name || 'N/A',
          activityType: travelResponse.data.activity && travelResponse.data.activity.value || 'N/A',
          objective: travelResponse.data.objective || '',
          target: travelResponse.data.target || '',
          comment: travelResponse.data.comment || '',
          total: travelResponse.data.total,
          items: [],
        };

        // fill items
        if (travelResponse.data.items) {
          travelResponse.data.items.forEach(item => initialValues.items && initialValues.items.push({
            uid: '',
            employeeUid: item.employeeUid,
            fullName: item.employee && item.employee.fullName || 'N/A',
            transportType: item.transportType,
            isRoundTrip: item.isRoundTrip,
            from: item.from,
            destination: item.destination,
            departureDate: this.props.intl.formatDate(item.departureDate, GlobalFormat.TimeDate),
            returnDate: this.props.intl.formatDate(item.returnDate, GlobalFormat.TimeDate),
            costTransport: item.costTransport || 0,
            isTransportByCompany: item.isTransportByCompany,
            hotel: item.hotel || '',
            costHotel: item.costHotel || 0,
            isHotelByCompany: item.isHotelByCompany,
            notes: item.notes || '',
            duration: item.duration || 0,
            amount: item.amount,
            currencyUid: item.currency && item.currency.name,
            currencyRate: item.currency && item.currency.rate || 0,
            diemValue: item.diemValue || 0,
          }));
        }

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const TravelSettlementForm = compose<TravelSettlementFormProps, IOwnOption>(
  setDisplayName('TravelSettlementForm'),
  withUser,
  withMasterPage,
  withRouter,
  withTravelSettlement,
  withTravelRequest,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(TravelSettlementFormView);