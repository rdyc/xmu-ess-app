import { layoutMessage } from '@layout/locales/messages';
import { IMenu } from '@lookup/classes/response';
import { Badge, Button, Divider, Grid, Hidden, IconButton, ListItem, Paper, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TuneIcon from '@material-ui/icons/Tune';
import { isMenusWithWorkflow } from '@organization/helper';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { WorkflowListFilter } from './WorkflowListFilter';
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
                  <Grid item xs={9} md={10}>
                    <Typography
                      variant="body2"
                      noWrap={true}
                      paragraph={false}
                      align={isWidthDown('sm', props.width) ? 'left' : 'inherit'}
                    >
                      {menu.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={3} md={2}>
                    <Button
                      size="small"
                      color="secondary"
                      disabled={props.companyUid === undefined || props.companyUid === null}
                      onClick={() => props.handleGoToDetail(menu.uid, props.companyUid)}
                    >
                      <FormattedMessage {...layoutMessage.action.details} />
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
          variant="h6"
          className={props.classes.flex}
        >
        {
          !props.companyUid &&
          props.intl.formatMessage(organizationMessage.workflowSetup.text.selectCompany)
        }

        {
          props.dataCompany && props.dataCompany.name
        }
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
                  badgeContent={<CheckCircleIcon color="secondary" />}
              >
                <TuneIcon />
              </Badge>
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
            props.companyUid &&
            RenderWorkflowMenuList(response.data)
          }
        </Grid>
      </Paper>

      <WorkflowListFilter
        isOpen={props.isFilterOpen}
        onClose={props.handleFilterVisibility}
        onApply={props.handleFilterApplied}
        initialProps={{
          companyUid: props.companyUid
        }}
      />
    </React.Fragment>
  );
  return render;
};