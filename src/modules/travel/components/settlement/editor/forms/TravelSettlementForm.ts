import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { TravelSettlementFormView } from './TravelSettlementFormView';

const formName = 'travelSettlement';

export type TravelSettlementItemFormData = {
  uid: string | null;
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
}

interface FormValueProps {
  totalCostValue: number | 0;
}

export type TravelSettlementFormProps
  = InjectedFormProps<TravelSettlementFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const totalCost = selector(state, 'information.total');
  return {
    totalCostValue: totalCost
  };
};
const connectedView = connect(mapStateToProps)(TravelSettlementFormView);

export const TravelSettlementForm = reduxForm<TravelSettlementFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
