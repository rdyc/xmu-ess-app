import { ConnectedReduxProps, FormMode } from '@generic/types';
import { FieldInputDate, FieldInputText } from '@layout/components/formFields';
import { IPositionDetail } from '@lookup/classes/response';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  WithStyles,
} from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage,  InjectedIntlProps } from 'react-intl';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface OwnProps {
  mode: FormMode;
  positionUid: string;
}

type AllProps = InjectedFormProps<IPositionDetail, OwnProps> & 
                ConnectedReduxProps &
                InjectedIntlProps &
                WithWidth &
                WithStyles<typeof styles>;

const positionFormComponent: React.SFC<AllProps & OwnProps> = props => { 
  const renderDetail = () => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="position.infoTitle"/>}
        subheader={<FormattedMessage id="position.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          disabled
          margin="normal"
          label={<FormattedMessage id="position.field.uid" />}
          value={props.initialValues.uid}
        />
        <TextField
          fullWidth
          disabled
          margin="normal"
          label={<FormattedMessage id="position.field.company" />}
          value={props.initialValues.company ? props.initialValues.company.name : 'N/A'}
        />
        {/* <Field
          type="text"
          name="company"
          label={<FormattedMessage id="position.field.company" />}
          component={FieldInputCompany}
          onChange={(event: any, newValue: ICompanyList) => {
            props.change('companyUid', newValue.uid);
          }}
        /> */}
        <Field
          type="text"
          name="name"
          label={<FormattedMessage id="position.field.name" />}
          component={FieldInputText}
        />
        <Field
          type="text"
          name="inactiveDate"
          label={<FormattedMessage id="position.field.inactiveDate" />}
          component={FieldInputDate}
        />
        <FormControlLabel 
          label={<FormattedMessage id="position.field.isAllowMultiple"/>}
          control={<Field
            type="checkbox"
            name="isAllowMultiple"
            component={ ({ input, meta }: any) =>
              <Checkbox
                {...input}
                value={'isAllowMultiple'}
                disabled={meta.submitting}
              />}
          />}
        />
        <Field
          type="text"
          name="description"
          label={<FormattedMessage id="position.field.description" />}
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

export const PositionFormComponent = reduxForm<IPositionDetail, OwnProps>({
  form: 'positionForm'
})(positionFormComponent);