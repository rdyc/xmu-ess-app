import { FormMode } from '@generic/types';
import { MileageRequestFormView } from '@mileage/components/request/editor/forms/MileageRequestFormView';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'mileageRequest';

export type MileageRequestFormData = {
  information: {
    year: number | null;
    month: number | null;
  };
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  formYear?: number | undefined;
  formMonth?: number | undefined;
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
