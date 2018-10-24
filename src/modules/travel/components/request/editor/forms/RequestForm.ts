import { FormMode } from '@generic/types';
import { RequestFormView } from '@travel/components/request/editor/forms/RequestFormView';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'travelRequest';

export type TravelItemFormData = {
  uid: string;
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
  diemValue: number | 0;
};

export type TravelRequestFormData = {
  information: {
    uid: string | null | undefined;
    // employeeUid: string | null | undefined;
    fullName: string | null | undefined;
    // positionUid: string | null | undefined;
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

export type RequestFormProps 
  = InjectedFormProps<TravelRequestFormData, OwnProps> 
  & OwnProps;

const connectedView = connect()(RequestFormView);

export const RequestForm = reduxForm<TravelRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
