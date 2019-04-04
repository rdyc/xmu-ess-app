import { WithUser, withUser } from '@layout/hoc/withUser';
import { MileageRequestItemFormView } from '@mileage/components/request/editor/forms/MileageRequestItemFormView';
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

export type ItemFormProps = WithTimesheetMileages & WithUser & OwnProps & OwnState & InjectedIntlProps;

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
  componentDidUpdate(prevProps: ItemFormProps) {
    const { year: thisYear, month: thisMonth } = this.props;
    const { year: prevYear, month: prevMonth } = prevProps;
    const { user } = this.props.userState;
    const { loadAllMileages } = this.props.timesheetMileagesDispatch;

    if (user) {
      if (thisYear !== prevYear || thisMonth !== prevMonth) {
        loadAllMileages({
          filter: {
            companyUid: user.company.uid,
            year: thisYear,
            month: thisMonth
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
  injectIntl,
  lifecycle<ItemFormProps, {}>(lifecycles)
)(MileageRequestItemFormView);
