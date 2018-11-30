import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { SelectCurrency } from '@lookup/components/currency/select/SelectCurrency';
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

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'companyUid':
        fieldProps = {
          requeired: true,
          label: 'Company',
          placeholder: 'Select The Company',
          component: SelectLookupCompany 
        };
        break;

      case 'projectType':
        fieldProps = {
          requeired: true,
          category: 'project',
          label: 'Project Type',
          placeholder: 'Select The Project Type',
          component: SelectSystem 
        };
        break;

      case 'destinationType':
        fieldProps = {
          requeired: true,
          category: 'destination',
          label: 'Travel Type',
          placeholder: 'Select The Travel Type',
          component: SelectSystem 
        };
        break;
      
      case 'currencyUid':
        fieldProps = {
          requeired: true,
          label: 'Currency',
          placeholder: 'Select The Currency',
          component: SelectCurrency 
        };
        break;
        
      case 'value':
        fieldProps = {
          requeired: true,
          label: 'Value',
          placeholder: 'Type the Value',
          component: InputNumber 
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: '',
          placeholder: '',
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