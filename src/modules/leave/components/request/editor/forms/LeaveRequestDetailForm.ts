import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDateLeave } from '@layout/components/input/date';
import { InputDateEnd } from '@layout/components/input/date/InputDateEnd';
import { InputText } from '@layout/components/input/text';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { LeaveRequestDetailFormView } from '@leave/components/request/editor/forms/LeaveRequestDetailFormView';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { InputLeave } from '@lookup/components/leave/input';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  startValue: string | undefined;
  regularValue: string | undefined;
  isRegularType: boolean;
  isAdmin: boolean;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type RequestDetailFormProps 
  = OwnProps
  & OwnHandlers
  & WithUser
  & InjectedIntlProps;

const handlerCreators: HandleCreators<RequestDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: RequestDetailFormProps) => (name: string) => { 
    const { 
      intl, formMode, isRegularType
    } = props;

    const endFilter: any = {
      start: props.startValue,
      regularType: props.regularValue,
      companyUid: props.userState.user && props.userState.user.company.uid
    };

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
        };
        break;

      case 'regularType':
        fieldProps = {
          required: false,
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
        };
        break;
        
      case 'end': 
        fieldProps = {
          required: true,
          disabled: isRegularType,
          label: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(leaveMessage.request.fieldFor(name, 'fieldPlaceholder')),
          filter: endFilter,
          component: isRegularType && props.startValue && props.regularValue ? InputDateEnd : InputDateLeave
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
  withUser,
  withHandlers<RequestDetailFormProps, OwnHandlers>(handlerCreators),
)(LeaveRequestDetailFormView);