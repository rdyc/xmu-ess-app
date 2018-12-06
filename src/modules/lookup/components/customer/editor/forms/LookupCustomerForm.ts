import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupCustomerFormView } from './LookupCustomerFormView';

const formName = 'lookupCustomer';

export type LookupCustomerFormData = {
  information: {
    uid: string | null | undefined;
    name: string | null | undefined;
    npwp: string | null | undefined;
    companyUid: string | null | undefined;
    address: string | null | undefined;
    addressAdditional: string | null | undefined;
    phone: string | null | undefined;
    phoneAdditional: string | null | undefined; 
    mobile: string | null | undefined; 
    mobileAdditional: string | null | undefined; 
    fax: string | null | undefined; 
    emailAddress: string | null | undefined; 
    contactPerson: string | null | undefined;  
    contactTitle: string | null | undefined; 
    contactPersonAdditional: string | null | undefined;
    contactTitleAdditional: string | null | undefined; 
    isActive: boolean | false; 
  }
};

interface OwnProps {
  formMode: FormMode;
}

export type LookupCustomerFormProps
  = InjectedFormProps<LookupCustomerFormData, OwnProps>
  & OwnProps;

const connectedView = connect()(LookupCustomerFormView);

export const LookupCustomerForm = reduxForm<LookupCustomerFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
