import { PreloaderWithError } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import * as React from 'react';

import { FormPageProps } from './FormPage';

export const FormPageView: React.SFC<FormPageProps> = props => (
  <PreloaderWithError
    state={props.state}
    waitingText={props.intl.formatMessage(layoutMessage.text.waiting)}
    onRetry={() => props.onLoadApi()}
  >
    {
      !props.state.isLoading &&
      // <Fade 
      //   in={!props.state.isLoading}
      //   timeout={1000}
      //   mountOnEnter
      //   unmountOnExit 
      // >
      //   {props.children}
      // </Fade>
      props.children
    }
  </PreloaderWithError>
);
