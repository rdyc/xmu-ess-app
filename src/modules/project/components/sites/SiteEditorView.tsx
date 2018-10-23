import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { FormInstance } from 'redux-form';

import { ProjectInformation } from '../registration/detail/shared/ProjectInformation';
import { SiteContainerForm } from './forms/SiteContainerForm';
import { SiteEditorProps } from './SiteEditor';

export const SiteEditorView: React.SFC<SiteEditorProps> = props => {
  const { initialValues, handleNew, handleEdit, isOpen } = props;
  const { response } = props.projectRegisterState.detail;
  const siteResponse = props.projectSiteState.response;
  const { formMode, handleCancel, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;

  const ref = React.createRef<FormInstance<any, any, any>>();

  // render dialog
  const renderDialog = (
    <Dialog
      open={isOpen}
      aria-labelledby="lookup-customer-dialog-title" 
    >
      <DialogContent>
        <SiteContainerForm
          ref={ref}
          formMode={formMode}
          initialValues={initialValues}
          validate={handleValidate}
          onSubmit={handleSubmit} 
          onSubmitSuccess={handleSubmitSuccess}
          onSubmitFail={handleSubmitFail}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCancel()} color="secondary">
          <FormattedMessage id="global.action.discard" />
        </Button>

        <Button 
          type="button"
          color="default"
          onClick={() => ref.current && ref.current.reset()}
        >
          <FormattedMessage id={'global.action.reset' }/>
        </Button>
        
        <Button 
          type="submit"
          color="secondary"
          onClick={() => ref.current && ref.current.submit()}
        >
          <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit' }/>
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderSites = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.siteTitle" />}
        subheader={<FormattedMessage id="project.siteSubTitle" />}
      />
      <CardContent>
        <List>
        {
          siteResponse &&
          siteResponse.data &&
          siteResponse.data.map(item => 
            <ListItem 
              key={item.uid}
              component="div"
              disableGutters={true}
              button
              onClick={() => handleEdit(item)} 
            >
              <Grid container>
                <Grid item xs={7}>
                  <ListItemText
                    primary={item.name} 
                    secondary={item.type ? item.type.value : 'N/A'}
                    primaryTypographyProps={{noWrap: true}}
                    secondaryTypographyProps={{noWrap: true}}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography 
                    noWrap 
                    variant="display1" 
                    align="right"
                  >
                    <FormattedNumber value={item.value}/>
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          )
        }
          <Divider/>
        </List>
        <Button 
          size="small"
          onClick={() => handleNew()}
        >
          <FormattedMessage id="project.site.action.new" />
        </Button>
      </CardContent>
    </Card>
  );

  const render = (
    <Grid 
      container
      spacing={16}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >  
      <Grid item sm={12} md={4}>
        { 
          response &&
          <ProjectInformation data={response.data}/>
        }
      </Grid>
      
      <Grid item sm={12} md={4}>
        {renderSites}
        {renderDialog}
      </Grid>
    </Grid>
  );

  return render;
};