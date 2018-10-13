import { IEmployee } from '@account/classes/response';
import ListItemEmployeeSelector from '@account/components/views/ListItemEmployeeSelector';
import { ISystemList } from '@common/classes/response';
import { FormMode } from '@generic/types';
import { FieldInputCustomer, FieldInputDate, FieldInputNumber, FieldInputText } from '@layout/components/formFields';
import { FieldSelectSystem } from '@layout/components/formFields/FieldSelectSystem';
import { withUser, WithUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
import { IProjectDetail, IProjectDocument, IProjectSales, IProjectSite } from '@project/classes/response';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, setDisplayName } from 'recompose';
import { Field, FieldArray, InjectedFormProps, reduxForm, WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  mode: FormMode;
}

type AllProps 
  = InjectedIntlProps 
  & WithUser
  & WithWidth 
  & WithStyles<typeof styles>;

const registrationForm: React.SFC<AllProps & InjectedFormProps<IProjectDetail, OwnProps> & OwnProps> = props => { 
  const { mode } = props;

  const renderDetail = () => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.infoTitle"/>}
        subheader={<FormattedMessage id="project.infoSubTitle" />}
      />
      <CardContent>
        {/* projectUid & owner & ownerEmployeeUid */}
        {
          mode === FormMode.Edit && 
          <React.Fragment>
            <TextField
              fullWidth
              disabled
              margin="normal"
              label={<FormattedMessage id="project.field.uid" />}
              value={props.initialValues.uid}
            />
            <TextField
              fullWidth
              disabled
              margin="normal"
              label={<FormattedMessage id="project.field.owner" />}
              value={props.initialValues.owner ? props.initialValues.owner.fullName : ''}
            />
          </React.Fragment>
        }

        {/* customer & customerUid */}
        <Field
          type="text"
          name="customer"
          label={<FormattedMessage id="project.field.customer" />}
          component={FieldInputCustomer}
          onChange={(event: any, newValue: ICustomerList) => {
            props.change('customerUid', newValue.uid);
          }}
        />

        {/* project & projectType */}
        {
          mode === FormMode.New &&
          <Field
            type="project"
            name="project"
            label={<FormattedMessage id="project.field.type" />}
            component={FieldSelectSystem}
            onChange={(event: any, newValue: ISystemList | undefined) => {
              props.change('projectType', newValue ? newValue.type : '');
            }}
          />
        }
        {
          mode === FormMode.Edit &&
          <TextField
            fullWidth
            disabled={props.mode === FormMode.Edit}
            margin="normal"
            label={<FormattedMessage id="project.field.type" />}
            value={props.initialValues.project ? props.initialValues.project.value : ''}
          />
        }

        <Field
          type="text"
          name="name"
          label={<FormattedMessage id="project.field.name" />}
          component={FieldInputText}
        />
        <Field
          type="text"
          name="description"
          label={<FormattedMessage id="project.field.description" />}
          component={FieldInputText}
        />
        <Field
          type="text"
          name="contractNumber"
          label={<FormattedMessage id="project.field.contract" />}
          component={FieldInputText}
        />
        <Field
          type="text"
          name="start"
          label={<FormattedMessage id="project.field.start" />}
          component={FieldInputDate}
          // format={(value: any, name: string) => {
          //   console.log(value);
            
          // }}
        />
        <Field
          type="text"
          name="end"
          label={<FormattedMessage id="project.field.end" />}
          component={FieldInputDate}
        />
        <Field
          type="currency"
          name="currency"
          label={<FormattedMessage id="project.field.currency" />}
          component={FieldSelectSystem}
          onChange={(event: any, newValue: ISystemList | undefined) => {
            props.change('currencyType', newValue ? newValue.type : '');
          }}
        />
        <Field
          type="number"
          name="rate"
          disabled={props.mode === FormMode.Edit}
          label={<FormattedMessage id="project.field.rate" />}
          component={FieldInputNumber} 
        />
        {/* <TextField
          fullWidth
          disabled={props.mode === FormMode.Edit}
          margin="normal"
          label={<FormattedMessage id="project.field.rate" />}
          value={props.intl.formatNumber(props.initialValues.rate || 0)}
        /> */}
        <Field
          type="number"
          name="valueUsd"
          label={<FormattedMessage id="project.field.valueUsd" />}
          component={FieldInputNumber} 
          onChange={(event: any, newValue: number, oldValue: number) => {
            const rate = props.initialValues.rate || 0;

            props.change('valueIdr', newValue * rate);
          }}
        />
        <Field
          type="number"
          name="valueIdr"
          disabled
          label={<FormattedMessage id="project.field.valueIdr" />}
          component={FieldInputNumber}
        />
        {
          mode === FormMode.Edit &&
          <Field
            type="number"
            name="maxHours"
            disabled
            label={<FormattedMessage id="project.field.hours" />}
            component={FieldInputNumber}
          />
        }
      </CardContent>
    </Card>
  );

  const renderDocuments = (_name: string, title: string, subHeader: string, documents: IProjectDocument[]) => (
    <Card square>
      <CardHeader 
        title={title}
        subheader={subHeader}
      />
      <CardContent>
        {
          documents.map((item, index) => 
            item.document &&
            <div key={index}>
            <FormControlLabel
              key={index}
              label={item.document && item.document.value}
              control={
                <Field
                  key={index}
                  type="checkbox"
                  name={`${_name}[${index}].isAvailable`}
                  component={({ input, meta }: any) => 
                    <Checkbox 
                      {...input} 
                      key={index} 
                      value={item.uid}
                      disabled={meta.submitting}
                    />
                  }
                />
              } 
            />
          </div>
          )
        }
      </CardContent>
    </Card>
  );

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

  const renderSites = (sites: IProjectSite[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.siteTitle" />}
        subheader={<FormattedMessage id="project.siteSubTitle" />}
      />
      <CardContent>
        <List>
        {
          sites.map(item => 
            <ListItem disableGutters key={item.uid}>
              <Grid container>
                <Grid item xs={7}>
                  <ListItemText
                    primary={item.name} 
                    secondary={item.type ? item.type.value : 'N/A'}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography 
                    noWrap 
                    variant="display1" 
                    align="right"
                  >
                    <FormattedNumber value={item.value} />
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          )
        }
        </List>
      </CardContent>
    </Card>
  );

  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={4} xl={3}>
          {renderDetail()}
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={3}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              {
                props.initialValues.documents &&
                renderDocuments(
                  'documents',
                  props.intl.formatMessage({id: 'project.documentTitle'}), 
                  props.intl.formatMessage({id: 'project.documentSubTitle'}),
                  props.initialValues.documents
                )
              }
            </Grid>
            <Grid item xs={12}>
              {
                props.initialValues.documentPreSales &&
                renderDocuments(
                  'documentPreSales',
                  props.intl.formatMessage({id: 'project.documentPreSalesTitle'}), 
                  props.intl.formatMessage({id: 'project.documentPreSalesSubTitle'}),
                  props.initialValues.documentPreSales
                )
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <FieldArray name="sales" component={renderSales} />
            </Grid>
            <Grid item xs={12}>
              {
                props.initialValues.sites && 
                renderSites(props.initialValues.sites)
              }
            </Grid>
          </Grid>
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