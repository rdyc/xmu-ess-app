import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputMonth } from '@layout/components/input/month';
import { InputText } from '@layout/components/input/text';
import { InputYear } from '@layout/components/input/year';
import { MileageRequestDetailFormView } from '@mileage/components/request/editor/forms/MileageRequestDetailFormView';
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

export type MileageRequestDetailFormProps = OwnProps &
  OwnHandlers &
  InjectedIntlProps;

const handlerCreators: HandleCreators<
  MileageRequestDetailFormProps,
  OwnHandlers
> = {
  generateFieldProps: (props: MileageRequestDetailFormProps) => (
    name: string
  ) => {
    const { intl } = props;

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'year':
        fieldProps = {
          required: true,
          label: intl.formatMessage({
            id: `mileage.request.field.${name}.placeholder`
          }),
          component: InputYear
        };
        break;

      case 'month':
        fieldProps = {
          required: true,
          label: intl.formatMessage({
            id: `mileage.request.field.${name}.placeholder`
          }),
          component: InputMonth
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({
            id: `project.field.${name}.placeholder`
          }),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const MileageRequestDetailForm = compose<
  MileageRequestDetailFormProps,
  OwnProps
>(
  injectIntl,
  withHandlers<MileageRequestDetailFormProps, OwnHandlers>(handlerCreators)
)(MileageRequestDetailFormView);
