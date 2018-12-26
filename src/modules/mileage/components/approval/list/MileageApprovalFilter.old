import { Grid, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { EmployeeFilter } from '../filter';

interface OwnProps {
  handleFind: (event: any, newValue: string, oldValue: string) => void;
}

const formName = 'MileageApprovalFilter';

type AllProps = OwnProps & WithWidth & InjectedIntlProps;

const mileageApprovalFilter: React.SFC<AllProps> = props => {

  const render = (
    <Grid container spacing={16}>
      <Grid item xs={12} md={6}>
        <Field
          type="text"
          name="employee"
          label={props.intl.formatMessage(mileageMessage.approval.field.filterEmployee)}
          placeholder={props.intl.formatMessage(mileageMessage.approval.field.filterEmployee)}
          component={EmployeeFilter}
          onChange={props.handleFind}
        />
      </Grid>
    </Grid>
  );

  return render;
};

const enhance = compose<AllProps, OwnProps & InjectedFormProps<{}, OwnProps>>(injectIntl, withWidth())(mileageApprovalFilter);

export const MileageApprovalFilter = reduxForm<{}, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);