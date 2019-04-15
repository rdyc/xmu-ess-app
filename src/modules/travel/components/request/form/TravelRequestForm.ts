import { IEmployeeListFilter } from '@account/classes/filters';
import { ISystemListFilter } from '@common/classes/filters';
import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { GlobalFormat } from '@layout/types';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { IDiem } from '@lookup/classes/response';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectSiteGetRequest } from '@project/classes/queries/site';
import styles from '@styles';
import { ITravelPostPayload, ITravelPutPayload } from '@travel/classes/request';
import { ITravelRequest } from '@travel/classes/response';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { travelMessage } from '@travel/locales/messages/travelMessage';
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
  withStateHandlers
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { TravelRequestFormView } from './TravelRequestFormView';

interface ITravelRequestItemFormValue {
  uid?: string;
  employeeUid: string;
  transportType: string;
  isRoundTrip: boolean;
  from: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  costTransport: number;
  isTransportByCompany: boolean;
  hotel?: string;
  costHotel: number;
  isHotelByCompany: boolean;
  notes?: string;
  duration: number;
  amount: number | 0;
  currencyUid?: string;
  currencyRate: number;
  diemValue: number;
}

export interface ITravelRequestFormValue {
  uid: string;
  fullName: string;
  position: string;
  destinationType: string;
  start: string;
  end: string;
  customerUid: string;
  projectUid: string;
  projectType: string;
  siteUid?: string;
  activityType: string;
  objective?: string;
  target?: string;
  comment?: string;
  total: number;
  currency: string;
  currencyRate: number;
  diemValue: number;
  items: ITravelRequestItemFormValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  diemData?: IDiem[];

  initialValues: ITravelRequestFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ITravelRequestFormValue>>>;

  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem: ISystemListFilter;
  filterProject: IProjectRegistrationGetListFilter;
  filterProjectSite?: IProjectSiteGetRequest;
  filterAccountEmployee?: IEmployeeListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setProjectFilter: StateHandler<IOwnState>;
  setDiemData: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  // setDiem: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetProjectFilter: (customerUid: string) => void;
  handleSetProjectSiteFilter: (projectUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ITravelRequestFormValue, action: FormikActions<ITravelRequestFormValue>) => void;
  handleSetDiemData: (data: IDiem[] | null) => void;
  // handleSetDiem: (projectType: string, destinationType: string) => void;
}

