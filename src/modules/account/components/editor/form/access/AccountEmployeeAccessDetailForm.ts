import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { SelectPosition } from '@lookup/components/position/select';
import { SelectLookupRole } from '@lookup/components/role/select';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { AccountEmployeeAccessDetailFormView } from './AccountEmployeeDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  companyUidValue: string | null | undefined;
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
        intl, companyUidValue
      } = props;
      
      const fieldName = name.replace('information.', '');

      const byCompanyUid = companyUidValue;

      const byCompanyFilter: any = {
        companyUid: companyUidValue,
      };
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {       
        case 'companyUid':
          fieldProps = {
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
            disabled: isNullOrUndefined(companyUidValue),
            component: SelectSystem
          };
          break;

        case 'departmentType':
          fieldProps = {
            category: 'department',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            companyUid: byCompanyUid,
            disabled: isNullOrUndefined(companyUidValue),
            component: SelectSystem
          };
          break;

        case 'levelType':
          fieldProps = {
            category: 'level',
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            component: SelectSystem
          };
          break;

        case 'roleUid':
          fieldProps = {
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            filter: byCompanyFilter,
            disabled: isNullOrUndefined(companyUidValue),
            component: SelectLookupRole
          };
          break;

        case 'positionUid':
          fieldProps = {
            label: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.access.fieldFor(fieldName, 'fieldPlaceholder')),
            filter: byCompanyFilter,
            disabled: isNullOrUndefined(companyUidValue),
            component: SelectPosition
          };
          break;

        case 'start': 
          fieldProps = {
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
  injectIntl,
  withHandlers<AccountEmployeeAccessDetailFormProps, OwnHandlers>(handlerCreators),
)(AccountEmployeeAccessDetailFormView);