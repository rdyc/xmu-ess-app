import { ConnectedReduxProps, FormMode } from '@generic/types';
import { FieldInputDate, FieldInputText } from '@layout/components/formFields';
import { ILeaveRequestDetail } from '@leave/classes/response';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  WithStyles,
} from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface OwnProps {
  mode: FormMode;
  companyUid: string;
  positionUid: string;
  leaveRequestUid: string;
}

type AllProps = InjectedFormProps<ILeaveRequestDetail, OwnProps> & 
                ConnectedReduxProps &
                InjectedIntlProps &
                WithWidth &
                WithStyles<typeof styles>;

const leaveRequestForm: React.SFC<AllProps & OwnProps> = props => { 
  const renderDetail = () => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="leaveRequest.infoTitle"/>}
        subheader={<FormattedMessage id="leaveRequest.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          disabled
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.uid" />}
          value={props.initialValues.uid}
        />
        <TextField
          fullWidth
          disabled
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.type" />}
          value={props.initialValues.leave ? props.initialValues.leave.value : 'N/A'}
        />
        <Field
          type="text"
          name="start"
          label={<FormattedMessage id="leaveRequest.field.start" />}
          component={FieldInputDate}
        />
        <Field
          type="text"
          name="end"
          label={<FormattedMessage id="leaveRequest.field.end" />}
          component={FieldInputDate}
        />
        <Field
          type="text"
          name="address"
          label={<FormattedMessage id="leaveRequest.field.address" />}
          component={FieldInputText}
        />
        <Field
          type="text"
          name="contactNumber"
          label={<FormattedMessage id="leaveRequest.field.contactNumber" />}
          component={FieldInputText}
        />
        <Field
          type="text"
          name="reason"
          label={<FormattedMessage id="leaveRequest.field.reason" />}
          component={FieldInputText}
        />
      </CardContent>
    </Card>
  );

  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={4} xl={3}>
          {renderDetail()}
        </Grid>
      </Grid>
      <div className={classNames(props.classes.marginFarTop, props.classes.marginWideBottom, props.classes.forceRight)}>
        <Button 
          type="button"
          color="default"
          disabled={props.submitting}
          onClick={props.reset}
        >
          <FormattedMessage id={'global.action.reset' } />
        </Button>
        <Button 
          type="submit"
          color="secondary"
          disabled={!props.valid || props.submitting}
        >
          <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit' } />
        </Button>
      </div>
    </form>
  );
};

const LeaveRequestFormComponent = reduxForm<ILeaveRequestDetail, OwnProps>({
  form: 'leaveRequestForm'
})(leaveRequestForm);

export default LeaveRequestFormComponent;