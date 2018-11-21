import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

import { SiteDetailFormView } from './SiteDetailFormView';

interface OwnProps {
  disabledControls: boolean;
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
    const { intl, disabledControls } = props;
    
    let fieldProps: SelectSystemOption & any = {};
  
    switch (name) {
      case 'name': 
        fieldProps = {
          disabled: disabledControls,
          required: true,
          label: intl.formatMessage(projectMessage.site.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.site.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'siteType':
        fieldProps = {
          disabled: disabledControls,
          required: true,
          category: 'site',
          label: intl.formatMessage(projectMessage.site.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.site.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem,
        };
        break;

      case 'value':
        fieldProps = {
          disabled: disabledControls,
          type: 'number',
          label: intl.formatMessage(projectMessage.site.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.site.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;
    
      default:
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(projectMessage.site.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.site.fieldFor(name, 'fieldPlaceholder')),
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