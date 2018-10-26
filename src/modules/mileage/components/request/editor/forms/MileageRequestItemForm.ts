import { WithUser, withUser } from '@layout/hoc/withUser';
import { MileageRequestItemFormView } from '@mileage/components/request/editor/forms/MileageRequestItemFormView';
import {
  WithTimesheetMileages,
  withTimesheetMileages
} from '@timesheet/hoc/withTimesheetMileages';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

interface OwnProps {
  year?: number | undefined;
  month?: number | undefined;
}

export type ItemFormProps = WithTimesheetMileages & WithUser & OwnProps;

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
  withTimesheetMileages,
  lifecycle<ItemFormProps, {}>(lifecycles)
)(MileageRequestItemFormView);
