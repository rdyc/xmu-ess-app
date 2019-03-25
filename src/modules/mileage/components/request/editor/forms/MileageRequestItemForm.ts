import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import { MileageRequestItemFormView } from '@mileage/components/request/editor/forms/MileageRequestItemFormView';
import styles from '@styles';
import {
  WithTimesheetMileages,
  withTimesheetMileages
} from '@timesheet/hoc/withTimesheetMileages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

interface OwnProps {
  year?: number | undefined;
  month?: number | undefined;
}

interface OwnState {
  nolValue: boolean;
}

export type ItemFormProps 
  = WithTimesheetMileages 
  & WithUser 
  & WithStyles<typeof styles>
  & OwnProps 
  & OwnState 
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<ItemFormProps, {}> = {
  componentDidMount() {
    const { year, month } = this.props;
    const { user } = this.props.userState;
    const { loadAllMileages } = this.props.timesheetMileagesDispatch;
    if (user) {
      if (year && month) {
        loadAllMileages({
          filter: {
            companyUid: user.company.uid,
            year: this.props.year,
            month: this.props.month
          }
        });
      }
    }
  },
  componentWillUnmount() {
    
    const { timesheetMileagesDispatch } = this.props;

    timesheetMileagesDispatch.loadAllDispose();
  }
};

export const MileageRequestItemForm = compose<ItemFormProps, OwnProps>(
  withUser,
  withStyles(styles),
  withTimesheetMileages,
  injectIntl,
  lifecycle<ItemFormProps, {}>(lifecycles)
)(MileageRequestItemFormView);
