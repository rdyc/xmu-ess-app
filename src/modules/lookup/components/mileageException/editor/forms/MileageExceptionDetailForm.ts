import { WorkflowStatusType } from '@common/classes/types';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { SelectProject } from '@project/components/select/project';
import { SelectProjectSite } from '@project/components/select/projectSite';
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
  showSite: boolean;
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
    const { intl, formMode, companyUidValue, projectUidValue, showSite } = props;

    const projectFilter: any = {
      statusTypes: WorkflowStatusType.Approved,
      activeOnly: true
    };

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
      
      case 'siteType':
        fieldProps = {
          category: 'site',
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;
      
      case 'projectUid':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: SelectProject,
          filter: projectFilter
        };
        break;
      
      case 'siteUid':
        fieldProps = {
          disabled: !showSite,
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: !isNullOrUndefined(projectUidValue) ? SelectProjectSite : InputText,
          projectUid: projectUidValue
        };
        break;

      case 'percentage':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.mileageException.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
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
          component: InputDate
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