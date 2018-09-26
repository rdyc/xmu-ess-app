import { InputText } from '@layout/components/formFields';
import { Button, Card, CardContent, CardHeader, Grid, TextField, WithStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, ListItemSecondaryAction, Divider } from '@material-ui/core';
import { IProjectDetail, IProjectSales } from '@project/interfaces/response';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Field, InjectedFormProps, reduxForm, FieldArray, WrappedFieldArrayProps } from 'redux-form';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type AllProps = InjectedFormProps<IProjectDetail> & 
                InjectedIntlProps &
                WithStyles<typeof styles>;

export const projectForm: React.StatelessComponent<AllProps> = props => { 

  // const handleSalesRemoved = (index: number) => {
  //   console.log(props.initialValues.sales);
    
  //   if (props.initialValues.sales) {
  //     props.initialValues.sales.splice(index, 1);
  //   }
    
  //   console.log(props.initialValues.sales);
  // };

  const renderDetail = () => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.infoTitle"/>}
        // subheader={<FormattedMessage id="project.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.uid" />}
          value={props.initialValues.uid}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.status" />}
          value={props.initialValues.status ? props.initialValues.status.value : 'N/A'}
        />
        <Field
          type="text"
          name="name"
          label={<FormattedMessage id="project.field.name" />}
          component={InputText}
        />
        <Field
          type="text"
          name="description"
          label={<FormattedMessage id="project.field.description" />}
          component={InputText}
        />
        <Field
          type="text"
          name="ownerEmployeeUid"
          label={<FormattedMessage id="project.field.owner" />}
          component={InputText}
        />
        {/* <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.customer" />}
          value={project.customer ? project.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.type" />}
          value={project.project ? project.project.value : 'N/A'}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.contract" />}
          value={project.contractNumber || 'N/A'}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.start" />}
          value={intl.formatDate(project.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.end" />}
          value={intl.formatDate(project.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.currency" />}
          value={project.currency ? project.currency.value : 'N/A'}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.rate" />}
          value={intl.formatNumber(project.rate || 0)}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.value" />}
          value={intl.formatNumber(project.valueUsd)}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.valueIdr" />}
          value={intl.formatNumber(project.valueIdr || 0)}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="project.field.hours" />}
          value={intl.formatNumber(project.maxHours)}
        /> */}
      </CardContent>
    </Card>
  );

  // const renderDocuments = (title: string, subHeader: string, documents: IProjectDocument[]) => (
  //   <Card square>
  //     <CardHeader 
  //       title={title}
  //       subheader={subHeader}
  //     />
  //     <CardContent>
  //       {
  //         documents.map(item => 
  //           item.document &&
  //           <div key={item.uid}>
  //             <FormControlLabel
  //               key={item.uid}
  //               label={item.document.value}
  //               control={<Checkbox checked={item.isAvailable}/>} 
  //             />
  //           </div>
  //         )
  //       }
  //     </CardContent>
  //   </Card>
  // );

  const renderSales = (context: WrappedFieldArrayProps<IProjectSales>) => {
    // console.log(context.fields.getAll());

    const allSales = context.fields.getAll();

    const handleSalesAdd = (sales: IProjectSales) => {
      context.fields.push(sales);
    };

    return (
      <Card square>
        <CardHeader 
          title={<FormattedMessage id="project.salesTitle" />}
          // subheader={<FormattedMessage id="project.salesSubTitle" />}
          action={
            <IconButton
              onClick={() => handleSalesAdd(allSales[0])}
            >
              <AddIcon/>
            </IconButton>
          }
        />
        <CardContent>
          <List>
            {
              context.fields.map((item, index) => {
                const sales = context.fields.get(index);

                console.log(sales);

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
            <Divider className={props.classes.marginFarTop} />
            <ListItem disableGutters>
              <TextField
                fullWidth
                margin="normal"
                label={<FormattedMessage id="project.field.sales" />}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleSalesAdd(allSales[0])}>
                  <AddIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  };

  // const renderSites = (sites: IProjectSite[]) => (
  //   <Card square>
  //     <CardHeader 
  //       title={<FormattedMessage id="project.siteTitle" />}
  //       subheader={<FormattedMessage id="project.siteSubTitle" />}
  //     />
  //     <CardContent>
  //       <List>
  //       {
  //         sites.map(item => 
  //           <ListItem disableGutters key={item.uid}>
  //             <Grid container>
  //               <Grid item xs={7}>
  //                 <ListItemText
  //                   primary={item.name} 
  //                   secondary={item.type ? item.type.value : 'N/A'}
  //                 />
  //               </Grid>
  //               <Grid item xs={5}>
  //                 <Typography 
  //                   noWrap 
  //                   variant="display1" 
  //                   align="right"
  //                 >
  //                   <FormattedNumber 
  //                     value={item.value} 
  //                   />
  //                 </Typography>
  //               </Grid>
  //             </Grid>
              
  //           </ListItem>
  //         )
  //       }
  //       </List>
  //     </CardContent>
  //   </Card>
  // );

  return (
    <form onSubmit={props.handleSubmit}>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={4} xl={3}>
        {renderDetail()}
      </Grid>
      {/* <Grid item xs={12} sm={12} md={4} xl={3}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {renderDocuments(intl.formatMessage({id: 'project.documentTitle'}), intl.formatMessage({id: 'project.documentSubTitle'}), response.data.documents)
            }
          </Grid>
          <Grid item xs={12}>
            {
              response &&
              response.data &&
              renderDocuments(intl.formatMessage({id: 'project.documentPreSalesTitle'}),  intl.formatMessage({id: 'project.documentPreSalesSubTitle'}), response.data.documentPreSales)
            }
          </Grid>
        </Grid>
          </Grid>*/}
      <Grid item xs={12} sm={12} md={4} xl={3}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
              <FieldArray name="sales" component={renderSales} />
            </Grid>
            {/* <Grid item xs={12}>
              {
                response &&
                response.data &&
                response.data.sites &&
                renderSites(response.data.sites)
              }
            </Grid> */}
          </Grid>
        </Grid>
      {/* <Grid item xs={12} sm={12} md={8} xl={3}>
        {
          response &&
          response.data &&
          response.data.workflow &&
          response.data.workflow.steps &&
          <WorkflowStep steps={response.data.workflow.steps} />
        }
      </Grid> */}
    </Grid>
      <div className={classNames(props.classes.marginFarTop, props.classes.forceRight)}>
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

const ProjectForm = reduxForm<IProjectDetail>({
  
})(projectForm);

export default ProjectForm;