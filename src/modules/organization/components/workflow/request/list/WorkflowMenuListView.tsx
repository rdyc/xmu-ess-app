import { layoutMessage } from '@layout/locales/messages';
import { IMenu } from '@lookup/classes/response';
import { Badge, Button, Divider, Grid, Hidden, IconButton, ListItem, Paper, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SyncIcon from '@material-ui/icons/Sync';
import TuneIcon from '@material-ui/icons/Tune';
import { isMenusWithWorkflow } from '@organization/helper/isMenusWithWorkflow';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { isNullOrUndefined } from 'util';
import { WorkflowListFilter } from './WorkflowListFilter';
// import { OrganizationWorkflowFilter } from './OrganizationWorkflowFilter';
import { WorkflowMenuListProps } from './WorkflowMenuList';

export const WorkflowMenuListView: React.SFC<WorkflowMenuListProps> = props => {
  const { isLoading, response } = props.lookupMenuState.list;

  const RenderWorkflowMenuList = (menus: IMenu[]) => {
    const len = menus.length - 1;

    return (
      menus.map((menu, i) =>
        isMenusWithWorkflow(menu.uid) &&
        <div key={menu.uid}>
          <ListItem
            button={!isLoading}
            key={menu.uid}
          >
            <Grid container spacing={8}>
              <Hidden xsDown>
                <Grid item md={4}>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={3}>
                      <Typography
                        variant="body2"
                        noWrap={true}
                        paragraph={false}
                      >
                        {menu.uid}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
              <Grid item xs={12} md={8}>
                <Grid container>
                  <Grid item xs={7} md={9}>
                    <Typography
                      variant="body2"
                      noWrap={true}
                      paragraph={false}
                      align={isWidthDown('sm', props.width) ? 'left' : 'inherit'}
                    >
                      {menu.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={5} md={3}>
                    <Button
                      size="small"
                      disabled={isNullOrUndefined(props.companyUid)}
                      onClick={() => props.handleGoToDetail(menu.uid, props.companyUid)}
                    >
                      <FormattedMessage {...layoutMessage.action.details} />
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      disabled={isNullOrUndefined(props.companyUid)}
                      onClick={() => props.handleRedirectTo(`/organization/workflow/form`, { menuUid: menu.uid, companyUid: props.companyUid })}
                    >
                      <FormattedMessage {...layoutMessage.action.modify} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          {len !== i && <Divider />}
        </div>
      )
    );
  };

  const render = (
    <React.Fragment>
      <Paper square>
        <Toolbar>
        <Typography
          noWrap
          variant="body2"
          className={props.classes.flex}
        >
        </Typography>
          <Tooltip
            placement="bottom"
            title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
          >
            <IconButton
              id="option-field"
              disabled={isLoading}
              onClick={props.handleFilterVisibility}
            >
              <Badge
                  invisible={!props.companyUid}
                  badgeContent={<CheckCircleIcon color="primary" />}
              >
                <TuneIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip
            placement="bottom"
            title={props.intl.formatMessage(layoutMessage.tooltip.refresh)}
          >
            <IconButton
              id="option-sync"
              disabled={isLoading}
              onClick={() => props.setOnRefresh()}
            >
              <SyncIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Paper>
      <Paper>
        {
          isLoading &&
          <FormattedMessage {...layoutMessage.text.loading} />
        }
        <Grid item xs={12}>
          {
            !isLoading &&
            response &&
            response.data &&
            RenderWorkflowMenuList(response.data)
          }
        </Grid>
      </Paper>

      <WorkflowListFilter
        isOpen={props.isFilterOpen}
        onClose={props.handleFilterVisibility}
        onApply={props.handleFilterApplied}
      />
    </React.Fragment>
  );
  return render;
};