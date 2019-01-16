import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

import { HourDetailFormView } from './HourDetailFormView';

interface IOwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface IOwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type HourDetailFormProps 
  = IOwnProps
  & IOwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<HourDetailFormProps, IOwnHandlers> = {
  generateFieldProps: (props: HourDetailFormProps) => (name: string) => { 
    const { intl } = props;
      
    let fieldProps: SelectSystemOption & any = {};
  
    switch (name) {
      case 'hours':
        fieldProps = {
          type: 'number',
          required: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;
    
      default:
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const HourDetailForm = compose<HourDetailFormProps, IOwnProps>(
  setDisplayName('HourDetailForm'),
  injectIntl,
  withHandlers(handlerCreators),
)(HourDetailFormView);