import { WorkflowStatusType } from '@common/classes/types';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
// import { WithUser, withUser } from '@layout/hoc/withUser';
import { InputCustomer } from '@lookup/components/customer/input';
import { SelectProject } from '@project/components/select/project';
import { PurchaseRequestDetailFormView } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestDetailFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  formCurrencyType: string | null | undefined;
  formCustomer: string | null | undefined;
  isCurrencyIdr: boolean;
  onChangeCurrencyType: (event: any, newValue: string, oldValue: string) => void;
  onChangeRate: (event: any, newValue: number, oldValue: number) => void;
  onChangeValueIdr: (event: any, newValue: number, oldValue: number) => void;
  onChangeRequest: (event: any, newValue: number, oldValue: number) => void;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type PurchaseRequestDetailFormProps 
  = OwnProps
  // & WithUser
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<PurchaseRequestDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: PurchaseRequestDetailFormProps) => (name: string) => { 
    const { 
      intl, 
      formCustomer,
      formCurrencyType, isCurrencyIdr, 
      onChangeCurrencyType, onChangeValueIdr, 
      onChangeRate,
      // onChangeRequestItem
    } = props;
    // const { user } = props.userState;
    
    const projectFilter: any = {
      customerUids: formCustomer,
      statusTypes: WorkflowStatusType.Approved,
    };

    const fieldName = name.replace('information.', '');
    
    let fieldProps: SelectSystemOption & any = {};
  
    switch (fieldName) {
      case 'uid': 
      fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputText
        };
      break;
      
      case 'customerUid': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder`}),
          component: InputCustomer,
          customerUid: projectFilter
        };
        break;

      case 'projectUid':
        fieldProps = {
          required: true,
          disabled: isNullOrUndefined(formCustomer),
          category: 'project',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: !isNullOrUndefined(formCustomer) ? SelectProject : InputText,
          filter: projectFilter,
        };
        break;

      case 'currencyType': 
        fieldProps = {
          required: true,
          category: 'currency',
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          component: SelectSystem,
          onChange: onChangeCurrencyType
        };
        break;
      
      case 'date': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
        
      case 'rate':
        fieldProps = {
          type: 'number',
          required: !isCurrencyIdr,
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          disabled: isCurrencyIdr || isNullOrUndefined(formCurrencyType),
          component: InputNumber,
          onChange: onChangeRate
        };
        break;

      case 'request':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          component: InputNumber,
          onChange: onChangeValueIdr,
          disabled: true
        };
        break;

       case 'requestIDR':
         fieldProps = {
           type: 'number',
           disabled: true,
           component: InputNumber
         };
         break;
  
      case 'advance':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputNumber
        };
        break;
  
      case 'notes':
        fieldProps = {
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputText
        };
        break;
        
      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const PurchaseRequestDetailForm = compose<PurchaseRequestDetailFormProps, OwnProps>(
  injectIntl,
  // withUser,
  withHandlers<PurchaseRequestDetailFormProps, OwnHandlers>(handlerCreators),
)(PurchaseRequestDetailFormView);