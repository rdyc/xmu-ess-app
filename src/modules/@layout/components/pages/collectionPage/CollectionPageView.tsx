import {
  Checkbox,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fade,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';

import { DataContainer } from '../dataContainer/DataContainer';
import { Delayed } from '../delayed/Delayed';
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
      // !props.isLoading &&
      props.response &&
      props.response.data &&
      props.response.data.map((item, index) => {
        if (props.config.onRowRender) {
          return props.config.onRowRender(item, index);
        }   

        const bind = props.config.onBind(item, index);

        return (
          <Fade 
            key={item.uid} 
            in={!props.isLoading} 
            timeout={index * 100}
          >
            <ExpansionPanel tabIndex={index}>
              <ExpansionPanelSummary 
                key={`EPS${index}`}
                expandIcon={<ExpandMoreIcon />}
              >
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
                        <Grid item xs={12} sm={8} md={3}>
                          <Typography
                            variant="body1"
                            noWrap={true}
                            paragraph={false}
                          >
                            {bind.primary}
                          </Typography>
                        </Grid>

                        <Hidden xsDown>
                          <Grid item sm={4} md={3}>
                            <Typography 
                              variant="body1"
                              noWrap={true}
                              paragraph={false}
                            >
                              {bind.secondary}
                            </Typography>
                          </Grid>

                          <Grid item sm={8} md={3}>
                            <Typography 
                              variant={isWidthDown('sm', props.width) ? 'caption' : 'body1'}
                              noWrap={true}
                              paragraph={false}
                            >
                              {bind.tertiary}
                            </Typography>
                          </Grid>
                        </Hidden>

                        <Grid item xs={12} sm={4} md={3}>
                          <Typography 
                            variant={isWidthDown('sm', props.width) ? 'caption' : 'body1'}
                            noWrap={true}
                            paragraph={false}
                          >
                            {bind.quaternary}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={3} md={3}>
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <Typography 
                            variant="body1"
                            noWrap={true}
                            paragraph={false} 
                            align={isWidthDown('sm', props.width) ? 'right' : 'inherit'}
                          >
                            {bind.quinary}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="caption"
                            noWrap={true}
                            paragraph={false}
                            align="right"
                          >
                            {bind.senary}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                
              <Divider/>
              
              <ExpansionPanelDetails>
                <Delayed time={2500}>
                  {props.config.summaryComponent(item)}
                </Delayed>
              </ExpansionPanelDetails>
              
              <Divider/>

              {
                props.config.actionComponent &&
                <Delayed time={2500}>
                  <ExpansionPanelActions>
                    {props.config.actionComponent(item)}
                  </ExpansionPanelActions>
                </Delayed>
              }
            </ExpansionPanel>
          </Fade>
        );
      })
    }
  </DataContainer>
);