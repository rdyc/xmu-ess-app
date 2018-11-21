import { layoutMessage } from '@layout/locales/messages';
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
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';
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
  
  const dialogTitle = () => {
    switch (editAction) {
      case 'update': return projectMessage.site.page.modifyTitle;
      case 'delete': return projectMessage.site.page.deleteTitle;
    
      default: return projectMessage.site.page.newTitle;
    }
  };

  const dialogSubTitle = () => {
    switch (editAction) {
      case 'update': return projectMessage.site.page.modifySubHeader;
      case 'delete': return projectMessage.site.page.deleteSubHeader;
    
      default: return projectMessage.site.page.newSubHeader;
    }
  };

  const renderDialog = (
    <Dialog 
      open={isOpenDialog} 
      fullScreen={isMobile}
    >
      <DialogTitle disableTypography>
        <Typography variant="title" color="primary">
          {props.intl.formatMessage(dialogTitle())}
        </Typography>

        <Typography variant="subheading">
          {props.intl.formatMessage(dialogSubTitle())}
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
          {props.intl.formatMessage(layoutMessage.action.discard)}
        </Button>

        {
          editAction !== 'delete' &&
          <Button 
            type="button"
            color="secondary"
            onClick={() => ref.current && ref.current.reset()}
          >
            {props.intl.formatMessage(layoutMessage.action.reset)}
          </Button>
        }

        <Button 
          type="submit"
          color="secondary"
          onClick={() => ref.current && ref.current.submit()}
        >
          {props.intl.formatMessage(props.submitting ? layoutMessage.text.processing : layoutMessage.action.submit)}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderSites = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(projectMessage.site.section.itemTitle)}
        subheader={props.intl.formatMessage(projectMessage.site.section.itemSubHeader)}
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
            {props.intl.formatMessage(projectMessage.site.option.modify)}
          </MenuItem>
          <MenuItem onClick={() => handleEdit('delete')}>
            {props.intl.formatMessage(projectMessage.site.option.remove)}
          </MenuItem>
        </Menu>
      </CardContent>
      <CardActions>
        <Button 
          color="secondary"
          onClick={() => handleNew()}
        >
          {props.intl.formatMessage(projectMessage.site.option.new)}
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