import { IEmployee } from '@account/classes/response';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithVariables, withVariables } from '@layout/hoc/withVariables';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { ProjectSalesFormData } from '@project/components/registration/editor/forms/RegistrationForm';
import { RegistrationSalesFormView } from '@project/components/registration/editor/forms/RegistrationSalesFormView';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<ProjectSalesFormData>;
}

interface OwnHandlers {
  handleSelected: (employee: IEmployee) => boolean;
}

export type RegistrationSalesFormProps
   = OwnProps
   & OwnHandlers
   & WithUser
   & WithLayout
   & WithStyles
   & WithWidth
   & WithVariables
   & InjectedIntlProps;

const handlerCreators: HandleCreators<RegistrationSalesFormProps, OwnHandlers> = {
  handleSelected: (props: RegistrationSalesFormProps) => (employee: IEmployee): boolean => { 
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
          message: intl.formatMessage({id: 'project.message.registration.sales.duplication'})
        });

        return false;
      }

      // go away
      context.fields.push({
        uid: null,
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

export const RegistrationSalesForm = compose<RegistrationSalesFormProps, OwnProps>(
  withUser,
  withLayout,
  withStyles(styles),
  withWidth(),
  withVariables,
  injectIntl,
  withHandlers<RegistrationSalesFormProps, OwnHandlers>(handlerCreators),
)(RegistrationSalesFormView);