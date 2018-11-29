import { SelectSystemOption } from '@common/components/select';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { CommonDetailFormView } from './CommonDetailFormView';

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
        default:
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(commonMessage.system.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(commonMessage.system.fieldFor(name, 'fieldPlaceholder')),
            component: InputText
          };
          break;
      }
      return fieldProps;
  }
};

export const CommonDetailForm = compose<CommonDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<CommonDetailFormProps, OwnHandlers>(handlerCreators),
)(CommonDetailFormView);