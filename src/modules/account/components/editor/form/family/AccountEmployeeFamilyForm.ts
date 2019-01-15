import { AccountEmployeeFamilyFormData } from '@account/components/editor/form/family/AccountEmployeeFamilyContainerForm';
import { AccountEmployeeFamilyFormView } from '@account/components/editor/form/family/AccountEmployeeFamilyFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  // HandleCreators, withHandlers 
} from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<AccountEmployeeFamilyFormData>;
}

export type AccountEmployeeFamilyFormProps
  = OwnProps
  & InjectedIntlProps;

export const AccountEmployeeFamilyForm = compose<AccountEmployeeFamilyFormProps, OwnProps>(
  injectIntl,
)(AccountEmployeeFamilyFormView);