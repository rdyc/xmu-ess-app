import { ProjectType } from '@common/classes/types';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
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
  customerUidValue: string | undefined;
  isPresalesActivity: boolean;
  projectUidValue: string | undefined;
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
      customerUidValue, isPresalesActivity, projectUidValue,
    } = props;
    
    const { user } = props.userState;

    const _projectTypes = isPresalesActivity ? ProjectType.PreSales : [ProjectType.Project, ProjectType.ExtraMiles, ProjectType.NonProject];
    
    const projectFilter: any = {
      customerUid: customerUidValue,
      projectTypes: _projectTypes
    };

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputText
        };
        break;

      case 'activityType':
        fieldProps = {
          category: 'activity',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: SelectSystem
        };
        break;

      case 'customerUid':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputCustomer
        };
        break;

      case 'projectUid':
        fieldProps = {
          type: 'text',
          disabled: isNullOrUndefined(customerUidValue),
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: SelectProjectAssigment,
          filter: projectFilter
        };
        break;

      case 'siteUid':
        fieldProps = {
          type: 'text',
          disabled: isNullOrUndefined(projectUidValue),
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: !isNullOrUndefined(projectUidValue) ? SelectProjectSite : InputText,
          companyUid: user && user.company.uid,
          projectUid: projectUidValue
        };
        break;

      case 'date':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputDate
        };
        break;

      case 'start':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputTime
        };
        break;

      case 'end':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputTime
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
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