import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { StructureDetailFormView } from './StructureDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type StructureDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<StructureDetailFormProps, OwnHandlers> = {
    generateFieldProps: (props: StructureDetailFormProps) => (name: string) => { 
      const { 
        intl
      } = props;
      
      const fieldName = name.replace('information.', '');
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {  
        case 'uid': 
          fieldProps = {
            disabled: true,
            label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
            component: InputText
          };
          break;
        
        case 'companyUid':
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
            component: SelectLookupCompany
          };
          break;

        case 'inactiveDate': 
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
            disablePast: true,
            component: InputDate
          };
          break;
        
        default:
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
            component: InputText
          };
          break;
      }
      return fieldProps;
  }
};

export const StructureDetailForm = compose<StructureDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<StructureDetailFormProps, OwnHandlers>(handlerCreators),
)(StructureDetailFormView);