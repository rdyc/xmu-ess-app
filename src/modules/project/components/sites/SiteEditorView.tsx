import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { FormInstance } from 'redux-form';

import { ProjectInformation } from '../registration/detail/shared/ProjectInformation';
import { SiteContainerForm } from './forms/SiteContainerForm';
import { SiteEditorProps } from './SiteEditor';

export const SiteEditorView: React.SFC<SiteEditorProps> = props => {
  const { 
    width,
    isOpenDialog, isOpenMenu, siteItemIndex, initialValues, editAction,
    handleNew, handleEdit, handleMenuOpen, handleMenuClose, 
  } = props;
  const { response } = props.projectRegisterState.detail;
  const siteResponse = props.projectSiteState.response;
  const { handleDialogClose, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;

  const ref = React.createRef<FormInstance<any, any, any>>();
  const isMobile = isWidthDown('sm', width);
  
  const dialogTitle = (): string => {
    switch (editAction) {
      case 'update': return 'project.form.site.editTitle';
      case 'delete': return 'project.form.site.deleteTitle';
    
      default: return 'project.form.site.addTitle';
    }
  };

  const dialogSubTitle = (): string => {
    switch (editAction) {
      case 'update': return 'project.form.site.editSubTitle';
      case 'delete': return 'project.form.site.deleteSubTitle';
    
      default: return 'project.form.site.addSubTitle';
    }
  };

  const renderDialog = (
    <Dialog 
      open={isOpenDialog} 
      fullScreen={isMobile}
    >
      <DialogTitle disableTypography>
        <Typography variant="title" color="primary">
          <FormattedMessage id={dialogTitle()} />
        </Typography>

        <Typography variant="subheading">
        <FormattedMessage id={dialogSubTitle()} />
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <SiteContainerForm
          ref={ref}
          formAction={editAction ? editAction : 'update'}
          initialValues={initialValues}
          validate={handleValidate}
          onSubmit={handleSubmit} 
          onSubmitSuccess={handleSubmitSuccess}
          onSubmitFail={handleSubmitFail}
        />
      </DialogContent>
      
      <DialogActions>
        <Button onClick={() => handleDialogClose()} color="secondary">
          <FormattedMessage id="global.action.discard" />
        </Button>

        {
          editAction !== 'delete' &&
          <Button 
            type="button"
            color="secondary"
            onClick={() => ref.current && ref.current.reset()}
          >
            <FormattedMessage id={'global.action.reset' }/>
          </Button>
        }

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
          siteResponse.data.map((item, index) => 
            <ListItem 
              key={item.uid}
              component="div"
              disableGutters={true}
            >
              <Grid container>
                <Grid item xs={6}>
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

              <ListItemSecondaryAction>
                <IconButton
                  id={`site-item-button-${index}`}
                  color="inherit"
                  aria-label="More"
                  onClick={() => handleMenuOpen(item, index)}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        }
        </List>

        <Menu
          anchorEl={document.getElementById(`site-item-button-${siteItemIndex}`)} 
          open={isOpenMenu}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleEdit('update')}>
            <FormattedMessage id="project.site.action.edit"/>
          </MenuItem>
          <MenuItem onClick={() => handleEdit('delete')}>
            <FormattedMessage id="project.site.action.delete"/>
          </MenuItem>
        </Menu>
      </CardContent>
      <CardActions>
        <Button 
          color="secondary"
          onClick={() => handleNew()}
        >
          <FormattedMessage id="project.site.action.new" />
        </Button>
      </CardActions>
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