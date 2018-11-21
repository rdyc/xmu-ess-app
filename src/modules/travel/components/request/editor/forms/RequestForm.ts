import { ProjectType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { IDiem } from '@lookup/classes/response';
import { WithLookupDiem } from '@lookup/hoc/withLookupDiem';
import { IProjectDetail, IProjectList } from '@project/classes/response';
import { RequestFormView } from '@travel/components/request/editor/forms/RequestFormView';
import { connect } from 'react-redux';
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
  withStateHandlers } 
from 'recompose';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'travelRequest';

export type TravelItemFormData = {
  uid: string | null ;
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
  hotel: string | null;
  costHotel: number | 0;
  isHotelByCompany: boolean;
  notes: string | null;
  duration: number | 0;
  amount: number | 0;
  currencyUid: string | null;
  currencyRate: number | 0;
  diemValue: number | 0;
};

export type TravelRequestFormData = {
  information: {
    uid: string | null | undefined;
    fullName: string | null | undefined;
    position: string | null | undefined;
    destinationType: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
    customerUid: string | null | undefined;
    projectUid: string | null | undefined;
    projectType: string | undefined;
    siteUid: string | null | undefined;
    activityType: string | null | undefined;
    objective: string | null | undefined;
    target: string | null | undefined;
    comment: string | null | undefined;
    total: number | undefined;
  },
  item: {
    items: TravelItemFormData[]  
  }
};

interface OwnProps {
  formMode: FormMode;
  diemRequest: IDiem[] | undefined;
}

interface OwnHandlers {
  handleEventListener: (event: CustomEvent) => void;
  handleProjectChange: (project: IProjectList | undefined) => void; 
}

interface OwnState {
  TotalCost: number | undefined;
  projectType: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setTotal: StateHandler<OwnState>;
  setProject: StateHandler<OwnState>;
}

interface FormValueProps {
  customerUidValue: string | undefined;
  destinationtypeValue: string | undefined;
  projectUidValue: string | undefined;
  isProjectSelected: boolean | false;
  totalTravel: number | 0;
}

export type RequestFormProps 
  = InjectedFormProps<TravelRequestFormData, OwnProps>
  & WithLookupDiem
  & FormValueProps 
  & OwnHandlers
  & OwnProps
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<RequestFormProps, OwnState> = (props: RequestFormProps): OwnState => {
  return {
    TotalCost : props.initialValues.information && props.initialValues.information.total, 
    projectType: props.initialValues.information && props.initialValues.information.projectType
  };
};

const handlers: HandleCreators<RequestFormProps, OwnHandlers> = {
  handleEventListener: (props: RequestFormProps) => (event: CustomEvent) => {
    const { setTotal } = props;
    const formValues = event.detail as TravelRequestFormData;

    let total: number = 0;
    if (formValues.item.items) {
      formValues.item.items.forEach((item) => total += item.costTransport + item.costHotel + item.amount);
    }
    setTotal(total);
  },
  handleProjectChange: (props: RequestFormProps) => (project: IProjectList | undefined) => { 
    const { setProject } = props;
    setProject(project);
  }
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
   const customerUid = selector(state, 'information.customerUid');
   const destinationtype = selector(state, 'information.destinationType');
   const projectUid = selector(state, 'information.projectUid');
   const total = selector(state, 'information.total');
   return {
     customerUidValue: customerUid,
     destinationtypeValue: destinationtype,
     projectUidValue: projectUid,
     isProjectSelected: projectUid,
     totalTravel: total 
   };   
 };

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setTotal: (prevState: OwnState) => (total: number) => {
    return {
      TotalCost: total
    };
  },
  setProject: (prevState: OwnState) => (project?: any | undefined) => {
    if (project) {
      const projectFormValue = project as IProjectDetail;

      return {
        ...prevState,
        projectType: projectFormValue.projectType === ProjectType.Project ?
                        ProjectType.Project : ProjectType.NonProject
      };
    }

    return {
      ...prevState
    };
  }
};

const lifecycles: ReactLifeCycleFunctions<RequestFormProps, OwnState> = {
  componentDidMount() {
    addEventListener('TRV_FORM', this.props.handleEventListener);
  },
  componentWillUnmount() {
    removeEventListener('TRV_FORM', this.props.handleEventListener);
  }
};

// const connectedView = connect(mapStateToProps)(RequestFormView);
const enhance = compose<RequestFormProps, OwnProps & InjectedFormProps<TravelRequestFormData, OwnProps>> (
  connect(mapStateToProps),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlers),
  lifecycle(lifecycles),
)(RequestFormView);

export const RequestForm = reduxForm<TravelRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  onChange: (values: TravelRequestFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('TRV_FORM', {detail: values}));
  },
})(enhance);
