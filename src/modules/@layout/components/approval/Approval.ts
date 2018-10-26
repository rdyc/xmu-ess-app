import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
// import { ApprovalOptions } from '@generic/types/ApprovalOptions';
import { InputRadio } from '@layout/components/input/radio';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { ApprovalView } from './ApprovalView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  valid: boolean;
  submitting: boolean;
  title?: string | undefined;
  subHeader?: string | undefined;
  labelSubmit?: string | undefined;
  labelProcessing?: string | undefined;
  isApprove: boolean | true;
  onChangeApprovalOption: (event: any, newValue: string, oldValue: string) => void;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type ApprovalProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<ApprovalProps, OwnHandlers> = {
    generateFieldProps: (props: ApprovalProps) => (name: string) => { 
      const { 
        intl, isApprove, onChangeApprovalOption
      } = props;
      
      const fieldName = name.replace('information.', '');
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {
        case 'isApproved': 
          fieldProps = {
            names: ['approve', 'reject'],
            component: InputRadio,
            onChange: onChangeApprovalOption
          };
          break;

        case 'remark':
          fieldProps = {
            type: 'text',
            required: !isApprove,
            disabled: isApprove,
            placeholder: intl.formatMessage({id: `global.form.approval.field.${fieldName}.placeholder`}),
            component: InputText
          };
          break;
      
        default:
          fieldProps = {
            type: 'text',
            placeholder: intl.formatMessage({id: `global.form.approval.field.${fieldName}.placeholder`}),
            component: InputText
          };
          break;
      }
      return fieldProps;
  }
};

export const Approval = compose<ApprovalProps, OwnProps>(
  injectIntl,
  withHandlers<ApprovalProps, OwnHandlers>(handlerCreators),
)(ApprovalView);