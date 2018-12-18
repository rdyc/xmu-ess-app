import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { TravelSettlementDetailFormView } from './TravelSettlementDetailFormView';

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
          component: InputText
      };
      break;
        
      case 'start': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldName')),
          placeholder: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldPlaceholder')),
          component: InputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldName')),
          placeholder: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldPlaceholder')),
          component: InputDate
        };
        break;
      
        case 'comment': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldName')),
          placeholder: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        case 'total':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldName')),
          placeholder: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;

        default:
        fieldProps = {
          type: 'text',
          disabled: true,
          label: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldName')),
          placeholder: intl.formatMessage(travelMessage.request.fieldFor(fieldName, 'fieldPlaceholder')),
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
)(TravelSettlementDetailFormView);