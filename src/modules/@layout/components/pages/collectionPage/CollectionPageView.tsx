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

import { Delayed } from '../delayed/Delayed';
import { CollectionPageProps } from './CollectionPage';
import { CollectionPageDataContainer } from './CollectionPageDataContainer';

export const CollectionPageView: React.SFC<CollectionPageProps> = props => (
  <CollectionPageDataContainer
    state={props.state}
    pagination={{
      field: props.orderBy,
      direction: props.direction,
      page: props.page,
      size: props.size,
    }}
    metadata={props.state.response && props.state.response.metadata}
    fields={props.fields}
    onClickSync={() => props.handleForceReload()}
    onClickRetry={() => props.setForceReload(false)}
    onClickNext={() => props.setPageNext()}
    onClickPrevious={() => props.setPagePrevious()}
    onChangeField={props.setField}
    onChangeOrder={props.setOrder}
    onChangeSize={props.setSize}
    additionalControls={props.dataControls}
  >
    {
      props.state.response &&
      props.state.response.data &&
      props.state.response.data.map((item, index) => {
        // run overrider if any
        if (props.onRowRender) {
          return props.onRowRender(item, index);
        }   

        // collecting fields
        const bind = props.onBind(item, index);
        
        return (
          <Fade 
            key={item.uid} 
            in={!props.isLoading}
            timeout={props.inTransition ? index * 150 : ((props.size || 10) / index) * 100}
            mountOnEnter
            unmountOnExit 
          >
            <ExpansionPanel className="collection-item" tabIndex={index}>
              <ExpansionPanelSummary 
                key={`EPS${index}`}
                expandIcon={<ExpandMoreIcon />}
              >
                {
                  props.hasSelection &&
                  <Checkbox
                    checked={props.selected.indexOf(item.uid) !== -1}
                    onChange={props.handleOnChangeSelection}
                    disabled={
                      props.notSelectionTypes &&
                      props.notSelectionTypes.length > 0 ?
                      props.notSelectionTypes.some(notSelectionType => 
                        notSelectionType === item.statusType)
                      : false
                    }
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
                          variant="body2"
                          noWrap={true}
                          paragraph={false}
                        >
                          {bind.primary}
                        </Typography>
                      </Grid>

                      <Hidden xsDown>
                        <Grid item sm={4} md={3}>
                          <Typography 
                            variant="body2"
                            noWrap={true}
                            paragraph={false}
                          >
                            {bind.secondary}
                          </Typography>
                        </Grid>

                        <Grid item sm={8} md={3}>
                          <Typography 
                            variant={isWidthDown('sm', props.width) ? 'caption' : 'body2'}
                            noWrap={true}
                            paragraph={false}
                          >
                            {bind.tertiary}
                          </Typography>
                        </Grid>
                      </Hidden>

                      <Grid item xs={12} sm={4} md={3}>
                        <Typography 
                          variant={isWidthDown('sm', props.width) ? 'caption' : 'body2'}
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
                          variant="body2"
                          noWrap={true}
                          paragraph={false} 
                          align={isWidthDown('sm', props.width) ? 'right' : 'inherit'}
                        >
                          {bind.quinary}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography
                          variant={isWidthDown('sm', props.width) ? 'caption' : 'body2'}                            
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
              
              <Delayed time={1000}>
                <ExpansionPanelDetails>
                  {props.summaryComponent(item)}
                </ExpansionPanelDetails>
              </Delayed>
              
              <Divider/>

              {
                props.actionComponent &&
                <ExpansionPanelActions>
                  {props.actionComponent(item)}
                </ExpansionPanelActions>
              }
            </ExpansionPanel>
          </Fade>
        );
      })
    }

    {props.children}
  </CollectionPageDataContainer>
);