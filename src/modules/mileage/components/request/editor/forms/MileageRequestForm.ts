import { FormMode } from '@generic/types';
import { MileageRequestFormView } from '@mileage/components/request/editor/forms/MileageRequestFormView';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'mileageRequest';

export type MileageRequestFormData = {
  information: {
    year: number;
    month: number;
  };
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  // formIsItem: boolean | false;
  formYear: number | null;
  formMonth: number | null;
}

export type MileageRequestFormProps = InjectedFormProps<
  MileageRequestFormData,
  OwnProps
> &
  FormValueProps &
  OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const year = selector(state, 'information.year');
  const month = selector(state, 'information.month');

  return {
    // formIsItem:
    formYear: year,
    formMonth: month
  };
};

const connectedView = connect(mapStateToProps)(MileageRequestFormView);

export const MileageRequestForm = reduxForm<MileageRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
