import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { parentTypeTranslator } from '@common/helper';
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
  category: string;
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
        intl, category
      } = props;
      
      const fieldName = name.replace('information.', '');
      
      let fieldProps: SelectSystemOption & any = {};

      const selectType = parentTypeTranslator(category);
  
      switch (fieldName) {    
        case 'parentCode':
          fieldProps = {
            category: selectType,
            label: intl.formatMessage(commonMessage.system.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(commonMessage.system.fieldFor(name, 'fieldPlaceholder')),
            component: SelectSystem
          };
          break;
        
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