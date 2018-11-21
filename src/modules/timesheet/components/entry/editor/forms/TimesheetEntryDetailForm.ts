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
  projectUidValue: string | undefined;
  showSiteProject: boolean;
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
      projectUidValue,
      showSiteProject
    } = props;

    const { user } = props.userState;

    const _projectTypes = isPresalesActivity ? ProjectType.PreSales : [ProjectType.Project, ProjectType.ExtraMiles, ProjectType.NonProject];

    const projectFilter: any = {
        employeeUid: user && user.uid,
        customerUid: customerUidValue,
        projectTypes: _projectTypes
    };

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
          component: InputText
        };
        break;

      case 'activityType':
        fieldProps = {
          required: true,
          category: 'activity',
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
          component: SelectSystem
        };
        break;

      case 'customerUid':
        fieldProps = {
          required: true,
          type: 'text',
          disabled: isNullOrUndefined(activityTypeValue),
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
          component: !isNullOrUndefined(activityTypeValue) ? InputCustomer : InputText
        };
        break;

      case 'projectUid':
        fieldProps = {
          required: true,
          type: 'text',
          disabled: isNullOrUndefined(customerUidValue),
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
          component: !isNullOrUndefined(customerUidValue) ? SelectProjectAssigment : InputText,
          filter: projectFilter
        };
        break;

      case 'siteUid':
        fieldProps = {
          required: true,
          type: 'text',
          disabled: !showSiteProject,
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
          component: !isNullOrUndefined(projectUidValue) ? SelectProjectSite : InputText,
          companyUid: user && user.company.uid,
          projectUid: projectUidValue
        };
        break;

      case 'date':
        fieldProps = {
          required: true,
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
          component: InputDateTimesheet
        };
        break;

      case 'start':
        fieldProps = {
          required: true,
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
          component: InputTime
        };
        break;

      case 'end':
        fieldProps = {
          required: true,
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
          component: InputTime
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.entry.field.${name}.placeholder` }),
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