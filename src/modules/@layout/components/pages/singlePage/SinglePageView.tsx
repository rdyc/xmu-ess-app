import { layoutMessage } from '@layout/locales/messages';
import { Fade, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { SinglePageProps } from './SinglePage';

export const SinglePageView: React.SFC<SinglePageProps> = props => (
  <React.Fragment>
    {
      props.isLoading &&
      <Typography
        noWrap
        variant="body1"
        className={props.classes.flex}
      >
        <FormattedMessage {...layoutMessage.text.loading} />
      </Typography>
    }

    {
      !props.isLoading &&
      props.response &&
      props.response.data &&
      <Grid container spacing={16}>
        <Fade 
          in={!props.isLoading}
          timeout={1000}
          mountOnEnter
          unmountOnExit 
        >            
          <Grid item xs={12} md={4} className={props.classes.gridCard}>
            {props.config.primaryComponent(props.response.data, props.connectedProps)}
          </Grid>
        </Fade>

        <Fade 
          in={!props.isLoading}
          timeout={1500}
          mountOnEnter
          unmountOnExit 
        >
          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
              {
                props.config
                  .secondaryComponent(props.response.data, props.connectedProps)
                  .map((children, index, array) =>
                    <Grid item key={index} className={props.classes.gridCard}>
                      {children}
                    </Grid>
                  )
                }
            </Grid>
          </Grid>
        </Fade>
        
        <Fade
          in={!props.isLoading}
          timeout={2000}
          mountOnEnter
          unmountOnExit 
        >
          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
              {
                props.config
                  .tertiaryComponent(props.response.data, props.connectedProps)
                  .map((children, index, array) =>
                    <Grid item key={index} className={props.classes.gridCard}>
                      {children}
                    </Grid>
                  )
                }
            </Grid>
          </Grid>
        </Fade>

      </Grid>
    }
  </React.Fragment>
);