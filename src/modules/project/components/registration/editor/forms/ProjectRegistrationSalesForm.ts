import { IEmployee } from '@account/classes/response';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithVariables, withVariables } from '@layout/hoc/withVariables';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { ProjectSalesFormData } from '@project/components/registration/editor/forms/ProjectRegistrationContainerForm';
import {
  ProjectRegistrationSalesFormView,
} from '@project/components/registration/editor/forms/ProjectRegistrationSalesFormView';
import { projectMessage } from '@project/locales/messages/projectMessage';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface IOwnProps {
  context: WrappedFieldArrayProps<ProjectSalesFormData>;
}

interface IOwnHandlers {
  handleSelected: (employee: IEmployee) => boolean;
}

export type ProjectRegistrationSalesFormProps
  = IOwnProps
  & IOwnHandlers
  & WithUser
  & WithLayout
  & WithStyles
  & WithWidth
  & WithVariables
  & InjectedIntlProps;

const handlerCreators: HandleCreators<ProjectRegistrationSalesFormProps, IOwnHandlers> = {
  handleSelected: (props: ProjectRegistrationSalesFormProps) => (employee: IEmployee): boolean => { 
    const { context, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    try {
      // get all
      const employees = context.fields.getAll();
      
      // check existing
      const isExist = employees.filter(item => item.employeeUid === employee.uid).length > 0;

      // don't insert if exist
      if (isExist) {
        alertAdd({
          time: new Date,
          message: intl.formatMessage(projectMessage.registration.message.duplicateSales)
        });

        return false;
      }

      // go away
      context.fields.push({
        uid: undefined,
        employeeUid: employee.uid,
        fullName: employee.fullName,
        email: employee.email
      });

      return true;
    } catch (error) {
      return false;
    }
  }
};

export const ProjectRegistrationSalesForm = compose<ProjectRegistrationSalesFormProps, IOwnProps>(
  setDisplayName('ProjectRegistrationSalesForm'),
  withUser,
  withLayout,
  withStyles(styles),
  withWidth(),
  withVariables,
  injectIntl,
  withHandlers(handlerCreators),
)(ProjectRegistrationSalesFormView);