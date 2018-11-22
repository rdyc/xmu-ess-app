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
      <Grid container spacing={16} direction="row" justify="flex-start">
        <Fade 
          in={!props.isLoading}
          timeout={1000}
          mountOnEnter
          unmountOnExit 
        >            
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            {props.config.primaryComponent(props.response.data, props.connectedProps)}
          </Grid>
        </Fade>

        <Fade 
          in={!props.isLoading}
          timeout={1500}
          mountOnEnter
          unmountOnExit 
        >
          <Grid item xs={12} sm={6} md={6} lg={8} xl={9}>
            <Grid container spacing={16} direction="row" justify="flex-start">
              {
                props.config
                  .secondaryComponents(props.response.data, props.connectedProps)
                  .map((children, index, array) =>
                    <Grid item key={index} xs={12} sm={12} md={12} lg={6} xl={4}>
                      {children}
                    </Grid>
                  )
                }
            </Grid>
          </Grid>
        </Fade>

      </Grid>
    }

    {props.children}
  </React.Fragment>
);