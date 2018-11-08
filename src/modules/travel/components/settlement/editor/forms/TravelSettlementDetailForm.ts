import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { RequestDetailFormView } from '@travel/components/request/editor/forms/RequestDetailFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type TravelSettlementDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<TravelSettlementDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: TravelSettlementDetailFormProps) => (name: string) => {
    const {
      intl, // formMode
    } = props;

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
      
        case 'comment': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputText
        };
        break;

        default:
        fieldProps = {
          type: 'text',
          disabled: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }
    return fieldProps;
  }
};

export const TravelSettlementDetailForm = compose<TravelSettlementDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<TravelSettlementDetailFormProps, OwnHandlers>(handlerCreators),
)(RequestDetailFormView);