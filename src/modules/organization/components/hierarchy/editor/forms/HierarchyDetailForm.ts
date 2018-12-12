import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { HierarchyDetailFormView } from './HierarchyDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type CommonDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<CommonDetailFormProps, OwnHandlers> = {
    generateFieldProps: (props: CommonDetailFormProps) => (name: string) => { 
      const { 
        intl
      } = props;
      
      const fieldName = name.replace('information.', '');
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {   
        case 'companyUid':
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(organizationMessage.hierarchy.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.hierarchy.fieldFor(name, 'fieldPlaceholder')),
            component: SelectLookupCompany
          };
          break;
        
        default:
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(organizationMessage.hierarchy.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.hierarchy.fieldFor(name, 'fieldPlaceholder')),
            component: InputText
          };
          break;
      }
      return fieldProps;
  }
};

export const HierarchyDetailForm = compose<CommonDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<CommonDetailFormProps, OwnHandlers>(handlerCreators),
)(HierarchyDetailFormView);