import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDateLeave } from '@layout/components/input/date';
import { InputDateEndView } from '@layout/components/input/date/InputDateEndView';
import { InputText } from '@layout/components/input/text';
import { ILeaveGetEnd } from '@leave/classes/response';
import { LeaveRequestDetailFormView } from '@leave/components/request/editor/forms/LeaveRequestDetailFormView';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { InputLeave } from '@lookup/components/leave/input';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  // formRegularType: string | null | undefined;
  isRegularType: boolean;
  isAdmin: boolean;
  dataEnd: ILeaveGetEnd | undefined; 
  onChangeEnd: (event: any, newValue: string, oldValue: string) => void;
  // onChangeRegular: (event: any, newValue: string, oldValue: string) => void;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type RequestDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<RequestDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: RequestDetailFormProps) => (name: string) => { 
    const { 
      intl, formMode, isRegularType, onChangeEnd
    } = props;

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
      
      case 'leaveType':
        fieldProps = {
          required: formMode === FormMode.New,
          category: 'leave',
          disabled: formMode === FormMode.Edit,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem,
          // onChange: onChangeRegular
        };
        break;

      case 'regularType':
        fieldProps = {
          required: false,
          // disabled: !isRegularType,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          component: isRegularType ? InputLeave : InputText,
        };
        break;
      
      case 'start': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          component: InputDateLeave,
          onChange: onChangeEnd
        };
        break;
        
      case 'end': 
        fieldProps = {
          required: true,
          disabled: !isRegularType,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          value: !isRegularType && props.dataEnd,
          component: !isRegularType ? InputDateEndView : InputDateLeave
        };
        break;
      
      case 'address': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'contactNumber': 
        fieldProps = {
          type: 'number',
          required: true,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'reason': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const LeaveRequestDetailForm = compose<RequestDetailFormProps, OwnProps>(
  setDisplayName('LeaveRequestDetailForm'),
  injectIntl,
  withHandlers<RequestDetailFormProps, OwnHandlers>(handlerCreators),
)(LeaveRequestDetailFormView);