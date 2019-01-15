import { FormMode } from '@generic/types';
import { DateType } from 'material-ui-pickers/constants/prop-types';
import * as moment from 'moment';
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
  withStateHandlers 
} from 'recompose';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { TravelSettlementFormView } from './TravelSettlementFormView';

const formName = 'travelSettlement';

export type TravelSettlementItemFormData = {
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
};

export type TravelSettlementFormData = {
  information: {
    uid: string | null | undefined;
    travelUid: string | null | undefined;
    fullName: string | null | undefined;
    position: string | null | undefined;
    destinationType: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
    customerUid: string | null | undefined;
    projectUid: string | null | undefined;
    siteUid: string | null | undefined;
    activityType: string | null | undefined;
    objective: string | null | undefined;
    target: string | null | undefined;
    comment: string | null | undefined;
    total: number | null | undefined;
  },
  item: {
    items: TravelSettlementItemFormData[]
  }
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnHandlers {
  handleEventListener: (event: CustomEvent) => void;
}

interface OwnState {
  TotalCost: number | null | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setTotal: StateHandler<OwnState>;
}

interface FormValueProps {
  totalCostValue: number | 0;
  minDate?: DateType;
  maxDate?: DateType;
  formName: string;
}

export type TravelSettlementFormProps
  = InjectedFormProps<TravelSettlementFormData, OwnProps>
  & FormValueProps
  & OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<TravelSettlementFormProps, OwnState> = (props: TravelSettlementFormProps): OwnState => {
  return {
    TotalCost: props.initialValues.information && props.initialValues.information.total,
  };
};

const handlers: HandleCreators<TravelSettlementFormProps, OwnHandlers> = {
  handleEventListener: (props: TravelSettlementFormProps) => (event: CustomEvent) => {
    const formValues = event.detail as TravelSettlementFormData;
    const calculateDiem = (start: string , end: string): number => {
      let result: number = 0;
      
      if (start !== '' && end !== '') {
      const startDate = moment(start);
      const endDate = moment(end);
      const diffHours = endDate.diff(startDate, 'hours');
      const diffDays = startDate.isSame(endDate, 'years') ? 
                          endDate.dayOfYear() - startDate.dayOfYear() : 
                          endDate.diff(startDate, 'days');
    
      if (startDate.isSame(endDate, 'days')) {
        result = diffHours >= 8 ? 1 : 0;
      } else if ( !startDate.isSame(endDate, 'days') && endDate.hours() >= 17) {
        result =  diffDays + 1;
      } else {
        result = diffDays;
      }
    }  
      return result;
    };

    let total: number = 0;
    if (formValues.item.items) {
      formValues.item.items.forEach((item) => total += item.costTransport + item.costHotel + (calculateDiem(item.departureDate, item.returnDate) * (item.currencyRate) * (item.diemValue)));
    }
    props.change('information.total', total);
  }
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const totalCost = selector(state, 'information.total');
  const startValue = selector(state, 'information.start');
  const endValue = selector(state, 'information.end');
  return {
    formName,
    totalCostValue: totalCost,
    minDate: startValue,
    maxDate: endValue
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setTotal: (prevState: OwnState) => (total: number) => {
    return {
      TotalCost: total
    };
  }
};

const lifecycles: ReactLifeCycleFunctions<TravelSettlementFormProps, OwnState> = {
  componentDidMount() {
    addEventListener('TRV_FORM', this.props.handleEventListener);
  },
  componentWillUnmount() {
    removeEventListener('TRV_FORM', this.props.handleEventListener);
  }
};

// const connectedView = connect(mapStateToProps)(TravelSettlementFormView);

const enhance = compose<TravelSettlementFormProps, OwnProps & InjectedFormProps<TravelSettlementFormData, OwnProps>> (
  connect(mapStateToProps),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlers),
  lifecycle(lifecycles),
)(TravelSettlementFormView);

export const TravelSettlementForm = reduxForm<TravelSettlementFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  onChange: (values: TravelSettlementFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('TRV_FORM', {detail: values}));
  },
})(enhance);
