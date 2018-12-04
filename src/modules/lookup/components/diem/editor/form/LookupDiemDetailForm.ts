import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { SelectCurrency } from '@lookup/components/currency/select/SelectCurrency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { LookupDiemDetailFormView } from './LookupDiemDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type LookupDiemDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<LookupDiemDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: LookupDiemDetailFormProps) => (name: string) => {
    const { intl } = props;
    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'companyUid':
        fieldProps = {
          requeired: true,
          label: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldPlaceholder')),
          component: SelectLookupCompany 
        };
        break;

      case 'projectType':
        fieldProps = {
          requeired: true,
          category: 'project',
          label: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem 
        };
        break;

      case 'destinationType':
        fieldProps = {
          requeired: true,
          category: 'destination',
          label: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem 
        };
        break;
      
      case 'currencyUid':
        fieldProps = {
          requeired: true,
          label: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldPlaceholder')),
          component: SelectCurrency 
        };
        break;
        
      case 'value':
        fieldProps = {
          requeired: true,
          label: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber 
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupDiem.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const LookupDiemDetailForm = compose<LookupDiemDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<LookupDiemDetailFormProps, OwnHandlers>(handlerCreators),
)(LookupDiemDetailFormView);