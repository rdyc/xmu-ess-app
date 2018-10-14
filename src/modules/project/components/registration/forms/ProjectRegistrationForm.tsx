import { IEmployee } from '@account/classes/response';
import ListItemEmployeeSelector from '@account/components/views/ListItemEmployeeSelector';
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
import InformationForm from '@project/components/registration/forms/InformationForm';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, setDisplayName } from 'recompose';
import { BaseFieldsProps, FieldArray, Fields, InjectedFormProps, reduxForm, WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  mode: FormMode;
}

type AllProps 
  = InjectedIntlProps 
  & WithUser
  & WithWidth 
  & WithStyles;

const registrationForm: React.SFC<AllProps & InjectedFormProps<IProjectDetail, OwnProps> & OwnProps> = props => { 
  // const { mode } = props;

  // const renderDetail = (
  //   <Card square>
  //     <CardHeader 
  //       title={<FormattedMessage id="project.infoTitle"/>}
  //       subheader={<FormattedMessage id="project.infoSubTitle" />}
  //     />
  //     <CardContent>
  //       {/* projectUid & owner & ownerEmployeeUid */}
  //       {
  //         mode === FormMode.Edit && 
  //         <React.Fragment>
  //           <TextField
  //             fullWidth
  //             disabled
  //             margin="normal"
  //             label={<FormattedMessage id="project.field.uid" />}
  //             value={props.initialValues.uid}
  //           />
  //           <TextField
  //             fullWidth
  //             disabled
  //             margin="normal"
  //             label={<FormattedMessage id="project.field.owner" />}
  //             value={props.initialValues.owner ? props.initialValues.owner.fullName : ''}
  //           />
  //         </React.Fragment>
  //       }

  //       {/* customer & customerUid */}
  //       <Field
  //         type="text"
  //         name="customer"
  //         label={<FormattedMessage id="project.field.customer" />}
  //         component={FieldInputCustomer}
  //         onChange={(event: any, newValue: ICustomerList) => {
  //           props.change('customerUid', newValue.uid);
  //         }}
  //       />

  //       {/* project & projectType */}
  //       {
  //         mode === FormMode.New &&
  //         <Field
  //           type="project"
  //           name="project"
  //           label={<FormattedMessage id="project.field.type" />}
  //           component={FieldSelectSystem}
  //           onChange={(event: any, newValue: ISystemList | undefined) => {
  //             props.change('projectType', newValue ? newValue.type : '');
  //           }}
  //         />
  //       }
  //       {
  //         mode === FormMode.Edit &&
  //         <TextField
  //           fullWidth
  //           disabled={props.mode === FormMode.Edit}
  //           margin="normal"
  //           label={<FormattedMessage id="project.field.type" />}
  //           value={props.initialValues.project ? props.initialValues.project.value : ''}
  //         />
  //       }

  //       <Field
  //         type="text"
  //         name="name"
  //         label={<FormattedMessage id="project.field.name" />}
  //         component={FieldInputText}
  //       />
  //       <Field
  //         type="text"
  //         name="description"
  //         label={<FormattedMessage id="project.field.description" />}
  //         component={FieldInputText}
  //       />
  //       <Field
  //         type="text"
  //         name="contractNumber"
  //         label={<FormattedMessage id="project.field.contract" />}
  //         component={FieldInputText}
  //       />
  //       <Field
  //         type="text"
  //         name="start"
  //         label={<FormattedMessage id="project.field.start" />}
  //         component={FieldInputDate}
  //         // format={(value: any, name: string) => {
  //         //   console.log(value);
            
  //         // }}
  //       />
  //       <Field
  //         type="text"
  //         name="end"
  //         label={<FormattedMessage id="project.field.end" />}
  //         component={FieldInputDate}
  //       />
  //       <Field
  //         type="currency"
  //         name="currency"
  //         label={<FormattedMessage id="project.field.currency" />}
  //         component={FieldSelectSystem}
  //         onChange={(event: any, newValue: ISystemList | undefined) => {
  //           props.change('currencyType', newValue ? newValue.type : '');
  //         }}
  //       />
  //       <Field
  //         type="number"
  //         name="rate"
  //         disabled={props.mode === FormMode.Edit}
  //         label={<FormattedMessage id="project.field.rate" />}
  //         component={FieldInputNumber} 
  //       />
  //       {/* <TextField
  //         fullWidth
  //         disabled={props.mode === FormMode.Edit}
  //         margin="normal"
  //         label={<FormattedMessage id="project.field.rate" />}
  //         value={props.intl.formatNumber(props.initialValues.rate || 0)}
  //       /> */}
  //       <Field
  //         type="number"
  //         name="valueUsd"
  //         label={<FormattedMessage id="project.field.valueUsd" />}
  //         component={FieldInputNumber} 
  //         onChange={(event: any, newValue: number, oldValue: number) => {
  //           const rate = props.initialValues.rate || 0;

  //           props.change('valueIdr', newValue * rate);
  //         }}
  //       />
  //       <Field
  //         type="number"
  //         name="valueIdr"
  //         disabled
  //         label={<FormattedMessage id="project.field.valueIdr" />}
  //         component={FieldInputNumber}
  //       />
  //       {
  //         mode === FormMode.Edit &&
  //         <Field
  //           type="number"
  //           name="maxHours"
  //           disabled
  //           label={<FormattedMessage id="project.field.hours" />}
  //           component={FieldInputNumber}
  //         />
  //       }
  //     </CardContent>
  //   </Card>
  // );
   
  const renderInformation = (context: BaseFieldsProps) => 
    <InformationForm context={context} />;

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
      category="document"
      title={props.intl.formatMessage({id: 'project.documentTitle'})}
      subHeader={props.intl.formatMessage({id: 'project.documentSubTitle'})}
      context={context} 
    />;

  const renderPresalesDocs = (context: WrappedFieldArrayProps<any>) => 
    <DocumentForm 
      category="documentPreSales"
      title={props.intl.formatMessage({id: 'project.documentPreSalesTitle'})}
      subHeader={props.intl.formatMessage({id: 'project.documentPreSalesSubTitle'})}
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
        <Grid
          item
          key="documents"
          xs={12}
          md={4}
        >
          <FieldArray 
            name="documents" 
            component={renderProjectDocs}
          />

          <FieldArray
            name="documentPreSales"
            component={renderPresalesDocs}
          />
        </Grid>
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

const enhance = compose<AllProps, InjectedFormProps<IProjectDetail, OwnProps> & OwnProps>(
  setDisplayName('ProjectRegistrationForm'),
  withUser,
  withWidth(),
  withStyles(styles),
  injectIntl
)(registrationForm);

export default reduxForm<IProjectDetail, OwnProps>({
  form: 'ProjectRegistrationForm', 
  touchOnChange: true
})(enhance);