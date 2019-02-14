import { PreloaderWithError } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { Fade, Grid } from '@material-ui/core';
import * as React from 'react';

import { PreviewPageProps } from './PreviewPage';

export const PreviewPageView: React.SFC<PreviewPageProps> = props => (
  <React.Fragment>
    <PreloaderWithError
      state={props.state}
      waitingText={props.intl.formatMessage(layoutMessage.text.waiting)}
      onRetry={() => props.onLoadApi()}
    >
      {
        !props.state.isLoading &&
        props.state.response &&
        props.state.response.data &&
        <Grid container spacing={16} direction="row" justify="flex-start">
          <Fade 
            in={!props.state.isLoading}
            timeout={1000}
            mountOnEnter
            unmountOnExit 
          >            
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <props.primary {...props.state.response.data} />
            </Grid>
          </Fade>

          <Fade 
            in={!props.state.isLoading}
            timeout={1500}
            mountOnEnter
            unmountOnExit 
          >
            <Grid item xs={12} sm={6} md={6} lg={8} xl={9}>
              <Grid container spacing={16} direction="row" justify="flex-start">
                { 
                  props.secondary &&
                  props.secondary(props.state.response.data)
                    .map((children, index) =>
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
    </PreloaderWithError>

    {props.children}
  </React.Fragment>
);