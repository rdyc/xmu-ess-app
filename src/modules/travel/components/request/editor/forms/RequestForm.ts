import { FormMode } from '@generic/types';
import { IDiem } from '@lookup/classes/response';
import { WithLookupDiem } from '@lookup/hoc/withLookupDiem';
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
  diemRequest: IDiem[] | undefined;
}
interface FormValueProps {
  customerUidValue: string | undefined;
  destinationtypeValue: string | undefined;
  projectUidValue: string | undefined;
  isProjectSelected: boolean | false;
}

export type RequestFormProps 
  = InjectedFormProps<TravelRequestFormData, OwnProps>
  & WithLookupDiem
  & FormValueProps 
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
   const customerUid = selector(state, 'information.customerUid');
   const destinationtype = selector(state, 'information.destinationType');
   const projectUid = selector(state, 'information.projectUid');
   return {
     customerUidValue: customerUid,
     destinationtypeValue: destinationtype,
     projectUidValue: projectUid,
     isProjectSelected: projectUid
   };   
 };

const connectedView = connect(mapStateToProps)(RequestFormView);

export const RequestForm = reduxForm<TravelRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
