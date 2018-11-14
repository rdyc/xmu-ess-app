import { layoutMessage } from '@layout/locales/messages';
import {
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';

import { CollectionPageProps } from './CollectionPage';

export const CollectionPageView: React.SFC<CollectionPageProps> = props => (
  <div>
    {
      props.isLoading &&
      <Typography align="center">
        {props.intl.formatMessage(layoutMessage.action.yes)}
      </Typography>
    }

    {
      !props.isLoading &&
      props.response &&
      props.response.metadata &&
      props.response.metadata.paginate &&
      props.response.metadata.paginate.previous &&
      <Button fullWidth size="small" onClick={() => props.setPagePrevious()}>
        ({props.response.metadata.paginate.current - 1}) Pervious
      </Button>
    }

    {
      !props.isLoading &&
      props.response &&
      props.response.data &&
      props.response.data.map((item, index) => {
        const bind = props.config.onBind(item, index);

        return (
          <ExpansionPanel key={bind.key} tabIndex={index}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container>
                <Grid item xs={9} md={9}>
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" noWrap={true} paragraph={false}>{bind.primary}</Typography>
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
            <ExpansionPanelDetails
              style={{
                backgroundColor: props.theme.palette.background.default
              }}
            >
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small">Cancel</Button>
              <Button size="small" color="primary">
                Save
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        );
      })
    } 

    {
      !props.isLoading &&
      props.response &&
      props.response.metadata &&
      props.response.metadata.paginate &&
      props.response.metadata.paginate.next &&
      <Button fullWidth size="small" onClick={() => props.setPageNext()}>
        ({props.response.metadata.paginate.total - props.response.metadata.paginate.current}) More
      </Button>
    }
  </div>
);