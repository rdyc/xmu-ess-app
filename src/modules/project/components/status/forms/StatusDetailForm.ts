import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { WithAllowedStatusType, withAllowedStatusType } from '@project/hoc/withAllowedStatusType';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

import { StatusDetailFormView } from './StatusDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  statusType: string | null | undefined;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type StatusDetailFormProps 
  = OwnProps
  & OwnHandlers
  & WithAllowedStatusType
  & InjectedIntlProps;

const handlerCreators: HandleCreators<StatusDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: StatusDetailFormProps) => (name: string) => { 
    const { allowedStatusTypes, intl, statusType } = props;
    
    const fieldName = name.replace('information.', '');
    
    let fieldProps: SelectSystemOption & any = {};
  
    switch (fieldName) {
      case 'statusType':
        fieldProps = {
          required: true,
          category: 'status',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: SelectSystem,
          onlyForTypes: allowedStatusTypes(statusType)
        };
        break;
    
      default:
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const StatusDetailForm = compose<StatusDetailFormProps, OwnProps>(
  withAllowedStatusType,
  injectIntl,
  withHandlers<StatusDetailFormProps, OwnHandlers>(handlerCreators),
)(StatusDetailFormView);