export type TravelRequestFormProps
  = WithTravelRequest
  & WithLookupDiem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<TravelRequestFormProps, IOwnState> = (props: TravelRequestFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  initialValues: {
    uid: 'Auto Generated',
    fullName: props.userState.user && props.userState.user.fullName || '',
    position: props.userState.user && props.userState.user.position.name || '',
    destinationType: '',
    start: '',
    end: '',
    customerUid: '',
    projectUid: '',
    projectType: '',
    siteUid: '',
    activityType: '',
    objective: '',
    target: '',
    comment: '',
    total: 0,
    currency: '',
    currencyRate: 0,
    diemValue: 0,
    items: []
  },

  validationSchema: Yup.object().shape<Partial<ITravelRequestFormValue>>({
    destinationType: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.destinationType))
      .required(),

    start: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.start))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.start))
      .required(),

    customerUid: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.customerUid))
      .required(),

    projectUid: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.projectUid))
      .required(),

    // projectType: Yup.string()
    //   .label(props.intl.formatMessage(travelMessage.request.field.projectType))
    //   .required(),

    siteUid: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.siteUid)),

    activityType: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.activityType))
      .required(),

    objective: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.objective))
      .max(100),

    target: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.target))
      .max(200),

    comment: Yup.string()
      .label(props.intl.formatMessage(travelMessage.request.field.comment))
      .max(200),

    total: Yup.number()
      .label(props.intl.formatMessage(travelMessage.request.field.total)),

    items: Yup.array()
      .of(
        Yup.object().shape({
          employeeUid: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.itemEmployeeUid))
            .length(5)
            .required(),

          isRoundTrip: Yup.boolean()
            .label(props.intl.formatMessage(travelMessage.request.field.isRoundTrip))
            .required(),

          transportType: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.transportType))
            .required(),

          from: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.from))
            .required(),

          destination: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.destination))
            .required(),

          departureDate: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.itemStart))
            .required(),

          returnDate: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.itemEnd))
            .required(),

          isTransportByCompany: Yup.boolean()
            .label(props.intl.formatMessage(travelMessage.request.field.isTransportByCompany))
            .required(),

          costTransport: Yup.number()
            .min(1)
            .label(props.intl.formatMessage(travelMessage.request.field.transportCost)),

          hotel: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.hotel)),

          isHotelByCompany: Yup.boolean()
            .label(props.intl.formatMessage(travelMessage.request.field.isHotelByCompany))
            .required(),

          costHotel: Yup.number()
            .min(1)
            .label(props.intl.formatMessage(travelMessage.request.field.hotelCost)),

          notes: Yup.string()
            .max(125)
            .label(props.intl.formatMessage(travelMessage.request.field.note)),

          duration: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.duration)),

          diemValue: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.diemValue)),

          currencyUid: Yup.string()
            .label(props.intl.formatMessage(travelMessage.request.field.currencyUid)),

          currencyRate: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.currencyRate)),

          amount: Yup.number()
            .label(props.intl.formatMessage(travelMessage.request.field.amount)),
        })
      )
      .min(1, props.intl.formatMessage(travelMessage.request.field.itemsMinimum))
  }),

  filterLookupCustomer: {
    companyUid: props.userState.user && props.userState.user.company.uid,
    orderBy: 'name',
    direction: 'ascending'
  },
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
  filterProject: {
    statusTypes: ([WorkflowStatusType.Approved]).toString(),
    direction: 'ascending'
  },
  filterAccountEmployee: {
    companyUids: props.userState.user && props.userState.user.company.uid,
    useAccess: true,
    orderBy: 'fullName',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<TravelRequestFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setProjectFilter: () => (customerUid: string): Partial<IOwnState> => ({
    filterProject: {
      customerUids: customerUid,
      statusTypes: ([WorkflowStatusType.Approved]).toString(),
      direction: 'ascending'
    },
  }),
  setDiemData: () => (diemData: IDiem[]): Partial<IOwnState> => ({
    diemData
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
  // setDiem: () => (diem: IDiem): Partial<IOwnState> => ({
  //   diem
  // })
};

const handleCreators: HandleCreators<TravelRequestFormProps, IOwnHandler> = {
  handleSetDiemData: (props: TravelRequestFormProps) => (data: IDiem[]) => {
    props.setDiemData(data);
  },
  // handleSetDiem: (props: TravelRequestFormProps) => (projectType: string, destinationType: string) => {
  //   const diem = props.diemData && props.diemData.filter(item => item.destinationType === destinationType && item.projectType === projectType)[0];
  //   props.setDiem(diem);
  // },
  handleSetProjectFilter: (props: TravelRequestFormProps) => (customerUid: string) => {
    props.setProjectFilter(customerUid);
  },
  handleSetProjectSiteFilter: (props: TravelRequestFormProps) => (projectUid: string) => {
    const { user } = props.userState;

    if (user) {
      const filterProjectSite: IProjectSiteGetRequest = {
        projectUid,
        companyUid: user.company.uid,
      };

      props.stateUpdate({
        filterProjectSite
      });
    }
  },
  handleOnLoadDetail: (props: TravelRequestFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const travelUid = props.history.location.state.uid;
      const { isLoading } = props.travelRequestState.detail;

      if (user && travelUid && !isLoading) {
        props.travelRequestDispatch.loadDetailRequest({
          travelUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  },
  handleOnSubmit: (props: TravelRequestFormProps) => (values: ITravelRequestFormValue, actions: FormikActions<ITravelRequestFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: ITravelPostPayload = {
          destinationType: values.destinationType,
          start: values.start,
          end: values.end,
          customerUid: values.customerUid,
          projectUid: values.projectUid,
          siteUid: values.siteUid === '' ? undefined : values.siteUid,
          activityType: values.activityType,
          objective: values.objective,
          target: values.target,
          comment: values.comment,
          items: []
        };

        // fill payload items
        values.items.forEach(item => payload.items.push({
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
        }));

        promise = new Promise((resolve, reject) => {
          props.travelRequestDispatch.createRequest({
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
        const travelUid = props.history.location.state.uid;

        // must have travelUid
        if (travelUid) {

          // fill payload 
          const payload: ITravelPutPayload = {
            destinationType: values.destinationType,
            start: values.start,
            end: values.end,
            customerUid: values.customerUid,
            projectUid: values.projectUid,
            siteUid: values.siteUid === '' ? undefined : values.siteUid,
            activityType: values.activityType,
            objective: values.objective === '' ? undefined : values.objective,
            target: values.target === '' ? undefined : values.target,
            comment: values.comment === '' ? undefined : values.comment,
            items: []
          };

          // fill payload items
          values.items.forEach(item => payload.items.push({
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
          }));

          promise = new Promise((resolve, reject) => {
            props.travelRequestDispatch.updateRequest({
              travelUid,
              resolve,
              reject,
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              data: payload as ITravelPutPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: ITravelRequest) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.request.message.createSuccess : travelMessage.request.message.updateSuccess, { uid: response.uid })
        });

        props.history.push(`/travel/requests/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);

        // set form status
        actions.setStatus(error);

        // error on form fields
        if (error.errors) {
          error.errors.forEach(item =>
            actions.setFieldError(item.field, props.intl.formatMessage({ id: item.message }))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.request.message.createFailure : travelMessage.request.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<TravelRequestFormProps, IOwnState> = {
  componentDidMount() {
    const { loadAllRequest } = this.props.lookupDiemDispatch;
    const { user } = this.props.userState;
    const filter: any = {
      projectType: undefined,
      destinationType: undefined,
      find: user && user.company.uid,
      findBy: 'companyUid'
    };

    if (user) {
      loadAllRequest({
        filter
      });
    }
  },
  componentDidUpdate(prevProps: TravelRequestFormProps) {
    // handle travel detail response
    const { response } = this.props.travelRequestState.detail;
    const { response: diemResponse } = this.props.lookupDiemState.all;

    if (response !== prevProps.travelRequestState.detail.response) {
      if (response && response.data) {
        // define initial values 
        const initialValues: ITravelRequestFormValue = {
          uid: response.data.uid,
          fullName: response.data.employee && response.data.employee.fullName || response.data.employeeUid,
          position: response.data.position && response.data.position.name || response.data.positionUid,
          destinationType: response.data.destinationType,
          start: response.data.start,
          end: response.data.end,
          customerUid: response.data.customerUid,
          projectUid: response.data.projectUid,
          projectType: response.data.project && response.data.project.projectType === 'SPT01' ? 'SPT01' : 'SPT04',
          siteUid: response.data.siteUid,
          activityType: response.data.activityType,
          objective: response.data.objective,
          target: response.data.target,
          comment: response.data.comment,
          total: response.data.total,
          currency: 'N/A',
          currencyRate: 0,
          diemValue: 0,
          items: []
        };

        // fill travel items
        response.data.items.forEach(item =>
          initialValues.items.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            transportType: item.transportType,
            isRoundTrip: item.isRoundTrip,
            from: item.from,
            destination: item.destination,
            departureDate: this.props.intl.formatDate(item.departureDate, GlobalFormat.TimeDate),
            returnDate: this.props.intl.formatDate(item.returnDate, GlobalFormat.TimeDate),
            costTransport: item.costTransport,
            isTransportByCompany: item.isTransportByCompany,
            hotel: item.hotel,
            costHotel: item.costHotel,
            isHotelByCompany: item.isHotelByCompany,
            notes: item.notes,
            duration: item.duration,
            diemValue: item.diemValue || 0,
            currencyUid: item.currency && item.currency.name || item.currencyUid,
            currencyRate: item.currency && item.currency.rate || 0,
            amount: item.amount,
          })
        );

        // set initial values
        this.props.setInitialValues(initialValues);
        this.props.handleSetProjectSiteFilter(response.data.projectUid);
      }
    }

    if (diemResponse !== prevProps.lookupDiemState.all.response) {
      if (diemResponse && diemResponse.data) {
        this.props.handleSetDiemData(diemResponse.data);
      }
    }
  }
};

export const TravelRequestForm = compose<TravelRequestFormProps, IOwnOption>(
  setDisplayName('TravelRequestForm'),
  withUser,
  withRouter,
  withTravelRequest,
  withLookupDiem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(TravelRequestFormView);
