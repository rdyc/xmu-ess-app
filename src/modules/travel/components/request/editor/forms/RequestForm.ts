import { FormMode } from '@generic/types';
import { RequestFormView } from '@travel/components/request/editor/forms/RequestFormView';
import { connect } from 'react-redux';
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
    siteUid: string | null | undefined;
    activityType: string | null | undefined;
    objective: string | null | undefined;
    target: string | null | undefined;
    comment: string | null | undefined;
  },
  item: {
    items: TravelItemFormData[]  
  }
};

interface OwnProps {
  formMode: FormMode;
}
interface FormValueProps {
  customerUidValue: string | undefined;
}

export type RequestFormProps 
  = InjectedFormProps<TravelRequestFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
   const customerUid = selector(state, 'information.customerUid');
   
   return {
     customerUidValue: customerUid,
   };
 };

const connectedView = connect(mapStateToProps)(RequestFormView);

export const RequestForm = reduxForm<TravelRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
