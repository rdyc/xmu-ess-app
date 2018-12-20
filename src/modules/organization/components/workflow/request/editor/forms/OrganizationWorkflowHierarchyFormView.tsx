import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';
import { OrganizationWorkflowHierarchyFormProps } from './OrganizationWorkflowHierarchyForm';

export const OrganizationWorkflowHierarchyFormView: React.SFC<OrganizationWorkflowHierarchyFormProps> = props => (
  <Card square>
    <CardHeader
      title="Workflow hierarchy" // {props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
      subheader="" // {props.intl.formatMessage(projectMessage.registration.section.siteSubHeader)}
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
        <MenuItem onClick={() => alert('update')}>
          {props.intl.formatMessage(projectMessage.site.option.modify)}
        </MenuItem>
        <MenuItem onClick={() => props.context.fields.remove(props.hierarchyIndex)}>
          {props.intl.formatMessage(projectMessage.site.option.remove)}
        </MenuItem>
      </Menu>
    </CardContent>
    <CardActions>
      <Button
        color="secondary"
        onClick={() => alert('new')}
      >
        <AddIcon />
      </Button>
    </CardActions>
  </Card>
);