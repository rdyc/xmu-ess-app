import { IEmployee } from '@account/classes/response';
import ListItemEmployeeSelector from '@account/components/views/ListItemEmployeeSelector';
import { ProjectType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
import { IProjectDetail, IProjectSales } from '@project/classes/response';
import DocumentForm from '@project/components/registration/forms/DocumentForm';
import { InformationForm } from '@project/components/registration/forms/InformationForm';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import {
  BaseFieldsProps,
  FieldArray,
  Fields,
  formValueSelector,
  InjectedFormProps,
  reduxForm,
  WrappedFieldArrayProps,
} from 'redux-form';

const formName = 'ProjectRegistrationForm';

interface OwnProps {
  mode: FormMode;
}

interface FormValueProps {
  formIsProject: boolean | false;
  formIsPresales: boolean | false;
  formIsCurrencyIDR: boolean | false;
  formCurrencyType: string | undefined;
  formRate: number | 1;
  formValueUsd: number | 1;
}

type AllProps 
  = FormValueProps
  & InjectedIntlProps 
  & WithUser
  & WithWidth 
  & WithStyles;

const registrationForm: React.SFC<AllProps & InjectedFormProps<IProjectDetail, OwnProps> & OwnProps> = props => { 
  const { formIsProject, formIsPresales, formIsCurrencyIDR, formRate, formCurrencyType, change } = props;

  const handleChangeRate = (event: any, newValue: number, oldValue: number) => {
    change('valueIdr', newValue * formRate);
  };

  const handleChangeValueIdr = (event: any, newValue: number, oldValue: number) => {
    change('valueIdr', newValue * formRate);
  };

  const handleChangeCurrencyType = (event: any, newValue: string, oldValue: string) => {
    if (newValue === 'SCR01') {
      change('information.rate', 1);
    }
  };
  
  const renderInformation = (context: BaseFieldsProps) => 
    <InformationForm 
      context={context} 
      isCurrencyIdr={formIsCurrencyIDR}
      formCurrencyType={formCurrencyType}
      onChangeCurrencyType={handleChangeCurrencyType}
      onChangeRate={handleChangeRate}
      onChangeValueIdr={handleChangeValueIdr}
    />;

  const renderSales = (context: WrappedFieldArrayProps<IProjectSales>) => {
    const { classes, width } = props;
    const { user } = props.userState;

    const handleSelectedCallback = (employee: IEmployee): boolean => {
      try {
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
    };

    return (
      <Card square>
        <CardHeader 
          title={<FormattedMessage id="project.salesTitle" />}
          subheader={<FormattedMessage id="project.salesSubTitle" />}
        />
        <CardContent>
          <List>
            {
              context.fields.map((field, index) => {
                const sales = context.fields.get(index);

                return (
                  <ListItem 
                    disableGutters 
                    key={index}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={sales.employee ? sales.employee.fullName : sales.employeeUid} 
                      >
                        <PersonIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={sales.employee && sales.employee.fullName} 
                      secondary={sales.employee && sales.employee.email}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => context.fields.remove(index)}>
                        <DeleteForeverIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            }
            <Divider className={classNames(classes.marginFarTop, classes.marginFarBottom)} />
            <ListItemEmployeeSelector
              width={width}
              companyUids={user && [user.company.uid]}
              onSelected={(employee: IEmployee) => handleSelectedCallback(employee)}
            />
          </List>
        </CardContent>
      </Card>
    );
  };

  const renderProjectDocs = (context: WrappedFieldArrayProps<any>) => 
    <DocumentForm 
      category="project"
      // title={props.intl.formatMessage({id: 'project.documentTitle'})}
      // subHeader={props.intl.formatMessage({id: 'project.documentSubTitle'})}
      context={context} 
    />;

  const renderPresalesDocs = (context: WrappedFieldArrayProps<any>) => 
    <DocumentForm 
      category="preSales"
      // title={props.intl.formatMessage({id: 'project.documentPreSalesTitle'})}
      // subHeader={props.intl.formatMessage({id: 'project.documentPreSalesSubTitle'})}
      context={context} 
    />;

  const informationFieldNames = [
    'customerUid', 'projectType', 'name', 'description', 
    'contract', 'start', 'end', 'currencyType', 
    'rate', 'valueUsd', 'valueIdr'
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
        
        {(formIsProject || formIsPresales) &&   
          <Grid
            item
            key="documents"
            xs={12}
            md={4}
          >
            {formIsProject && 
              <FieldArray 
              name="documents" 
              component={renderProjectDocs}
              />
            }

            {formIsPresales &&
              <FieldArray
              name="documentPreSales"
              component={renderPresalesDocs}
              />
            }
          </Grid>
        }

        <Grid
          item
          key="sales"
          xs={12}
          md={4}
        >
          <FieldArray 
            name="sales" 
            component={renderSales}
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

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const projectType = selector(state, 'projectType');
  const currencyType = selector(state, 'currencyType');
  const rate = selector(state, 'rate');
  const valueUsd = selector(state, 'valueUsd');
  
  return {
    formIsProject: projectType === ProjectType.Project,
    formIsPresales: projectType === ProjectType.PreSales,
    formIsCurrencyIDR: currencyType === 'SCR01',
    formCurrencyType: currencyType,
    formRate: rate,
    formValueUsd: valueUsd 
  };
};

const enhance = compose<AllProps, InjectedFormProps<IProjectDetail, OwnProps> & OwnProps>(
  setDisplayName(formName),
  withUser,
  withWidth(),
  withStyles(styles),
  injectIntl,
  connect(mapStateToProps),
)(registrationForm);

export default reduxForm<IProjectDetail, OwnProps>({
  form: formName, 
  touchOnChange: true
})(enhance);