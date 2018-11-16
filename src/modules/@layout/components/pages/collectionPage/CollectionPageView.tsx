import {
  Checkbox,
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

import { DataContainer } from '../dataContainer/DataContainer';
import { CollectionPageProps } from './CollectionPage';

export const CollectionPageView: React.SFC<CollectionPageProps> = props => (
  <DataContainer
    isLoading={props.isLoading}
    state={{
      field: props.orderBy,
      direction: props.direction,
      page: props.page,
      size: props.size,
    }}
    className={props.classes.flex}
    metadata={props.response && props.response.metadata}
    fields={props.config.fields}
    onClickSync={() => props.setPageOne()}
    onClickNew={() => alert('new')}
    onClickNext={() => props.setPageNext()}
    onClickPrevious={() => props.setPagePrevious()}
    onChangeField={props.setField}
    onChangeOrder={props.setOrder}
    onChangeSize={props.setSize}
  >
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
              {props.config.summaryComponent(item)}
            </ExpansionPanelDetails>
            
            {
              props.config.actionComponent &&
              <ExpansionPanelActions>
                {props.config.actionComponent(item)}
              </ExpansionPanelActions>
            }
          </ExpansionPanel>
        );
      })
    }
  </DataContainer>
);