import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {

}

type AllProps =  
  & InjectedIntlProps 
  & WithStyles<typeof styles>;

const loadingCircular: React.SFC<AllProps> = props => {
  const render = (
    <div className={props.classes.preloader}>
      <div className={props.classes.preloaderContent}>
        <CircularProgress 
          style={{margin: 'auto'}} 
          color="secondary"
        />

        <Typography
          className={props.classes.marginFarTop}
        >
          {props.intl.formatMessage(layoutMessage.text.waiting)}
        </Typography>
      </div>    
    </div>
  );

  return render;
};

export const LoadingCircular = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles)
)(loadingCircular);