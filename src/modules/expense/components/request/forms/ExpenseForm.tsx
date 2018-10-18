import { IExpenseDetail } from '@expense/classes/response';
import { InformationForm } from '@expense/components/request/forms/InformationForm';
import { FormMode } from '@generic/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  Button,
  Grid,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
// import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import {
  BaseFieldsProps,
  Fields,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';

const formName = 'ExpenseForm';

interface OwnProps {
  mode: FormMode;
}

interface FormValueProps {
  formIsExpense: boolean | false;
}

type AllProps 
  = FormValueProps
  & InjectedIntlProps 
  & WithUser
  & WithWidth 
  & WithStyles;

const requestForm: React.SFC<AllProps & InjectedFormProps<IExpenseDetail, OwnProps> & OwnProps> = props => { 
  
  const renderInformation = (context: BaseFieldsProps) => 
    <InformationForm 
      context={context} 
    />;

  const informationFieldNames = [
    'date', 'expenseType', 'customerUid', 'projectUid',  
    'value', 'location', 'address', 'name', 
    'title', 'notes'
  ];

  const renderForm = (
    <form 
      onSubmit={props.handleSubmit}
    >
      <Grid 
        container
        spacing={24}
      >
        <Grid
          item
          key="information"
          xs={12}
          md={4}
        >
          <Fields 
            names={informationFieldNames} 
            component={renderInformation}
          />
        </Grid>
      </Grid>

      <div 
        className={classNames(props.classes.marginFarTop, props.classes.marginWideBottom, props.classes.forceRight)}>
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
          disabled={props.submitting}
        >
          <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit' } />
        </Button>
      </div>
    </form>
  );

  return renderForm;
};

const enhance = compose<AllProps, InjectedFormProps<IExpenseDetail, OwnProps> & OwnProps>(
  setDisplayName(formName),
  withUser,
  withWidth(),
  withStyles(styles),
  injectIntl,
)(requestForm);

export default reduxForm<IExpenseDetail, OwnProps>({
  form: formName, 
  touchOnChange: true
})(enhance);