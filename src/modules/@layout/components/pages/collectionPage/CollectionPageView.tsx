import { layoutMessage } from '@layout/locales/messages';
import {
  Checkbox,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SyncIcon from '@material-ui/icons/Sync';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { CollectionPageProps } from './CollectionPage';

export const CollectionPageView: React.SFC<CollectionPageProps> = props => (
  <React.Fragment>
    <Toolbar>
      <Typography
        noWrap
        variant="body1"
        className={props.classes.flex}
      >
        {
          props.isLoading &&
          <FormattedMessage {...layoutMessage.text.loading} />
        }

        {
          !props.isLoading &&
          props.response &&
          props.response.metadata &&
          <FormattedMessage {...layoutMessage.text.dataInfo} values={{
            total: props.response.metadata.total
          }} />
        }
      </Typography>
      
      {
        props.response &&
        <React.Fragment>
          <IconButton disabled={props.isLoading}>
            <FilterListIcon />
          </IconButton>
          <IconButton disabled={props.isLoading}>
            <SortByAlphaIcon />
          </IconButton>
          <IconButton disabled={props.isLoading}>
            <LibraryBooksSharpIcon />
          </IconButton>
          <IconButton disabled={props.isLoading}>
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton disabled={props.isLoading}>
            <SyncIcon />
          </IconButton>
        </React.Fragment>
      }
    </Toolbar>

    {
      props.response &&
      props.response.data &&
      props.response.data.map((item, index) => {
        const bind = props.config.onBind(item, index);

        return (
          <ExpansionPanel key={bind.key} tabIndex={index}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {
                props.config.hasSelection &&
                <Checkbox
                  checked={props.selected.indexOf(item.uid) !== -1}
                  onChange={props.handleOnChangeSelection}
                  value={item.uid}
                  style={{
                    height: 25, 
                    width: 25,
                    marginLeft: -10,
                    marginRight: 10
                  }}
                />
              }

              <Grid container>
                <Grid item xs={9} md={9}>
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body1" noWrap={true} paragraph={false}>{bind.primary}</Typography>
                    </Grid>
                    <Hidden xsDown>
                      <Grid item xs={6} md={4}>
                        <Typography variant="body1" noWrap={true} paragraph={false}>{bind.secondary}</Typography>
                      </Grid>
                    </Hidden>
                    <Grid item xs={12} md={4}>
                      <Typography variant="caption" noWrap={true} paragraph={false}>{bind.tertiary}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={3} md={3}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body1" noWrap={true} paragraph={false} align="right">{bind.quaternary}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" noWrap={true} paragraph={false} align="right">{bind.quinary}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            
            <ExpansionPanelDetails>
              {
                props.config.summaryComponent(item)
              }
            </ExpansionPanelDetails>
            
            {
              props.config.actionComponent &&
              <ExpansionPanelActions>
                {
                  props.config.actionComponent(item)
                }
              </ExpansionPanelActions>
            }
          </ExpansionPanel>
        );
      })
    } 

    {
      props.response &&
      props.response.metadata &&
      props.response.metadata.paginate &&
      <Toolbar>
        <IconButton
          disabled={props.isLoading || !props.response.metadata.paginate.previous}
          onClick={() => props.setPagePrevious()}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Typography
          noWrap
          variant="body1"
          align="center"
          className={props.classes.flex}
        >
          {
            props.isLoading &&
            <FormattedMessage {...layoutMessage.text.loading} />
          }

          {
            !props.isLoading &&
            <FormattedMessage 
              {...layoutMessage.text.pagingInfo} 
              values={{
                current: props.response.metadata.paginate.current,
                total: props.response.metadata.paginate.total
              }}
            />
          }
        </Typography>

        <IconButton 
          disabled={props.isLoading || !props.response.metadata.paginate.next}
          onClick={() => props.setPageNext()}
        >
          <ChevronRightIcon />
        </IconButton>
      </Toolbar>
    }
  </React.Fragment>
);