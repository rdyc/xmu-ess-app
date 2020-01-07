import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { SelectPosition } from '@lookup/components/position/select';
import { SelectLookupRole } from '@lookup/components/role/select';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeAccessDetailFormView } from './AccountEmployeeAccessDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  companyUidValue: string | null | undefined;
  unitTypeValue: string | null | undefined;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeAccessDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<AccountEmployeeAccessDetailFormProps, OwnHandlers> = {
    generateFieldProps: (props: AccountEmployeeAccessDetailFormProps) => (name: string) => { 
      const { 
        intl, companyUidValue, unitTypeValue, formMode
      } = props;
      
      const fieldName = name.replace('access.', '');

      const byCompanyUid: any = companyUidValue;
      const byUnitType: any = unitTypeValue;

      const byCompanyFilter: any = {
        companyUid: companyUidValue,
      };
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {
        
        case 'employeeUid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.access.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.access.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };

        break;
        case 'uid':
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            disabled: true,
            component: InputText
          };
          break;
        
        case 'companyUid':
          fieldProps = {
            required: true,
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            component: SelectLookupCompany
          };
          break;

        case 'unitType':
          fieldProps = {
            category: 'unit',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            companyUid: byCompanyUid,
            disabled: ((companyUidValue === undefined || companyUidValue === null) || formMode === FormMode.Delete),
            component: SelectSystem
          };
          break;

        case 'departmentType':
          fieldProps = {
            category: 'department',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            companyUid: byCompanyUid,
            parentCode: byUnitType,
            disabled: ((companyUidValue === undefined || companyUidValue === null) || (unitTypeValue === undefined || unitTypeValue === null) || formMode === FormMode.Delete),
            component: SelectSystem
          };
          break;

        case 'levelType':
          fieldProps = {
            required: true,
            category: 'level',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            component: SelectSystem
          };
          break;

        case 'roleUid':
          fieldProps = {
            required: true,
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            filter: byCompanyFilter,
            disabled: ((companyUidValue === undefined || companyUidValue === null) || formMode === FormMode.Delete),
            component: SelectLookupRole
          };
          break;

        case 'positionUid':
          fieldProps = {
            required: true,
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            filter: byCompanyFilter,
            disabled: ((companyUidValue === undefined || companyUidValue === null) || formMode === FormMode.Delete),
            component: SelectPosition
          };
          break;

        case 'start': 
          fieldProps = {
            required: true,
            type: 'text',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            component: InputDate
          };
          break;

        case 'end': 
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            component: InputDate
          };
          break;
        
        default:
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            component: InputText
          };
          break;
      }
      return fieldProps;
  }
};

export const AccountEmployeeAccessDetailForm = compose<AccountEmployeeAccessDetailFormProps, OwnProps>(
  setDisplayName('AccountEmployeeAccessDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeAccessDetailFormProps, OwnHandlers>(handlerCreators),
)(AccountEmployeeAccessDetailFormView);