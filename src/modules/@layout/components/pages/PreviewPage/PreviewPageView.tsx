import { PreloaderWithError } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { Fade } from '@material-ui/core';
import * as React from 'react';

import { PreviewPageProps } from './PreviewPage';

export const PreviewPageView: React.SFC<PreviewPageProps> = props => (
  <React.Fragment>
    <PreloaderWithError
      state={props.state}
      waitingText={props.intl.formatMessage(layoutMessage.text.waiting)}
      onRetry={() => props.onLoadApi()}
    >
      {!props.state.isLoading &&
        props.state.response &&
        props.state.response.data && (
          <Fade
            in={!props.state.isLoading}
            timeout={1000}
            mountOnEnter
            unmountOnExit
          >
            <div className={props.classes.flexRow}>
              <div className={props.classes.flexColumn}>
                {props.primary &&
                  props
                    .primary(props.state.response.data)
                    .map((children, index) => (
                      <div key={index} className={props.classes.flexContent}>
                        {children}
                      </div>
                    ))}
              </div>

              {props.secondary &&
                props
                  .secondary(props.state.response.data)
                  .map((children, index) => (
                    <div key={index} className={props.classes.flexColumn}>
                      <div className={props.classes.flexContent}>
                        {children}
                      </div>
                    </div>
                  ))}

              {props.tertiary &&
                props
                  .tertiary(props.state.response.data)
                  .map((children, index) => (
                    <div key={index} className={props.classes.flexColumn}>
                      <div className={props.classes.flexContent}>
                        <div className={props.classes.flexContent}>
                          {children}
                        </div>
                      </div>
                    </div>
                  ))}

              {props.fortiary &&
                props
                  .fortiary(props.state.response.data)
                  .map((children, index) => (
                    <div key={index} className={props.classes.flex2Column}>
                      <div className={props.classes.flexContent}>
                        {children}
                      </div>
                    </div>
                  ))}

            </div>
          </Fade>
        )}
    </PreloaderWithError>

    {props.children}
  </React.Fragment>
);
