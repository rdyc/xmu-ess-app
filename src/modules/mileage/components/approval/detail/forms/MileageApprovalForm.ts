import { MileageApprovalFormView } from '@mileage/components/approval/detail/forms/MileageApprovalFormView';
import { InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'mileageItem';

export type MileageItemData = {
  [key: string]: boolean;
};

export type MileageItemFormData = {
  items: MileageItemData[];
};

export type MileageFormProps = InjectedFormProps<MileageItemFormData, {}>;

export const MileageApprovalForm = reduxForm<MileageItemFormData, {}>({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: true
})(MileageApprovalFormView);