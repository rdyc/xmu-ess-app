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
  year?: number | undefined;
  month?: number | undefined;
  formikBag?: FormikProps<IMileageFormValue>;
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
    const { formikBag } = this.props;
    const { response: thisResponse } = this.props.timesheetMileagesState;
    const { response: prevResponse } = prevProps.timesheetMileagesState;

    if (formikBag) {

      if (thisResponse && thisResponse.data && prevResponse) {
        const shouldUpdate = !shallowEqual(thisResponse.data, prevResponse.data || {});
        if (shouldUpdate) {
          if (thisResponse.data.length >= 1) {
            let value: number = 0;

            formikBag.setFieldValue('items', thisResponse.data);
            formikBag.setFieldValue('itemsIsExist', true);
            thisResponse.data.forEach(item => 
              value = value + item.value
            );
            formikBag.setFieldValue('itemValues', value);  
          } else {
            formikBag.setFieldValue('items', []);
            formikBag.setFieldValue('itemsIsExist', false);
            formikBag.setFieldValue('itemValues', 0);
          }
        }
      } 
      console.log(formikBag.values.items);
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
