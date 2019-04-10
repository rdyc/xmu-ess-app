import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import { MileageRequestItemFormView } from '@mileage/components/request/editor/forms/MileageRequestItemFormView';
import styles from '@styles';
import {
  WithTimesheetMileages,
  withTimesheetMileages
} from '@timesheet/hoc/withTimesheetMileages';
import { FormikProps } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, shallowEqual, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { IMileageFormValue } from '../../form/MileageForm';

interface OwnProps {
  year: number;
  month: number;
  formikBag: FormikProps<IMileageFormValue>;
  handleSetInitialValues: (values: any) => void;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (uid: string) => OwnState;
}

export type ItemFormProps 
  = WithTimesheetMileages 
  & WithUser 
  & WithStyles<typeof styles>
  & OwnProps 
  & OwnState
  & OwnStateHandler
  & InjectedIntlProps;

const createProps: mapper<ItemFormProps, OwnState> = (): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

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
  componentWillUpdate(updatedProps: ItemFormProps) {
    const { year: thisYear, month: thisMonth } = this.props;
    const { year: updatedYear, month: updatedMonth } = updatedProps;
    const { user } = this.props.userState;
    const { loadAllMileages } = this.props.timesheetMileagesDispatch;

    if (user) {
      if (thisYear !== updatedYear || thisMonth !== updatedMonth) {
        loadAllMileages({
          filter: {
            companyUid: user.company.uid,
            year: updatedYear,
            month: updatedMonth
          }
        });
      }
    }
  },
  componentDidUpdate(prevProps: ItemFormProps) {
    const { response: thisResponse } = this.props.timesheetMileagesState;
    const { response: prevResponse } = prevProps.timesheetMileagesState;

    if (thisResponse && thisResponse.data && prevResponse) {
      const shouldUpdate = !shallowEqual(thisResponse.data, prevResponse.data || {});
      if (shouldUpdate) {
        const initialValues: IMileageFormValue = {
          year: (this.props.year).toString(),
          month: (this.props.month).toString(),
          items: []
        };
        
        thisResponse.data.forEach(item => initialValues.items.push({
          itemUid: item.uid,
          value: item.value
        }));

        this.props.handleSetInitialValues(initialValues);
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
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  lifecycle<ItemFormProps, {}>(lifecycles)
)(MileageRequestItemFormView);
