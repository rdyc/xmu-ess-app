import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { MileageExceptionDetailFormView } from './MileageExceptionDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  companyUidValue: string | undefined;
  projectUidValue: string | undefined;

}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type MileageExceptionDetailFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<MileageExceptionDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: MileageExceptionDetailFormProps) => (name: string) => {
    const { intl, formMode, companyUidValue, /* projectUidValue */ } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
        
      case 'companyUid':
        fieldProps = {
          disabled: formMode === FormMode.Edit,
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'roleUid':
        fieldProps = {
          disabled: formMode === FormMode.Edit  || isNullOrUndefined(companyUidValue),
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        case 'percentage':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        case 'projectUid':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        case 'siteType':
        fieldProps = {
          category: 'site',
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

        case 'projectSiteUid':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        case 'description':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        case 'reason':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        case 'inactiveDate':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const MileageExceptionDetailForm = compose<MileageExceptionDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<MileageExceptionDetailFormProps, OwnHandlers>(handlerCreators)
)(MileageExceptionDetailFormView);