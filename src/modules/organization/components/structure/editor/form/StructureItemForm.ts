import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { SelectPosition } from '@lookup/components/position/select';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { OrganizationStructureItemFormData } from './StructureForm';
import { StructureItemFormView } from './StructureItemFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<OrganizationStructureItemFormData>;
  companyUidValue: string | null | undefined;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type StructureItemFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<StructureItemFormProps, OwnHandlers> = {
    generateFieldProps: (props: StructureItemFormProps) => (name: string) => { 
      const { 
        intl, companyUidValue
      } = props;
      
      let fieldProps: SelectSystemOption & any = {};
      
      const positionFilter: any = {
        companyUid: companyUidValue,
      };
  
      switch (name) {
        case 'relationType':
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
            category: 'relation',
            component: SelectSystem
          };
          break;

        case 'sequence':
          fieldProps = {
            type: 'number',
            label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
            component: InputNumber
          };
          break;

        case 'positionUid':
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
            component: SelectPosition,
            disabled: isNullOrUndefined(companyUidValue),
            filter: positionFilter
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

export const StructureItemForm = compose<StructureItemFormProps, OwnProps>(
  injectIntl,
  withHandlers<StructureItemFormProps, OwnHandlers>(handlerCreators),
)(StructureItemFormView);