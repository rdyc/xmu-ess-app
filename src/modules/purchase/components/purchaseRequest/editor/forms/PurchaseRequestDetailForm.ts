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
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
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
  // requestValue: number | undefined;
  onChangeCurrencyType: (event: any, newValue: string, oldValue: string) => void;
  onChangeRate: (event: any, newValue: number, oldValue: number) => void;
  onChangeValueIdr: (event: any, newValue: number, oldValue: number) => void;
  // onChangeRequest: (event: any, newValue: number, oldValue: number) => void;
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
        label: intl.formatMessage(purchaseMessage.request.field.uid),
        component: InputText
        };
      break;
      
      case 'customerUid': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(purchaseMessage.request.field.customerUid),
          placeholder: intl.formatMessage(purchaseMessage.request.field.customerUidPlaceholder),
          component: InputCustomer,
          customerUid: projectFilter
        };
        break;

      case 'projectUid':
        fieldProps = {
          required: true,
          disabled: isNullOrUndefined(formCustomer),
          category: 'project',
          label: intl.formatMessage(purchaseMessage.request.field.projectUid),
          placeholder: intl.formatMessage(purchaseMessage.request.field.projectUidPlaceholder),
          component: !isNullOrUndefined(formCustomer) ? SelectProject : InputText,
          filter: projectFilter,
        };
        break;

      case 'currencyType': 
        fieldProps = {
          required: true,
          category: 'currency',
          label: intl.formatMessage(purchaseMessage.request.field.currencyType),
          placeholder: intl.formatMessage(purchaseMessage.request.field.currencyTypePlaceholder),
          component: SelectSystem,
          onChange: onChangeCurrencyType
        };
        break;
      
      case 'date': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(purchaseMessage.request.field.date),
          placeholder: intl.formatMessage(purchaseMessage.request.field.datePlaceholder),
          component: InputDate
        };
        break;
        
      case 'rate':
        fieldProps = {
          type: 'number',
          required: !isCurrencyIdr,
          label: intl.formatMessage(purchaseMessage.request.field.rate),
          placeholder: intl.formatMessage(purchaseMessage.request.field.ratePlaceholder),
          disabled: isCurrencyIdr || isNullOrUndefined(formCurrencyType),
          component: InputNumber,
          onChange: onChangeRate
        };
        break;

      case 'request':
        fieldProps = {
          type: 'number',
          label: intl.formatMessage(purchaseMessage.request.field.request),
          placeholder: intl.formatMessage(purchaseMessage.request.field.requestPlaceholder),
          component: InputNumber,
          onChange: onChangeValueIdr,
          disabled: true
        };
        break;

       case 'requestInIDR':
         fieldProps = {
           type: 'number',
           label: intl.formatMessage(purchaseMessage.request.field.requestInIDR),
           disabled: true,
           component: InputNumber
         };
         break;
  
      case 'advance':
        fieldProps = {
          type: 'number',
          label: intl.formatMessage(purchaseMessage.request.field.advance),
          placeholder: intl.formatMessage(purchaseMessage.request.field.advancePlaceholder),
          component: InputNumber
        };
        break;
  
      case 'notes':
        fieldProps = {
          label: intl.formatMessage(purchaseMessage.request.field.notes),
          placeholder: intl.formatMessage(purchaseMessage.request.field.notesPlaceholder),
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
  withHandlers<PurchaseRequestDetailFormProps, OwnHandlers>(handlerCreators),
)(PurchaseRequestDetailFormView);