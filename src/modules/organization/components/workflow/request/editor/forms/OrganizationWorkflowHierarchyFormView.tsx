import { InputText } from '@layout/components/input/text';
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
  Divider,
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
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';
import { Field } from 'redux-form';
import { OrganizationWorkflowHierarchyFormProps } from './OrganizationWorkflowHierarchyForm';

export const OrganizationWorkflowHierarchyFormView: React.SFC<OrganizationWorkflowHierarchyFormProps> = props => {
  const isMobile = isWidthDown('sm', props.width);

  const renderDialog = (
    <Dialog 
      open={props.isOpenDialog} 
      fullScreen={isMobile}
    >
      <DialogTitle disableTypography>
        <Typography variant="title" color="primary">
          {'apa kek'}
        </Typography>

        <Typography variant="subheading">
          {'okee'}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <div>
          <Field
            type="text"
            name={'employeeUid'}
            label={''}
            placeholder="Employee"
            component={InputText}
          />
          <Field
            type="text"
            name={'employeeUid'}
            label={''}
            placeholder="Employee"
            component={InputText}
          />
        </div>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={() => props.handleDialogClose()} color="secondary">
          {props.intl.formatMessage(layoutMessage.action.discard)}
        </Button>

        {/* {
          editAction !== 'delete' &&
          <Button 
            type="button"
            color="secondary"
            onClick={() => ref.current && ref.current.reset()}
          >
            {props.intl.formatMessage(layoutMessage.action.reset)}
          </Button>
        } */}

        {/* <Button 
          type="submit"
          color="secondary"
          onClick={() => ref.current && ref.current.submit()}
        >
          {props.intl.formatMessage(props.submitting ? layoutMessage.text.processing : layoutMessage.action.submit)}
        </Button> */}
      </DialogActions>
    </Dialog>
  );

  const renderHierarchy = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(organizationMessage.workflowSetup.section.hierarchyTitle)}
        subheader={props.intl.formatMessage(organizationMessage.workflowSetup.section.hierarchySubHeader)}
      />
      <CardContent>
        <List>
          {
            props.context.fields.map((field, index) => {
              const hierarchy = props.context.fields.get(index);
  
              return (
                <ListItem
                  disableGutters
                  key={index}
                >
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography
                        noWrap
                        variant="title"
                        align="left"
                      >
                        <FormattedNumber value={hierarchy.priority = index + 1} />
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <ListItemText
                        primary={hierarchy.hierarchyName}
                        primaryTypographyProps={{ noWrap: true }}
                        secondaryTypographyProps={{ noWrap: true }}
                      />
                    </Grid>
                  </Grid>
                  <ListItemSecondaryAction>
                    {/* <IconButton onClick={() => props.context.fields.remove(index)}>
                      <DeleteForeverIcon />
                    </IconButton> */}
                    <IconButton
                      id={`hierarchy-button-${index}`}
                      color="inherit"
                      aria-label="More"
                      onClick={() => props.handleMenuOpen(hierarchy, index)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          }
          <Divider className={classNames(props.classes.marginFarTop, props.classes.marginFarBottom)} />
        </List>
        <Menu
          anchorEl={document.getElementById(`hierarchy-button-${props.hierarchyIndex}`)} 
          open={props.isOpenMenu}
          onClose={props.handleMenuClose}
        >
          <MenuItem onClick={() => props.handleNew()}>
            {props.intl.formatMessage(organizationMessage.workflowSetup.option.modify)}
          </MenuItem>
          <MenuItem onClick={() => props.context.fields.remove(props.hierarchyIndex)}>
            {props.intl.formatMessage(organizationMessage.workflowSetup.option.remove)}
          </MenuItem>
        </Menu>
      </CardContent>
      <CardActions>
        <Button
          color="secondary"
          onClick={() => props.handleNew()}
        >
          <AddIcon />
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
      {/* <Grid item sm={12} md={4}>
        { 
          response &&
          <ProjectInformation data={response.data}/>
        }
      </Grid> */}      
      <Grid item sm={12} md={12}>
        {renderHierarchy}
        {renderDialog}
      </Grid>
    </Grid>
  );

  return render;
};