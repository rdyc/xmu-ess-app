import { IEmployee } from '@account/classes/response';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { IProjectSales } from '@project/classes/response';
import { RegistrationSalesFormView } from '@project/components/registration/editor/forms/RegistrationSalesFormView';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<IProjectSales>;
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
        employee: {
          uid: employee.uid,
          joinDate: employee.joinDate,
          inactiveDate: null,
          employmentNumber: employee.employmentNumber,
          employmentType: null,
          employment: null,
          fullName: employee.fullName,
          email: employee.email,
          mobilePhone: null,
          address: null,
          genderType: employee.genderType,
          gender: null
        },
        changes: null
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
  injectIntl,
  withHandlers<RegistrationSalesFormProps, OwnHandlers>(handlerCreators),
)(RegistrationSalesFormView);