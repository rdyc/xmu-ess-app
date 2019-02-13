import { ProjectType } from '@common/classes/types';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDateTimesheet } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { InputTime } from '@layout/components/input/time';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InputCustomer } from '@lookup/components/customer/input';
import { SelectProjectAssigment } from '@project/components/select/projectAssignment';
import { SelectProjectSite } from '@project/components/select/projectSite';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { TimesheetEntryDetailFormView } from './TimesheetEntryDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  activityTypeValue: string | undefined;
  customerUidValue: string | undefined;
  isPresalesActivity: boolean;
  isMaintenanceActivity: boolean;
  projectUidValue: string | undefined;
  showSiteProject: boolean;
  minDate: Date;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type EntryDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps
  & WithUser;

const handlerCreators: HandleCreators<EntryDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: EntryDetailFormProps) => (name: string) => {
    const {
      intl,
      activityTypeValue,
      customerUidValue,
      isPresalesActivity,
      isMaintenanceActivity,
      projectUidValue,
      showSiteProject,
      minDate
    } = props;

    const { user } = props.userState;

    const projectFilter: any = {
      employeeUid: user && user.uid,
      customerUid: customerUidValue,
      projectTypes: isPresalesActivity ? ProjectType.PreSales : 
                    isMaintenanceActivity ? ProjectType.Maintenance : 
                    [ProjectType.Project, ProjectType.ExtraMiles, ProjectType.NonProject].join(',')
    };

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'activityType':
        fieldProps = {
          required: true,
          category: 'activity',
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      case 'customerUid':
        fieldProps = {
          required: true,
          disabled: isNullOrUndefined(activityTypeValue),
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: !isNullOrUndefined(activityTypeValue) ? InputCustomer : InputText
        };
        break;

      case 'projectUid':
        fieldProps = {
          required: true,
          disabled: isNullOrUndefined(customerUidValue),
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: !isNullOrUndefined(customerUidValue) ? SelectProjectAssigment : InputText,
          filter: projectFilter
        };
        break;

      case 'siteUid':
        fieldProps = {
          required: true,
          disabled: !showSiteProject,
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: !isNullOrUndefined(projectUidValue) ? SelectProjectSite : InputText,
          companyUid: user && user.company.uid,
          projectUid: projectUidValue
        };
        break;

      case 'date':
        fieldProps = {
          minDate,
          required: true,
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: InputDateTimesheet
        };
        break;

      case 'start':
        fieldProps = {
          required: true,
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: InputTime
        };
        break;

      case 'end':
        fieldProps = {
          required: true,
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: InputTime
        };
        break;

      case 'description':
        fieldProps = {
          required: true,
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
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

export const TimesheetEntryDetailForm = compose<EntryDetailFormProps, OwnProps>(
  injectIntl,
  withUser,
  withHandlers<EntryDetailFormProps, OwnHandlers>(handlerCreators),
)(TimesheetEntryDetailFormView);