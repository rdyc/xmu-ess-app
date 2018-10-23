import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

import { SiteDetailFormView } from './SiteDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type SiteDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<SiteDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: SiteDetailFormProps) => (name: string) => { 
    const { intl } = props;
    
    const fieldName = name.replace('information.', '');
    
    let fieldProps: SelectSystemOption & any = {};
  
    switch (fieldName) {
      case 'name': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `project.site.field.${name}.placeholder`}),
          component: InputText
        };
        break;

      case 'siteType':
        fieldProps = {
          required: true,
          category: 'site',
          placeholder: intl.formatMessage({id: `project.site.field.${name}.placeholder`}),
          component: SelectSystem,
        };
        break;

      case 'value':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({id: `project.site.field.${name}.placeholder`}),
          component: InputNumber
        };
        break;
    
      default:
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `project.site.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const SiteDetailForm = compose<SiteDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<SiteDetailFormProps, OwnHandlers>(handlerCreators),
)(SiteDetailFormView);