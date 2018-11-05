import { WorkflowStatusType } from '@common/classes/types';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
import { SelectProject } from '@project/components/select/project';
import { RequestDetailFormView } from '@travel/components/request/editor/forms/RequestDetailFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  customerUidValue: string | null | undefined;
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
      intl, customerUidValue,
    } = props;

    const projectFilter: any = {
      customerUids: customerUidValue,
      statusTypes: WorkflowStatusType.Approved,
    };

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
      fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputText
      };
      break;

        case 'fullName':
        fieldProps = {
          disabled: true,
          component: InputText
        };
        break;

        case 'position':
        fieldProps = {
          disabled: true,
          component: InputText
        };
        break;

        case 'customerUid': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputCustomer
        };
        break;

        case 'projectUid': 
        fieldProps = {
          required: true,
          disabled: isNullOrUndefined(customerUidValue),
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: !isNullOrUndefined(customerUidValue) ? SelectProject : InputText,
          filter: projectFilter
        };
        break;

        case 'destinationType': 
        fieldProps = {
          required: true,
          category: 'destination',
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: SelectSystem,
        };
        break;
        
        case 'activityType': 
        fieldProps = {
          required: true,
          category: 'purpose',
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: SelectSystem,
        };
        break;

        case 'start': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputDate
        };
        break;

        default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }
    return fieldProps;
  }
};

export const RequestDetailForm = compose<RequestDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<RequestDetailFormProps, OwnHandlers>(handlerCreators),
)(RequestDetailFormView);