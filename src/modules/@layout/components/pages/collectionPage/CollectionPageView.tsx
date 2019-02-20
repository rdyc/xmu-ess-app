import { layoutMessage } from '@layout/locales/messages';
import {
  Button,
  Checkbox,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Hidden,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';

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
    onClickSync={() => props.handleOnLoad(true, true)}
    onClickRetry={() => props.handleOnLoad(false, true)}
    onClickNext={() => props.setPageNext()}
    onClickPrevious={() => props.setPagePrevious()}
    onChangeField={props.setField}
    onChangeOrder={props.setOrder}
    onChangeSize={props.setSize}
    dataComponent={props.toolbarDataComponent}
  >
    {
      props.selected.length > 0 &&
      <Paper square>
        <Toolbar>
          <Typography 
            noWrap 
            variant="body2"
            className={props.classes.flex}
          >
            {props.intl.formatMessage(layoutMessage.text.selection, {count: props.selected.length})}
          </Typography>

          <Button
            onClick={props.handleOnClearSelection}
          >
            {props.intl.formatMessage(layoutMessage.action.clear)}
          </Button>

          <Button
            onClick={props.handleOnChangeSelection}
          >
            {props.intl.formatMessage(layoutMessage.action.process)}
          </Button>
        </Toolbar>
      </Paper>
    }
    
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
          <ExpansionPanel key={`EPS${index}`} tabIndex={index}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              {
                props.onSelection &&
                <Checkbox
                  value={item.uid}
                  disabled={props.disableSelection && props.disableSelection(item)}
                  className={props.classes.expansionCheckbox}
                  checked={props.selected.indexOf(item.uid) !== -1}
                  onChange={props.handleOnCheckedSelection}
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
            
            <ExpansionPanelDetails>
              {props.summaryComponent(item)}
            </ExpansionPanelDetails>
            
            <Divider/>

            {
              props.actionComponent &&
              <ExpansionPanelActions>
                {props.actionComponent(item)}
              </ExpansionPanelActions>
            }
          </ExpansionPanel>
        );
      })
    }

    {props.children}
  </CollectionPageDataContainer>
);